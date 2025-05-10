import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface GuardianTabProps {
  data?: any;
}

export default function GuardianTab({ data }: GuardianTabProps) {
  return (
    <div className="bg-white p-6 border rounded-md">
      <h2 className="text-center text-lg font-semibold mb-6 border-b pb-2">Guardian Information</h2>

      <div className="space-y-8">
        <div>
          <h3 className="font-medium text-lg mb-4">Father and Mother Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fatherName">Father's Name</Label>
                <Input id="fatherName" defaultValue="Alamgir Khan" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherContact">
                  Father's Contact No <span className="text-red-500">*</span>
                </Label>
                <Input id="fatherContact" defaultValue="01761889567" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherOccupation">Father's Occupation</Label>
                <Input id="fatherOccupation" defaultValue="Farmer" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherDesignation">Father's Designation</Label>
                <Input id="fatherDesignation" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherEmployer">Father's Employers Name</Label>
                <Input id="fatherEmployer" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherIncome">Father's Annual Income</Label>
                <Input id="fatherIncome" defaultValue="103000" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="motherName">Mother's Name</Label>
                <Input id="motherName" defaultValue="Mst. Rafeza Begum" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherContact">
                  Mother's Contact No <span className="text-red-500">*</span>
                </Label>
                <Input id="motherContact" defaultValue="01761889567" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherOccupation">Mother's Occupation</Label>
                <Input id="motherOccupation" defaultValue="House Wife" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherDesignation">Mother's Designation</Label>
                <Input id="motherDesignation" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherEmployer">Mother's Employer's Name</Label>
                <Input id="motherEmployer" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherIncome">Mother's Annual Income</Label>
                <Input id="motherIncome" defaultValue="0" />
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <Label htmlFor="parentsAddress">Parent's Address</Label>
            <Textarea id="parentsAddress" className="resize-none" />
            <div className="text-xs text-right text-gray-500">0 / 200</div>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-4">Local Guardian's Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="guardianName">Name</Label>
                <Input id="guardianName" defaultValue="Abdur Rohoman" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guardianContact">Contact No</Label>
                <Input id="guardianContact" defaultValue="01835506526" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="guardianRelationship">Relationship</Label>
                <Input id="guardianRelationship" defaultValue="Brother" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guardianAddress">Address</Label>
                <Input id="guardianAddress" defaultValue="Dhaka,Bangladesh" />
                <div className="text-xs text-right text-gray-500">16 / 200</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">
            Who will bear Your Educational Expenses <span className="text-red-500">*</span> :
          </h3>
          <RadioGroup defaultValue="father" className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="father" id="expenses-father" />
              <Label htmlFor="expenses-father">Father</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mother" id="expenses-mother" />
              <Label htmlFor="expenses-mother">Mother</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="guardian" id="expenses-guardian" />
              <Label htmlFor="expenses-guardian">Local Guardian</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8">UPDATE GUARDIAN INFO</Button>
      </div>
    </div>
  )
}
