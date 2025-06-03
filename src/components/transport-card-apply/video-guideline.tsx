"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function VideoGuideline() {
  return (
    <Card className="h-full overflow-hidden flex flex-col">
      <CardHeader className="bg-gradient-to-r from-teal-700 to-teal-600 text-white p-4 border-b border-teal-800/20">
        <CardTitle className="text-lg font-semibold tracking-tight">
          <div className="flex items-center space-x-2">
            <span>Transport Card Application Guide</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/RneBNYYjK_Q?si=17NrYqM6-0jPisa2"
            title="How to Apply for Transport Card - Step by Step Guide"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full rounded-lg h-full"
          />
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p className="font-medium text-gray-800 mb-2">Follow these simple steps to apply for your transport card:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Watch the tutorial video above</li>
            <li>Fill out the application form</li>
            <li>Submit required documents</li>
            <li>Complete the payment process</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}
