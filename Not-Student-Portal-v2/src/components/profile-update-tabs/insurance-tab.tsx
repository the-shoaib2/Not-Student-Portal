import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

export default function InsuranceTab() {
  const [dob, setDob] = useState<Date | undefined>()

  return (
    <div className="bg-white p-6 border rounded-md">
      <h2 className="text-center text-lg font-semibold mb-6 border-b pb-2">Insurance Information</h2>

      <div className="space-y-8">
        <div>
          <h3 className="font-medium text-lg mb-4">Insurance Details</h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">
                Please select (✔) the guardian : <span className="text-red-500">*</span> :
              </h4>
              <RadioGroup className="flex flex-col gap-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="father" id="insurance-father" />
                  <Label htmlFor="insurance-father">Father</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mother" id="insurance-mother" />
                  <Label htmlFor="insurance-mother">Mother</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="insurance-other" />
                  <Label htmlFor="insurance-other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="insuranceName">Name</Label>
                  <Input id="insuranceName" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insuranceRelation">Relation</Label>
                  <Input id="insuranceRelation" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insuranceContact">Contact No</Label>
                  <Input id="insuranceContact" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="insuranceNid">NID No</Label>
                  <Input id="insuranceNid" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insuranceAddress">Address</Label>
                  <Input id="insuranceAddress" />
                </div>

                <div className="space-y-2">
                  <Label>Date Of Birth</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        {dob ? format(dob, "P") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={dob} onSelect={setDob} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8">UPDATE INSURANCE INFO</Button>
      </div>
    </div>
  )
}
