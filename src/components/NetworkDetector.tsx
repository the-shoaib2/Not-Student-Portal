'use client'
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WifiOff, Wifi, RefreshCw } from 'lucide-react'

export function NetworkDetector({ children }: { children: React.ReactNode }) {
  const [online, setOnline] = useState(true);
  const [showOnlineIndicator, setShowOnlineIndicator] = useState(false);

  useEffect(() => {
    // Set initial state
    setOnline(navigator.onLine);
    
    // Add event listeners for online/offline events
    const updateStatus = () => {
      const isNowOnline = navigator.onLine;
      setOnline(isNowOnline);
      
      // Show online indicator when coming back online
      if (isNowOnline) {
        setShowOnlineIndicator(true);
        const timer = setTimeout(() => setShowOnlineIndicator(false), 3000);
        return () => clearTimeout(timer);
      }
    };
    
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    
    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

  // Show network error screen when offline
  if (!online) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md border-red-200 dark:border-red-900/50">
          <CardHeader className="space-y-2">
            <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-3 w-fit mx-auto">
              <WifiOff className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle className="text-center text-xl font-semibold">
              No Internet Connection
            </CardTitle>
            <CardDescription className="text-center">
              We can't connect to the internet right now
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            <p>Please check your network connection and try again.</p>
            <p className="mt-1 text-xs opacity-70">
              We'll automatically reconnect when you're back online
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              onClick={() => setOnline(navigator.onLine)}
              variant="outline"
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Render children with online indicator if needed
  return (
    <>
      {showOnlineIndicator && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded-full shadow-lg border border-green-200 dark:border-green-800">
            <Wifi className="h-4 w-4" />
            <span className="text-sm font-medium">Back Online</span>
          </div>
        </div>
      )}
      {children}
    </>
  );
}

export default NetworkDetector

