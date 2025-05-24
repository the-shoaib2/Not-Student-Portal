"use server"

import { track } from "@vercel/analytics/server"

export async function trackServerEvent(eventName: string, properties?: Record<string, any>) {
  await track(eventName, properties)
}

export async function trackUserSignup(userId: string, method: string) {
  await track("User Signup", {
    userId,
    method,
    timestamp: new Date().toISOString(),
  })
}

export async function trackServerPurchase(userId: string, productId: string, amount: number) {
  await track("Purchase Completed", {
    userId,
    productId,
    amount,
    timestamp: new Date().toISOString(),
  })
}

export async function trackApiUsage(endpoint: string, userId?: string, responseTime?: number) {
  await track("API Usage", {
    endpoint,
    userId,
    responseTime,
    timestamp: new Date().toISOString(),
  })
}
