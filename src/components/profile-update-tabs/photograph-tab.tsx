"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Upload, Loader2, Camera } from "lucide-react"
import { useRef, useState, useEffect, useCallback } from "react"
import { toast } from "react-hot-toast"
import { profileService } from "@/services/proxy-api"
import { useAuth } from "@/contexts/AuthContext"
import { Skeleton } from "@/components/ui/skeleton"

interface PhotographTabProps {
  data?: any;
}

export default function PhotographTab({ data }: PhotographTabProps) {
  const { user } = useAuth()
  const [photograph, setPhotograph] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)
  const hasFetched = useRef(false)
  
  useEffect(() => {
    if (hasFetched.current) return;
    
    const fetchPhotograph = async () => {
      try {
        setIsLoading(true)
        const photoData = await profileService.getPhotograph()
        if (photoData?.photoUrl) {
          setPhotograph(photoData.photoUrl)
        }
      } catch (error) {
        console.error('Error loading photograph:', error)
      } finally {
        setIsLoading(false)
      }
    }

    hasFetched.current = true
    fetchPhotograph()
  }, [])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size should be less than 10MB')
      return
    }

    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await profileService.updatePhotographInfo(formData)
      
      if (response?.photoUrl) {
        setPhotograph(response.photoUrl)
        toast.success('Photograph updated successfully')
      }
    } catch (error) {
      console.error('Error uploading photograph:', error)
      toast.error('Failed to upload photograph')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isDragging) setIsDragging(true)
  }, [isDragging])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      const event = { target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>
      handleFileChange(event)
    }
  }, [])

  return (
    <div className="space-y-6">
      <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
        <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-orange-50 to-amber-50 border-b">
          <h2 className="text-base font-semibold text-orange-800">Photograph</h2>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid gap-6">
            {/* Image Preview */}
            <div className="flex flex-col items-center justify-center border-none rounded-lg p-6 bg-gray-50">
              {isLoading ? (
                <div className="w-full flex flex-col items-center">
                  <Skeleton 
                    className="rounded-md" 
                    style={{
                      width: '200px',
                      height: '200px',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              ) : photograph ? (
                <img 
                  src={photograph} 
                  alt="Student Photograph Preview" 
                  className="max-w-full h-auto object-contain"
                  style={{
                    maxHeight: '300px',
                    maxWidth: '100%',
                    height: 'auto',
                    width: 'auto'
                  }}
                  onLoad={() => setIsLoading(false)}
                />
              ) : (
                <div className="text-center py-8">
                  <div className="mb-4">
                    <Camera className="h-16 w-16 mx-auto text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">No photo uploaded</p>
                </div>
              )}
            </div>

            {/* Upload Area */}
            <div 
              ref={dropZoneRef}
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${
                isDragging ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-400 bg-white'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleUploadClick}
            >
              <div className="text-center cursor-pointer">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 mb-4">
                  <Upload className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Drag and drop your photo here
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  or click to select a file
                </p>
                <p className="text-xs text-gray-500">
                  JPG, PNG up to 10MB
                </p>
              </div>
              <input
                id="photo"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={isUploading || isLoading}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center">
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2"
              disabled={isUploading || isLoading || !photograph}
              onClick={handleUploadClick}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'UPDATE PHOTOGRAPH'
              )}
            </Button>
            <p className="mt-2 text-xs text-gray-500 text-center">
              Recommended size: 300x300 pixels, Max size: 10MB
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
