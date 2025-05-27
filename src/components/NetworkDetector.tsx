'use client'
import { useEffect, useState } from 'react'

export default function NetworkDetector({ children }: { children: React.ReactNode }) {
  const [online, setOnline] = useState(true)

  useEffect(() => {
    // Set initial state
    setOnline(navigator.onLine)
    
    // Add event listeners for online/offline events
    const updateStatus = () => setOnline(navigator.onLine)
    window.addEventListener('online', updateStatus)
    window.addEventListener('offline', updateStatus)
    
    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener('online', updateStatus)
      window.removeEventListener('offline', updateStatus)
    }
  }, [])

  // Show network error screen when offline
  if (!online) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center text-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-6xl mb-4">🔌</div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">No Internet Connection</h1>
          <p className="text-gray-600 mb-4">
            This app requires an internet connection to function properly.
            Please check your connection and try again.
          </p>
          <button 
            onClick={() => setOnline(navigator.onLine)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // Render children when online
  return <>{children}</>
}
