"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DatePicker } from "@/components/ui/date-picker"

export default function PersonalTab() {
  const [dob, setDob] = useState<Date | undefined>()

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
              <Input id="firstName" placeholder="Enter first name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="middleName">Middle Name</Label>
              <Input id="middleName" placeholder="Enter middle name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Enter last name" />
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
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="placeOfBirth">Place Of Birth</Label>
              <Input id="placeOfBirth" placeholder="Enter place of birth" />
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
              <Label htmlFor="maritalStatus">Marital Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a+">A+</SelectItem>
                  <SelectItem value="a-">A-</SelectItem>
                  <SelectItem value="b+">B+</SelectItem>
                  <SelectItem value="b-">B-</SelectItem>
                  <SelectItem value="ab+">AB+</SelectItem>
                  <SelectItem value="ab-">AB-</SelectItem>
                  <SelectItem value="o+">O+</SelectItem>
                  <SelectItem value="o-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="religion">Religion</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select religion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="islam">Islam</SelectItem>
                  <SelectItem value="hinduism">Hinduism</SelectItem>
                  <SelectItem value="christianity">Christianity</SelectItem>
                  <SelectItem value="buddhism">Buddhism</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bangladesh">Bangladesh</SelectItem>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="pakistan">Pakistan</SelectItem>
                  <SelectItem value="nepal">Nepal</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
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
