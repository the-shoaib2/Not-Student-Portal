"use client"
import { useActivityTracking } from '@/hooks/useActivityTracking'
import { useState } from 'react'

export const ActivityConfig = () => {
  const { config, isLoading, toggleTracking } = useActivityTracking()
  const [expanded, setExpanded] = useState(false)

  if (isLoading) {
    return <div>Loading...</div>
  }

  interface ActivityConfigInterface {
    userId: any
    enabled: {
      pageViews: boolean
      buttonClicks: boolean
      formSubmissions: boolean
      apiCalls: boolean
      loginLogout: boolean
      formInputs: boolean
      visitTime: boolean
    }
    lastUpdated: Date
  }

  // Define the type for tracking options
  interface TrackingOption {
    type: keyof ActivityConfigInterface['enabled']
    label: string
  }

  const trackingOptions: TrackingOption[] = [
    { type: 'pageViews', label: 'Page Views' },
    { type: 'buttonClicks', label: 'Button Clicks' },
    { type: 'formSubmissions', label: 'Form Submissions' },
    { type: 'apiCalls', label: 'API Calls' },
    { type: 'loginLogout', label: 'Login/Logout' },
    { type: 'formInputs', label: 'Form Inputs' },
    { type: 'visitTime', label: 'Visit Time' }
  ]

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setExpanded(!expanded)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Activity Tracking
      </button>

      {expanded && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-bold mb-4">Tracking Settings</h3>
          <div className="space-y-2">
            {trackingOptions.map((option) => (
              <div key={option.type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={config?.enabled[option.type]}
                  onChange={() => toggleTracking(option.type)}
                  className="mr-2"
                />
                <span>{option.label}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setExpanded(false)}
            className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}
