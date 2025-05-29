import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"

interface GuardianTabProps {
  data?: any;
  onUpdate?: () => void;
}

export default function GuardianTab({ data, onUpdate }: GuardianTabProps) {
  const [formData, setFormData] = useState({
    fatherName: '',
    fatherMobile: '',
    fatherOccupation: '',
    fatherDesignation: '',
    fatherEmployerName: '',
    fatherAnnualIncome: '',
    motherName: '',
    motherMobile: '',
    motherOccupation: '',
    motherDesignation: '',
    motherEmployerName: '',
    motherAnnualIncome: '',
    parentAddress: '',
    localGuardianName: '',
    localGuardianMobile: '',
    localGuardianRelation: '',
    localGuardianAddress: '',
    bearEduExpense: ''
  })

  useEffect(() => {
    if (data) {
      setFormData({
        fatherName: data.fatherName || '',
        fatherMobile: data.fatherMobile || '',
        fatherOccupation: data.fatherOccupation || '',
        fatherDesignation: data.fatherDesignation || '',
        fatherEmployerName: data.fatherEmployerName || '',
        fatherAnnualIncome: data.fatherAnnualIncome?.toString() || '',
        motherName: data.motherName || '',
        motherMobile: data.motherMobile || '',
        motherOccupation: data.motherOccupation || '',
        motherDesignation: data.motherDesignation || '',
        motherEmployerName: data.motherEmployerName || '',
        motherAnnualIncome: data.motherAnnualIncome?.toString() || '',
        parentAddress: data.parentAddress || '',
        localGuardianName: data.localGuardianName || '',
        localGuardianMobile: data.localGuardianMobile || '',
        localGuardianRelation: data.localGuardianRelation || '',
        localGuardianAddress: data.localGuardianAddress || '',
        bearEduExpense: data.bearEduExpense || 'father'
      })
    }
  }, [data])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      bearEduExpense: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Here you would typically call your API to update the guardian info
      // await profileService.updateGuardianInfo(formData)
      toast.success('Guardian information updated successfully')
      onUpdate?.()
    } catch (error) {
      console.error('Error updating guardian info:', error)
      toast.error('Failed to update guardian information')
    }
  }
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 border rounded-md">
      <h2 className="text-center text-lg font-semibold mb-6 border-b pb-2">Guardian Information</h2>

      <div className="space-y-8">
        <div>
          <h3 className="font-medium text-lg mb-4">Father and Mother Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fatherName">Father's Name</Label>
                <Input 
                  id="fatherName" 
                  value={formData.fatherName}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherContact">
                  Father's Contact No <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="fatherMobile" 
                  value={formData.fatherMobile}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherOccupation">Father's Occupation</Label>
                <Input 
                  id="fatherOccupation" 
                  value={formData.fatherOccupation}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherDesignation">Father's Designation</Label>
                <Input 
                  id="fatherDesignation" 
                  value={formData.fatherDesignation}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherEmployer">Father's Employers Name</Label>
                <Input 
                  id="fatherEmployerName" 
                  value={formData.fatherEmployerName}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherIncome">Father's Annual Income</Label>
                <Input 
                  id="fatherAnnualIncome" 
                  type="number"
                  value={formData.fatherAnnualIncome}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="motherName">Mother's Name</Label>
                <Input 
                  id="motherName" 
                  value={formData.motherName}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherContact">
                  Mother's Contact No <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="motherMobile" 
                  value={formData.motherMobile}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherOccupation">Mother's Occupation</Label>
                <Input 
                  id="motherOccupation" 
                  value={formData.motherOccupation}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherDesignation">Mother's Designation</Label>
                <Input 
                  id="motherDesignation" 
                  value={formData.motherDesignation}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherEmployer">Mother's Employer's Name</Label>
                <Input 
                  id="motherEmployerName" 
                  value={formData.motherEmployerName}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherIncome">Mother's Annual Income</Label>
                <Input 
                  id="motherAnnualIncome" 
                  type="number"
                  value={formData.motherAnnualIncome}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <Label htmlFor="parentsAddress">Parent's Address</Label>
            <Textarea 
              id="parentAddress" 
              className="resize-none" 
              value={formData.parentAddress}
              onChange={handleChange}
            />
            <div className="text-xs text-right text-gray-500">0 / 200</div>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-4">Local Guardian's Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="guardianName">Name</Label>
                <Input 
                  id="localGuardianName" 
                  value={formData.localGuardianName}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guardianContact">Contact No</Label>
                <Input 
                  id="localGuardianMobile" 
                  value={formData.localGuardianMobile}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="guardianRelationship">Relationship</Label>
                <Input 
                  id="localGuardianRelation" 
                  value={formData.localGuardianRelation}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guardianAddress">Address</Label>
                <Input 
                  id="localGuardianAddress" 
                  value={formData.localGuardianAddress}
                  onChange={handleChange}
                />
                <div className="text-xs text-right text-gray-500">16 / 200</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">
            Who will bear Your Educational Expenses <span className="text-red-500">*</span> :
          </h3>
          <RadioGroup 
            value={formData.bearEduExpense}
            onValueChange={handleRadioChange}
            className="flex flex-col gap-2"
          >
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
        <Button 
          type="submit" 
          className="bg-orange-500 hover:bg-orange-600 text-white px-8"
        >
          UPDATE GUARDIAN INFO
        </Button>
      </div>
    </form>
  )
}
