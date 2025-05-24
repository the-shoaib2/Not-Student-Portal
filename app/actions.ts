"use server"

import { trackUserSignup, trackServerPurchase } from "@/lib/server-analytics"

export async function handleUserSignup(formData: FormData) {
  const email = formData.get("email") as string
  const method = (formData.get("method") as string) || "email"

  try {
    // Simulate user creation
    const userId = `user_${Date.now()}`

    // Track the signup event on the server
    await trackUserSignup(userId, method)

    return {
      success: true,
      message: `User ${email} signed up successfully!`,
      userId,
    }
  } catch (error) {
    return {
      success: false,
      message: "Signup failed. Please try again.",
    }
  }
}

export async function handlePurchase(formData: FormData) {
  const userId = formData.get("userId") as string
  const productId = formData.get("productId") as string
  const amount = Number.parseFloat(formData.get("amount") as string)

  try {
    // Simulate purchase processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Track the purchase on the server
    await trackServerPurchase(userId, productId, amount)

    return {
      success: true,
      message: `Purchase of ${productId} completed successfully!`,
    }
  } catch (error) {
    return {
      success: false,
      message: "Purchase failed. Please try again.",
    }
  }
}
