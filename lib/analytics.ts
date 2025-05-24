import { track } from "@vercel/analytics"

// Client-side tracking utility
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  track(eventName, properties)
}

// Common event tracking functions
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent("Button Click", {
    buttonName,
    location: location || "unknown",
  })
}

export const trackFormSubmission = (formName: string, success = true) => {
  trackEvent("Form Submission", {
    formName,
    success,
    timestamp: new Date().toISOString(),
  })
}

export const trackPageView = (pageName: string, userId?: string) => {
  trackEvent("Page View", {
    pageName,
    userId,
    timestamp: new Date().toISOString(),
  })
}

export const trackFeatureUsage = (featureName: string, userId?: string) => {
  trackEvent("Feature Usage", {
    featureName,
    userId,
    timestamp: new Date().toISOString(),
  })
}

export const trackPurchase = (productName: string, price: number, currency = "USD") => {
  trackEvent("Purchase", {
    productName,
    price,
    currency,
    timestamp: new Date().toISOString(),
  })
}
