import { useState, useEffect, useCallback } from 'react'
import { ActivityTracker, type ActivityData } from '../services/activity';
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import type { Session } from 'next-auth'
import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { activityService } from '@/services/activityService'

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

type ActivityMetadata = ActivityData['metadata']

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
  const tracker = useMemo(() => ActivityTracker.getInstance(), [])
  const pathname = usePathname()

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

  const trackPageView = async (path: string, metadata?: ActivityMetadata) => {
    if (!config.enabled.pageViews) return
    const session = await getServerSession() as Session
    if (!session?.user?.id) return
    await tracker.trackPageView(path, {
      studentId: session.user.id,
      email: session.user.email || undefined,
      name: session.user.name || undefined
    })
  }

  const trackButtonClick = useCallback(async (elementId: string, path: string, metadata?: ActivityMetadata) => {
    if (!config.enabled.buttonClicks) return
    const session = await getServerSession() as Session
    if (!session?.user?.id) return
    await tracker.trackButtonClick(elementId, path, metadata)
  }, [config.enabled.buttonClicks])

  const trackFormSubmission = useCallback(async (formId: string, path: string, formData: any, metadata?: ActivityMetadata) => {
    if (!config.enabled.formSubmissions) return
    const session = await getServerSession() as Session
    if (!session?.user?.id) return
    await tracker.trackFormSubmission(formId, path, formData, metadata)
  }, [config.enabled.formSubmissions])

  const trackFormInput = useCallback(async (formId: string, path: string, inputName: string, inputValue: string, metadata?: ActivityMetadata) => {
    if (!config.enabled.formInputs) return
    const session = await getServerSession() as Session
    if (!session?.user?.id) return
    await tracker.trackFormInput(formId, path, inputName, inputValue, metadata)
  }, [config.enabled.formInputs])

  const trackApiCall = useCallback(async (endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', path: string, metadata?: ActivityMetadata) => {
    if (!config.enabled.apiCalls) return
    const session = await getServerSession() as Session
    if (!session?.user?.id) return
    await tracker.trackApiCall(endpoint, method, path, metadata)
  }, [config.enabled.apiCalls])

  const trackLogin = useCallback(async (username: string, metadata?: ActivityMetadata) => {
    if (!config.enabled.loginLogout) return
    const session = await getServerSession() as Session
    if (!session?.user?.id) return
    await tracker.trackLogin(session.user.id, metadata)
  }, [config.enabled.loginLogout])

  const trackLogout = useCallback(async (metadata?: ActivityMetadata) => {
    if (!config.enabled.loginLogout) return
    const session = await getServerSession() as Session
    if (!session?.user?.id) return
    await tracker.trackLogout(session.user.id)
  }, [config.enabled.loginLogout])

  const toggleTracking = async (type: keyof ActivityConfig['enabled']) => {
    const newConfig = { ...config }
    newConfig.enabled[type] = !newConfig.enabled[type]
    await updateConfig(newConfig)
  }

  useEffect(() => {
    if (!config.enabled.pageViews || isLoading) return

    // Track page view
    if (session?.user?.id) {
      trackPageView(pathname, {
        studentId: session.user.id,
        email: session.user.email || undefined,
        name: session.user.name || undefined
      })
    }

    // Track form submissions
    const handleFormSubmit = async (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement
      if (form && config.enabled.formSubmissions) {
        const formData = Object.fromEntries(new FormData(form))
        await trackFormSubmission(
          form.id,
          pathname,
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
          pathname
        )
      }
    }

    // Track form inputs
    const handleFormInput = async (e: Event) => {
      const target = e.target as HTMLInputElement
      if (target.form && config.enabled.formInputs) {
        await trackFormInput(
          target.form.id,
          pathname,
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
  }, [config, isLoading, pathname, trackButtonClick, trackFormSubmission, trackFormInput, session])

  return {
    config,
    isLoading,
    updateConfig,
    toggleTracking,
    trackPageView,
    trackButtonClick,
    trackFormSubmission,
    trackFormInput,
    trackApiCall,
    trackLogin,
    trackLogout
  }
}

