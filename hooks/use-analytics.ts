"use client"

import { useCallback } from "react"
import { trackEvent, trackButtonClick, trackFormSubmission, trackFeatureUsage } from "@/lib/analytics"

export function useAnalytics() {
  const track = useCallback((eventName: string, properties?: Record<string, any>) => {
    trackEvent(eventName, properties)
  }, [])

  const trackButton = useCallback((buttonName: string, location?: string) => {
    trackButtonClick(buttonName, location)
  }, [])

  const trackForm = useCallback((formName: string, success = true) => {
    trackFormSubmission(formName, success)
  }, [])

  const trackFeature = useCallback((featureName: string, userId?: string) => {
    trackFeatureUsage(featureName, userId)
  }, [])

  return {
    track,
    trackButton,
    trackForm,
    trackFeature,
  }
}
