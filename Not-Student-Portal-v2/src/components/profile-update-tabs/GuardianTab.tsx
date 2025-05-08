import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { profileService, StudentInfo } from '../../services/api';
import { Skeleton } from '../ui/skeleton';

const GuardianTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<StudentInfo>>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchGuardian = async () => {
      try {
        const data = await profileService.getStudentInfo();
        if (data) setFormData(data);
      } catch (error) {
        console.error('Error fetching guardian info:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGuardian();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, bearEduExpense: e.target.value }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fatherName) newErrors.fatherName = "Required";
    if (!formData.fatherMobile) newErrors.fatherMobile = "Required";
    if (!formData.motherName) newErrors.motherName = "Required";
    if (!formData.motherMobile) newErrors.motherMobile = "Required";
    if (!formData.localGuardianName) newErrors.localGuardianName = "Required";
    if (!formData.localGuardianMobile) newErrors.localGuardianMobile = "Required";
    if (!formData.bearEduExpense) newErrors.bearEduExpense = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      await profileService.updateStudentInfo(formData);
    } catch (error) {
      console.error('Error updating guardian info:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-10 w-2/3" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Guardian Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 font-semibold">Father and Mother Details</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Father's Name ✶</label>
              <Input name="fatherName" value={formData.fatherName || ''} onChange={handleInputChange} required />
              {errors.fatherName && <div className="text-xs text-red-500">{errors.fatherName}</div>}
            </div>
            <div>
              <label className="text-sm font-medium">Father's Contact No ✶</label>
              <Input name="fatherMobile" value={formData.fatherMobile || ''} onChange={handleInputChange} required />
              {errors.fatherMobile && <div className="text-xs text-red-500">{errors.fatherMobile}</div>}
            </div>
            <div>
              <label className="text-sm font-medium">Father's Occupation</label>
              <Input name="fatherOccupation" value={formData.fatherOccupation || ''} onChange={handleInputChange} />
            </div>
            <div>
              <label className="text-sm font-medium">Father's Designation</label>
              <Input name="fatherDesignation" value={formData.fatherDesignation || ''} onChange={handleInputChange} />
            </div>
            <div>
              <label className="text-sm font-medium">Father's Employer's Name</label>
              <Input name="fatherEmployerName" value={formData.fatherEmployerName || ''} onChange={handleInputChange} />
            </div>
            <div>
              <label className="text-sm font-medium">Father's Annual Income</label>
              <Input name="fatherAnnualIncome" type="number" value={formData.fatherAnnualIncome || ''} onChange={handleInputChange} />
            </div>
            <div>
              <label className="text-sm font-medium">Mother's Name ✶</label>
              <Input name="motherName" value={formData.motherName || ''} onChange={handleInputChange} required />
              {errors.motherName && <div className="text-xs text-red-500">{errors.motherName}</div>}
            </div>
            <div>
              <label className="text-sm font-medium">Mother's Contact No ✶</label>
              <Input name="motherMobile" value={formData.motherMobile || ''} onChange={handleInputChange} required />
              {errors.motherMobile && <div className="text-xs text-red-500">{errors.motherMobile}</div>}
            </div>
            <div>
              <label className="text-sm font-medium">Mother's Occupation</label>
              <Input name="motherOccupation" value={formData.motherOccupation || ''} onChange={handleInputChange} />
            </div>
            <div>
              <label className="text-sm font-medium">Mother's Designation</label>
              <Input name="motherDesignation" value={formData.motherDesignation || ''} onChange={handleInputChange} />
            </div>
            <div>
              <label className="text-sm font-medium">Mother's Employer's Name</label>
              <Input name="motherEmployerName" value={formData.motherEmployerName || ''} onChange={handleInputChange} />
            </div>
            <div>
              <label className="text-sm font-medium">Mother's Annual Income</label>
              <Input name="motherAnnualIncome" type="number" value={formData.motherAnnualIncome || ''} onChange={handleInputChange} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Parent's Address</label>
              <textarea
                name="parentAddress"
                value={formData.parentAddress || ''}
                onChange={handleInputChange}
                maxLength={200}
                className="w-full border rounded p-2"
                rows={2}
              />
              <div className="text-xs text-gray-400 text-right">{(formData.parentAddress?.length || 0)}/200</div>
            </div>
          </div>
          <div className="my-4 font-semibold">Local Guardian's Details</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Name ✶</label>
              <Input name="localGuardianName" value={formData.localGuardianName || ''} onChange={handleInputChange} required />
              {errors.localGuardianName && <div className="text-xs text-red-500">{errors.localGuardianName}</div>}
            </div>
            <div>
              <label className="text-sm font-medium">Contact No ✶</label>
              <Input name="localGuardianMobile" value={formData.localGuardianMobile || ''} onChange={handleInputChange} required />
              {errors.localGuardianMobile && <div className="text-xs text-red-500">{errors.localGuardianMobile}</div>}
            </div>
            <div>
              <label className="text-sm font-medium">Relationship</label>
              <Input name="localGuardianRelation" value={formData.localGuardianRelation || ''} onChange={handleInputChange} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Address</label>
              <textarea
                name="localGuardianAddress"
                value={formData.localGuardianAddress || ''}
                onChange={handleInputChange}
                maxLength={200}
                className="w-full border rounded p-2"
                rows={2}
              />
              <div className="text-xs text-gray-400 text-right">{(formData.localGuardianAddress?.length || 0)}/200</div>
            </div>
          </div>
          <div className="my-4 font-semibold">Who will bear Your Educational Expenses ✶</div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="bearEduExpense"
                value="father"
                checked={formData.bearEduExpense === 'father'}
                onChange={handleRadioChange}
                required
              />
              Father
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="bearEduExpense"
                value="mother"
                checked={formData.bearEduExpense === 'mother'}
                onChange={handleRadioChange}
                required
              />
              Mother
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="bearEduExpense"
                value="local guardian"
                checked={formData.bearEduExpense === 'local guardian'}
                onChange={handleRadioChange}
                required
              />
              Local Guardian
            </label>
          </div>
          {errors.bearEduExpense && <div className="text-xs text-red-500">{errors.bearEduExpense}</div>}
        </CardContent>
      </Card>
      <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
    </form>
  );
};

export default GuardianTab;
