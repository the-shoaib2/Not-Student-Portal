"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { trackButtonClick, trackFormSubmission, trackFeatureUsage, trackPurchase } from "@/lib/analytics"

export default function ActivityTracker() {
  const [email, setEmail] = useState("")
  const [events, setEvents] = useState<string[]>([])

  const addEvent = (eventDescription: string) => {
    setEvents((prev) => [eventDescription, ...prev.slice(0, 9)]) // Keep last 10 events
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      trackFormSubmission("Newsletter Signup", true)
      addEvent(`Newsletter signup: ${email}`)
      setEmail("")
    } else {
      trackFormSubmission("Newsletter Signup", false)
      addEvent("Newsletter signup failed: No email provided")
    }
  }

  const handleFeatureClick = (featureName: string) => {
    trackFeatureUsage(featureName)
    trackButtonClick(featureName, "feature-section")
    addEvent(`Feature used: ${featureName}`)
  }

  const handlePurchaseClick = (product: string, price: number) => {
    trackPurchase(product, price)
    trackButtonClick("Purchase", "product-section")
    addEvent(`Purchase: ${product} - $${price}`)
  }

  const handleSocialClick = (platform: string) => {
    trackButtonClick("Social Share", "social-section")
    addEvent(`Social share: ${platform}`)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Activity Tracking Demo</CardTitle>
          <CardDescription>
            This demo shows how to implement proper activity tracking using Vercel Analytics [^1]. All interactions are
            being tracked and can be viewed in your Vercel Analytics dashboard.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Newsletter Signup */}
      <Card>
        <CardHeader>
          <CardTitle>Newsletter Signup</CardTitle>
          <CardDescription>Form submission tracking example</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </CardContent>
      </Card>

      {/* Feature Usage Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Usage</CardTitle>
          <CardDescription>Track when users interact with specific features</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button variant="outline" onClick={() => handleFeatureClick("Dashboard")}>
            Dashboard
          </Button>
          <Button variant="outline" onClick={() => handleFeatureClick("Analytics")}>
            Analytics
          </Button>
          <Button variant="outline" onClick={() => handleFeatureClick("Settings")}>
            Settings
          </Button>
          <Button variant="outline" onClick={() => handleFeatureClick("Export")}>
            Export
          </Button>
        </CardContent>
      </Card>

      {/* Purchase Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Tracking</CardTitle>
          <CardDescription>Track purchase events with product details</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 text-center">
            <h3 className="font-semibold">Basic Plan</h3>
            <p className="text-2xl font-bold">$9.99</p>
            <Button className="w-full mt-2" onClick={() => handlePurchaseClick("Basic Plan", 9.99)}>
              Purchase
            </Button>
          </div>
          <div className="border rounded-lg p-4 text-center">
            <h3 className="font-semibold">Pro Plan</h3>
            <p className="text-2xl font-bold">$19.99</p>
            <Button className="w-full mt-2" onClick={() => handlePurchaseClick("Pro Plan", 19.99)}>
              Purchase
            </Button>
          </div>
          <div className="border rounded-lg p-4 text-center">
            <h3 className="font-semibold">Enterprise</h3>
            <p className="text-2xl font-bold">$49.99</p>
            <Button className="w-full mt-2" onClick={() => handlePurchaseClick("Enterprise Plan", 49.99)}>
              Purchase
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Social Sharing */}
      <Card>
        <CardHeader>
          <CardTitle>Social Sharing</CardTitle>
          <CardDescription>Track social media interactions</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button variant="outline" onClick={() => handleSocialClick("Twitter")}>
            Share on Twitter
          </Button>
          <Button variant="outline" onClick={() => handleSocialClick("Facebook")}>
            Share on Facebook
          </Button>
          <Button variant="outline" onClick={() => handleSocialClick("LinkedIn")}>
            Share on LinkedIn
          </Button>
        </CardContent>
      </Card>

      {/* Recent Events Display */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Last 10 tracked events (local display only)</CardDescription>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <p className="text-muted-foreground">No events tracked yet. Try interacting with the components above!</p>
          ) : (
            <div className="space-y-2">
              {events.map((event, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Badge variant="secondary">{index + 1}</Badge>
                  <span className="text-sm">{event}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
