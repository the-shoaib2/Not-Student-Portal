import { useState, useEffect } from 'react'
import { ActivityTracker } from '@/services/activity'
import { getServerSession } from 'next-auth'

import { useSession } from 'next-auth/react'
import type { Session } from 'next-auth'
import { useMemo } from 'react'

interface ActivityConfig {
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

export function useActivityTracking() {
  const [config, setConfig] = useState<ActivityConfig>({
    enabled: {
      pageViews: true,
      buttonClicks: true,
      formSubmissions: true,
      apiCalls: true,
      loginLogout: true,
      formInputs: true,
      visitTime: true
    }
  })

  const [isLoading, setIsLoading] = useState(true)
  const { data: session } = useSession()
  const tracker = useMemo(() => {
    const { ActivityTracker } = require('@/services/activity')
    return ActivityTracker.getInstance()
  }, [])

  useEffect(() => {
    const loadConfig = async () => {
      try {
        if (!session?.user?.id) return

        const userConfig = await tracker.getUserConfig(session.user.id as string)
        setConfig(userConfig)
      } catch (error) {
        console.error('Error loading activity config:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadConfig()
  }, [session, tracker])

  const updateConfig = async (newConfig: ActivityConfig) => {
    try {
      if (!session?.user?.id) return

      await tracker.updateActivityConfig(session.user.id as string, newConfig)
      setConfig(newConfig)
    } catch (error) {
      console.error('Error updating activity config:', error)
      throw error
    }
  }

  const trackPageView = async (path: string, metadata?: any) => {
    if (!config.enabled.pageViews) return
    const session = await getServerSession() as Session
    if (!session?.user?.id) return
    await ActivityTracker.getInstance().trackPageView(path, metadata)
  }

  const trackButtonClick = async (elementId: string, path: string, metadata?: any) => {
    if (!config.enabled.buttonClicks) return
    const session = await getServerSession() as Session
    if (!session?.user?.id) return
    await ActivityTracker.getInstance().trackButtonClick(elementId, path, metadata)
  }

  const trackFormSubmission = async (formId: string, path: string, formData: any, metadata?: any) => {
    if (!config.enabled.formSubmissions) return
    const session = await getServerSession() as Session
    if (!session?.user?.id) return
    await ActivityTracker.getInstance().trackFormSubmission(formId, path, formData, metadata)
  }

  const trackFormInput = async (formId: string, path: string, inputName: string, inputValue: string, metadata?: any) => {
    if (!config.enabled.formInputs) return
    const session = await getServerSession() as Session
    if (!session?.user?.id) return
    await ActivityTracker.getInstance().trackFormInput(formId, path, inputName, inputValue, metadata)
  }

  const trackApiCall = async (apiEndpoint: string, apiMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', path: string, metadata?: any) => {
    if (!config.enabled.apiCalls) return
    const session = await getServerSession() as Session
    if (!session?.user?.id) return
    await ActivityTracker.getInstance().trackApiCall(apiEndpoint, apiMethod, path, metadata)
  }

  const trackLogin = async (path: string, metadata?: any) => {
    if (!config.enabled.loginLogout) return
    const session = await getServerSession() as Session
    if (!session?.user?.id) return
    await ActivityTracker.getInstance().trackLogin(path, metadata)
  }

  const trackLogout = async (path: string, metadata?: any) => {
    if (!config.enabled.loginLogout) return
    const session = await getServerSession() as Session
    if (!session?.user?.id) return
    await ActivityTracker.getInstance().trackLogout(path, metadata)
  }

  const toggleTracking = async (type: keyof ActivityConfig['enabled']) => {
    const newConfig = { ...config }
    newConfig.enabled[type] = !newConfig.enabled[type]
    await updateConfig(newConfig)
  }

  useEffect(() => {
    if (!config.enabled.pageViews || isLoading) return

    // Track page view
    trackPageView(window.location.pathname, {
      userAgent: navigator.userAgent,
      screenResolution: `${window.innerWidth}x${window.innerHeight}`,
      pageLoadTime: performance.now() - window.performance.timing.navigationStart,
      referrer: document.referrer
    })

    // Track form submissions
    const handleFormSubmit = async (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement
      if (form && config.enabled.formSubmissions) {
        const formData = Object.fromEntries(new FormData(form))
        await trackFormSubmission(
          form.id,
          window.location.pathname,
          formData as Record<string, any>
        )
      }
    }

    // Track button clicks
    const handleButtonClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'BUTTON' && config.enabled.buttonClicks) {
        await trackButtonClick(
          target.id || target.getAttribute('data-id') || '',
          window.location.pathname
        )
      }
    }

    // Track form inputs
    const handleFormInput = async (e: Event) => {
      const target = e.target as HTMLInputElement
      if (target.form && config.enabled.formInputs) {
        await trackFormInput(
          target.form.id,
          window.location.pathname,
          target.name,
          target.value
        )
      }
    }

    // Add event listeners
    document.addEventListener('submit', handleFormSubmit)
    document.addEventListener('click', handleButtonClick)
    document.addEventListener('input', handleFormInput)

    // Clean up event listeners
    return () => {
      document.removeEventListener('submit', handleFormSubmit)
      document.removeEventListener('click', handleButtonClick)
      document.removeEventListener('input', handleFormInput)
    }
  }, [config, isLoading])

  return {
    config,
    isLoading,
    toggleTracking,
    trackPageView: (path: string, metadata?: any) => {
      if (session?.user?.id && config?.enabled?.pageViews) {
        tracker.trackPageView(path, metadata)
      }
    },
    trackButtonClick: (elementId: string, path: string, metadata?: any) => {
      if (session?.user?.id && config?.enabled?.buttonClicks) {
        tracker.trackButtonClick(elementId, path, metadata)
      }
    },
    trackFormSubmission: (formId: string, path: string, formData: any, metadata?: any) => {
      if (session?.user?.id && config?.enabled?.formSubmissions) {
        tracker.trackFormSubmission(formId, path, formData, metadata)
      }
    },
    trackFormInput: (formId: string, path: string, inputName: string, inputValue: string, metadata?: any) => {
      if (session?.user?.id && config?.enabled?.formInputs) {
        tracker.trackFormInput(formId, path, inputName, inputValue, metadata)
      }
    }
  }
}

