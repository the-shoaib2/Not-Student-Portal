import { Activity } from '../models/activity'
import { ActivityConfig } from '../models/activityConfig'
import { VisitTime, VisitTimeInterface } from '../models/visitTime'
import { getCookie } from 'cookies-next'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

export interface ActivityData {
  action: 'page_view' | 'button_click' | 'form_submission' | 'api_call' | 'login' | 'logout' | 'form_input'
  path: string
  elementId?: string
  formId?: string
  formData?: Record<string, any>
  inputName?: string
  inputValue?: string
  apiEndpoint?: string
  apiMethod?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  metadata?: {
    studentId?: string
    email?: string
    name?: string
    sessionDuration?: number
  }
}

export interface ActivityConfig {
  enabled: {
    pageViews: boolean
    buttonClicks: boolean
    formSubmissions: boolean
    apiCalls: boolean
    loginLogout: boolean
    formInputs: boolean
    visitTime: boolean
  }
}

export class ActivityTracker {
  private static instance: ActivityTracker
  private sessionId: string
  private currentVisit: VisitTimeInterface | null
  private config: ActivityConfig

  private constructor() {
    this.sessionId = uuidv4()
    this.currentVisit = null
    this.config = {
      enabled: {
        pageViews: true,
        buttonClicks: true,
        formSubmissions: true,
        apiCalls: true,
        loginLogout: true,
        formInputs: true,
        visitTime: true
      }
    }
  }

  public static getInstance(): ActivityTracker {
    if (!ActivityTracker.instance) {
      ActivityTracker.instance = new ActivityTracker()
    }
    return ActivityTracker.instance
  }

  async trackActivity(data: ActivityData) {
    try {
      const token = await getCookie('token')
      if (!token) return

      const config = await this.getUserConfig(token)
      if (!config?.enabled[data.action as keyof ActivityConfig['enabled']]) return

      const activity = new Activity({
        userId: data.metadata?.studentId || '',
        action: data.action,
        path: data.path,
        elementId: data.elementId,
        formId: data.formId,
        formData: data.formData,
        inputName: data.inputName,
        inputValue: data.inputValue,
        apiEndpoint: data.apiEndpoint,
        apiMethod: data.apiMethod,
        metadata: data.metadata,
        sessionId: this.sessionId
      })

      await axios.post('/api/activity', {
        userId: data.metadata?.studentId || '',
        action: data.action,
        path: data.path,
        elementId: data.elementId,
        formId: data.formId,
        formData: data.formData,
        inputName: data.inputName,
        inputValue: data.inputValue,
        apiEndpoint: data.apiEndpoint,
        apiMethod: data.apiMethod,
        metadata: data.metadata,
        sessionId: this.sessionId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (config.enabled.visitTime) {
        await this.updateVisitTime(data.metadata?.studentId || '', data.path, data.metadata)
      }
    } catch (error) {
      console.error('Error tracking activity:', error)
    }
  }

  async getUserConfig(token: string): Promise<ActivityConfig> {
    try {
      const response = await axios.get<ActivityConfig>('/api/activity/config', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error('Error getting user config:', error)
      throw error
    }
  }

  async updateActivityConfig(token: string, config: ActivityConfig): Promise<void> {
    try {
      await axios.put('/api/activity/config', config, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      console.error('Error updating activity config:', error)
      throw error
    }
  }

  async updateVisitTime(userId: string, pagePath: string, metadata: any) {
    try {
      await axios.post('/api/visit-time', {
        userId,
        pagePath,
        startTime: new Date(),
        endTime: null,
        duration: 0,
        metadata
      }, {
        headers: {
          Authorization: `Bearer ${await getCookie('token')}`
        }
      })
    } catch {
      console.error('Error updating visit time:')
    }
  }

  async endVisit() {
    try {
      const token = await getCookie('token')
      if (!token) return

      await axios.post('/api/visit-time/end', {
        userId: '',
        endTime: new Date()
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error: unknown) {
      console.error('Error ending visit:', error)
    }
  }

  async trackPageView(path: string, metadata?: ActivityData['metadata']): Promise<void> {
    await this.trackActivity({
      action: 'page_view',
      path,
      metadata
    })
  }

  async trackButtonClick(elementId: string, path: string, metadata?: ActivityData['metadata']): Promise<void> {
    await this.trackActivity({
      action: 'button_click',
      elementId,
      path,
      metadata
    })
  }

  async trackFormSubmission(formId: string, path: string, formData: Record<string, any>, metadata?: ActivityData['metadata']): Promise<void> {
    await this.trackActivity({
      action: 'form_submission',
      formId,
      path,
      formData,
      metadata
    })
  }

  async trackFormInput(formId: string, path: string, inputName: string, inputValue: string, metadata?: ActivityData['metadata']): Promise<void> {
    await this.trackActivity({
      action: 'form_input',
      formId,
      path,
      inputName,
      inputValue,
      metadata
    })
  }

  async trackApiCall(apiEndpoint: string, apiMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', path: string, metadata?: ActivityData['metadata']): Promise<void> {
    await this.trackActivity({
      action: 'api_call',
      apiEndpoint,
      apiMethod,
      path,
      metadata
    })
  }

  async trackLogin(userId: string, metadata?: ActivityData['metadata']): Promise<void> {
    await this.trackActivity({
      action: 'login',
      path: '',
      metadata: { studentId: userId, ...metadata }
    })
  }

  async trackLogout(userId: string, metadata?: ActivityData['metadata']): Promise<void> {
    await this.endVisit()
    await this.trackActivity({
      action: 'logout',
      path: '',
      metadata: { studentId: userId, ...metadata }
    })
  }
}