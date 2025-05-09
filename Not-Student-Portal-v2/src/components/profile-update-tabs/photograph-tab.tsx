"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

export default function PhotographTab() {
  return (
    <div className="bg-white p-6 border rounded-md">
      <h2 className="text-center text-lg font-semibold mb-6 border-b pb-2">Photograph</h2>

      <div className="flex flex-col items-center justify-center gap-6">
        <Card className="w-48 h-48 flex items-center justify-center">
          <CardContent className="p-0 flex flex-col items-center justify-center w-full h-full">
            <div className="text-center">
              <div className="mb-2">
                <Upload className="h-10 w-10 mx-auto text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">No photo uploaded</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4 w-full max-w-md">
          <div className="space-y-2">
            <Label htmlFor="photo">Upload Photograph</Label>
            <div className="flex gap-2">
              <Input
                id="photo"
                type="file"
                accept="image/*"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium"
              />
              <Button variant="outline">Browse</Button>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <p>* Photo must be in JPG/JPEG format</p>
            <p>* Maximum file size: 100KB</p>
            <p>* Dimension: 300x300 pixels</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8">UPDATE PHOTOGRAPH</Button>
      </div>
    </div>
  )
}

// Helper component for file input
function Input({ className, ...props }) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}
