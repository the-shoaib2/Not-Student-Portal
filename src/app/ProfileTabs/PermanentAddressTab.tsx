import React, { memo } from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/card';
import { StudentInfo, PermanentAddressInfo } from '../../services/api';

interface PermanentAddressTabProps {
  studentInfo: StudentInfo | null;
  permanentAddress: PermanentAddressInfo | null;
  loading: boolean;
}

const PermanentAddressTabComponent: React.FC<PermanentAddressTabProps> = ({ studentInfo, permanentAddress, loading }) => {
  if (loading || !studentInfo) {
    return (
      <div className="space-y-4">
        <Card className="shadow-sm overflow-hidden">
          <div className="p-3 sm:p-4 bg-gray-100 border-b">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="p-3 sm:p-4 space-y-2">
            {[...Array(6)].map((_, j) => (
              <div key={j} className="flex flex-col sm:flex-row sm:justify-between gap-1 py-1 border-b border-gray-100">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full sm:w-1/2 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
        <CardHeader className="p-3 sm:p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
          <h2 className="text-lg font-bold text-teal-800">Permanent Address</h2>
        </CardHeader>
        <CardContent className="p-3 sm:p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
                <span className="text-sm text-gray-500">House/Building:</span> 
                <span className="font-medium text-gray-800">{studentInfo.permanentHouse || 'Not provided'}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
                <span className="text-sm text-gray-500">Street:</span> 
                <span className="font-medium text-gray-800">{studentInfo.permanentStreet || 'Not provided'}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
                <span className="text-sm text-gray-500">City:</span> 
                <span className="font-medium text-gray-800">{studentInfo.permanentCity || 'Not provided'}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
                <span className="text-sm text-gray-500">Phone:</span> 
                <span className="font-medium text-gray-800">{studentInfo.permanentPhone || studentInfo.mobile || 'Not provided'}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
                <span className="text-sm text-gray-500">District:</span> 
                <span className="font-medium text-gray-800">
                  {permanentAddress?.permanentDistrictName && permanentAddress.permanentDistrictName !== 'null' 
                    ? permanentAddress.permanentDistrictName 
                    : studentInfo.permanentDistrict || 'Not provided'}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
                <span className="text-sm text-gray-500">Division:</span> 
                <span className="font-medium text-gray-800">
                  {permanentAddress?.permanentDivisionName && permanentAddress.permanentDivisionName !== 'null' 
                    ? permanentAddress.permanentDivisionName 
                    : 'Not provided'}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
                <span className="text-sm text-gray-500">Country:</span> 
                <span className="font-medium text-gray-800">
                  {permanentAddress?.permanentCountryName && permanentAddress.permanentCountryName !== 'null' 
                    ? permanentAddress.permanentCountryName 
                    : studentInfo.permanentCountry || 'Bangladesh'}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
                <span className="text-sm text-gray-500">Parent Address:</span> 
                <span className="font-medium text-gray-800">{studentInfo.parentAddress || 'Same as permanent address'}</span>
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
              <span className="text-sm text-gray-500">Zip Code:</span> 
              <span className="font-medium text-gray-800">{studentInfo.permanentZipCode || 'Not provided'}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1">
              <span className="text-sm text-gray-500">Phone:</span> 
              <span className="font-medium text-gray-800">{studentInfo.permanentPhone || 'Not provided'}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {studentInfo.parentAddress && (
        <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
          <CardHeader className="p-3 sm:p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
            <h2 className="text-lg font-bold text-teal-800">Parent's Address</h2>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1">
              <span className="text-sm text-gray-500">Address:</span> 
              <span className="font-medium text-gray-800">{studentInfo.parentAddress}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export const PermanentAddressTab = memo(PermanentAddressTabComponent);
export default memo(PermanentAddressTabComponent);
