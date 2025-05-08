import { Activity } from '../models/activity'
import { ActivityConfig } from '../models/activityConfig'
import { VisitTime } from '../models/visitTime'
import { getServerSession } from 'next-auth'
import { v4 as uuidv4 } from 'uuid'

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

import type { Session } from 'next-auth'

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
  private currentVisit: any
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
      const session = await getServerSession()
      if (!session?.user?.id) return

      const config = await this.getUserConfig(session.user.id)
      if (!config?.enabled[data.action as keyof ActivityConfig['enabled']]) return

      const activity = new Activity({
        userId: session.user.id as string,
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
      await activity.save()

      if (config.enabled.visitTime) {
        await this.updateVisitTime(session.user.id as string, data.path, data.metadata)
      }
    } catch (error) {
      console.error('Error tracking activity:', error)
    }
  }

  async getUserConfig(userId: string): Promise<ActivityConfig> {
    try {
      const config = await ActivityConfig.findOne({ userId })
      if (!config) {
        return {
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
      return config
    } catch (error) {
      console.error('Error getting user config:', error)
      throw error
    }
  }

  async updateActivityConfig(userId: string, config: ActivityConfig): Promise<void> {
    try {
      await ActivityConfig.findOneAndUpdate(
        { userId },
        { $set: { enabled: config.enabled } },
        { upsert: true, new: true }
      )
    } catch (error) {
      console.error('Error updating activity config:', error)
      throw error
    }
  }

  async updateVisitTime(userId: string, pagePath: string, metadata: any) {
    try {
      const visit = await VisitTime.findOne({ userId, pagePath })
      if (!visit) {
        await new VisitTime({
          userId,
          pagePath,
          startTime: new Date(),
          endTime: null,
          duration: 0,
          metadata
        }).save()
      } else {
        visit.endTime = new Date()
        visit.duration = Math.floor((visit.endTime.getTime() - visit.startTime.getTime()) / 1000)
        await visit.save()
      }
    } catch (error) {
      console.error('Error updating visit time:', error)
    }
  }

  async endVisit() {
    try {
      const session = await getServerSession()
      if (!session?.user?.id) return

      const visit = await VisitTime.findOne({
        userId: session.user.id,
        endTime: null
      })

      if (visit) {
        visit.endTime = new Date()
        visit.duration = Math.floor((visit.endTime.getTime() - visit.startTime.getTime()) / 1000)
        await visit.save()
      }
    } catch (error) {
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

  async trackLogin(path: string, metadata?: ActivityData['metadata']): Promise<void> {
    await this.trackActivity({
      action: 'login',
      path,
      metadata
    })
  }

  async trackLogout(path: string, metadata?: ActivityData['metadata']): Promise<void> {
    await this.endVisit()
    await this.trackActivity({
      action: 'logout',
      path,
      metadata
    })
  }
}
