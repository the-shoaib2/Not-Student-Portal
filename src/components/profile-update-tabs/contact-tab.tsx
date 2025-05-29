"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ContactTabProps {
  data?: any;
  district?: any[];
  division?: any[];
  country?: any[];
}

export default function ContactTab({ data, district, division, country }: ContactTabProps) {
  return (
    <div className="bg-white p-6 border rounded-md">
      <h2 className="text-center text-lg font-semibold mb-6 border-b pb-2">Contact Information</h2>

      <div className="space-y-8">
        <div>
          <h3 className="font-medium text-lg mb-4">Contact Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">
                  Mobile <span className="text-red-500">*</span>
                </Label>
                <Input id="mobile" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone1">Phone 1</Label>
                <Input id="phone1" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone2">Phone 2</Label>
                <Input id="phone2" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input id="email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="personalEmail">Personal Email</Label>
                <Input id="personalEmail" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-4">Permanent Address</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="permanentAddress">
                  Address <span className="text-red-500">*</span>
                </Label>
                <Input id="permanentAddress" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="permanentPostOffice">Post Office</Label>
                <Input id="permanentPostOffice" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="permanentPoliceStation">Police Station</Label>
                <Input id="permanentPoliceStation" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="permanentDistrict">
                  District/City <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {district?.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="permanentDivision">
                  Division/State <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select division" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dhaka">Dhaka</SelectItem>
                    <SelectItem value="chittagong">Chittagong</SelectItem>
                    <SelectItem value="rajshahi">Rajshahi</SelectItem>
                    <SelectItem value="khulna">Khulna</SelectItem>
                    <SelectItem value="barisal">Barisal</SelectItem>
                    <SelectItem value="sylhet">Sylhet</SelectItem>
                    <SelectItem value="rangpur">Rangpur</SelectItem>
                    <SelectItem value="mymensingh">Mymensingh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="permanentCountry">
                  Country <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {country?.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="permanentZipCode">Zip Code</Label>
                <Input id="permanentZipCode" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-4">Present Address</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="presentAddress">Address</Label>
                <Input id="presentAddress" required />
                <div className="text-xs text-red-500">Required</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="presentPostOffice">Post Office</Label>
                <Input id="presentPostOffice" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="presentPoliceStation">Police Station</Label>
                <Input id="presentPoliceStation" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="presentDistrict">District/City</Label>
                <Input id="presentDistrict" required />
                <div className="text-xs text-red-500">Required</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="presentDivision">Division/State</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select division" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dhaka">Dhaka</SelectItem>
                    <SelectItem value="chittagong">Chittagong</SelectItem>
                    <SelectItem value="rajshahi">Rajshahi</SelectItem>
                    <SelectItem value="khulna">Khulna</SelectItem>
                    <SelectItem value="barisal">Barisal</SelectItem>
                    <SelectItem value="sylhet">Sylhet</SelectItem>
                    <SelectItem value="rangpur">Rangpur</SelectItem>
                    <SelectItem value="mymensingh">Mymensingh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="presentCountry">Country</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {country?.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-xs text-red-500">Required</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="presentZipCode">Zip Code</Label>
                <Input id="presentZipCode" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hostelAddress">Address of Hostel (If you are residing in Hostel)</Label>
            <Textarea id="hostelAddress" className="resize-none" placeholder="Hostel Address" />
            <div className="text-xs text-right text-gray-500">0 / 200</div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="messAddress">Address of Mess (If you are residing in Mess)</Label>
            <Textarea id="messAddress" className="resize-none" placeholder="Mess Address" />
            <div className="text-xs text-right text-gray-500">0 / 200</div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="otherAddress">Other Address (If any)</Label>
            <Textarea id="otherAddress" className="resize-none" placeholder="Other Address" />
            <div className="text-xs text-right text-gray-500">0 / 200</div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8">UPDATE CONTACT INFO</Button>
      </div>
    </div>
  )
}
