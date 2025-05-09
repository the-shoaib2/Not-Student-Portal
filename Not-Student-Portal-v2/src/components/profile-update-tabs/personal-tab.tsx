"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DatePicker } from "@/components/ui/date-picker"
import { PersonalTabProps, PersonalInfo, MaritalStatus, BloodGroup, Religion } from "@/types/profile"
import { profileService } from "@/services/api"
import { toast } from "react-hot-toast"

export default function PersonalTab({ data, maritalStatus, bloodGroup, religion }: PersonalTabProps) {
  const [dob, setDob] = useState<Date | undefined>()
  
  // Initialize form state from data
  const [formData, setFormData] = useState<Partial<PersonalInfo>>(data || {})

  const handleFormSubmit = async () => {
    try {
      // const response = await profileService.updateStudentInfo(formData)
      toast.success("Personal info updated successfully")
      // console.log("Personal info updated successfully:", response)
    } catch (error) {
      toast.error("Error updating personal info")
    }
  }

  useEffect(() => {
    if (data) {
      setFormData(data)
    }
  }, [data])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="firstName" 
                placeholder="Enter first name" 
                value={formData.firstName || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>
                Sex <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.sex} onValueChange={(value) => setFormData(prev => ({ ...prev, sex: value as 'Male' | 'Female' | 'Other' }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                Marital Status <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.maritalStatus} onValueChange={(value) => setFormData(prev => ({ ...prev, maritalStatus: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select marital status" />
                </SelectTrigger>
                <SelectContent>
                  {maritalStatus?.map((status: MaritalStatus) => (
                    <SelectItem key={status.maritalStatus} value={status.maritalStatus}>
                      {status.maritalStatus}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                Blood Group <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.bloodGroup} onValueChange={(value) => setFormData(prev => ({ ...prev, bloodGroup: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  {bloodGroup?.map((group: BloodGroup) => (
                    <SelectItem key={group.bloodGroup} value={group.bloodGroup}>
                      {group.bloodGroup}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                Religion <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.religion} onValueChange={(value) => setFormData(prev => ({ ...prev, religion: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select religion" />
                </SelectTrigger>
                <SelectContent>
                  {religion?.map((rel: Religion) => (
                    <SelectItem key={rel.religion} value={rel.religion}>
                      {rel.religion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">
                Nationality <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="nationality" 
                placeholder="Enter nationality" 
                value={formData.nationality || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, nationality: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="voterId">
                Voter ID <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="voterId" 
                placeholder="Enter voter ID" 
                value={formData.voterId || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, voterId: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="middleName">Middle Name</Label>
              <Input 
                id="middleName" 
                placeholder="Enter middle name" 
                value={formData.middleName || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, middleName: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                placeholder="Enter last name" 
                value={formData.lastName || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fatherName">Father's Name</Label>
              <Input id="fatherName" placeholder="Enter father's name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motherName">Mother's Name</Label>
              <Input id="motherName" placeholder="Enter mother's name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">
                Date of Birth <span className="text-red-500">*</span>
              </Label>
              <DatePicker
                date={dob}
                setDate={setDob}
                placeholder="Select date of birth"
                startYear={1900}
                endYear={new Date().getFullYear()}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="placeOfBirth">Place Of Birth</Label>
              <Input id="placeOfBirth" placeholder="Enter place of birth" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                placeholder="Enter any additional notes" 
                value={formData.notes || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>
                Gender <span className="text-red-500">*</span>
              </Label>
              <RadioGroup defaultValue="male" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Input id="nationality" placeholder="Enter nationality" defaultValue={data?.nationality || ''} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nid">National ID/Birth Certificate No.</Label>
              <Input id="nid" placeholder="Enter National ID" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passport">Passport No</Label>
              <Input id="passport" placeholder="Enter passport number" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tin">TIN</Label>
              <Input id="tin" placeholder="Enter TIN number" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="socialId">Social Network Id</Label>
              <Input id="socialId" placeholder="Enter social network ID" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="aboutYou">About You</Label>
              <Textarea id="aboutYou" className="resize-none" placeholder="Write something about yourself..." />
              <div className="text-xs text-right text-gray-500">0 / 200</div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8">
            UPDATE PERSONAL INFO
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
