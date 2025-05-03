import React, { memo } from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/card';
import { StudentInfo, PresentAddressInfo } from '../../services/api';

interface PresentAddressTabProps {
  studentInfo: StudentInfo | null;
  presentAddress: PresentAddressInfo | null;
  loading: boolean;
}

const PresentAddressTabComponent: React.FC<PresentAddressTabProps> = ({ studentInfo, presentAddress, loading }) => {
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
          <h2 className="text-lg font-bold text-teal-800">Present Address</h2>
        </CardHeader>
        <CardContent className="p-3 sm:p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
                <span className="text-sm text-gray-500">House/Building:</span> 
                <span className="font-medium text-gray-800">{studentInfo.presentHouse || 'Not provided'}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
                <span className="text-sm text-gray-500">Street:</span> 
                <span className="font-medium text-gray-800">{studentInfo.presentStreet || 'Not provided'}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
                <span className="text-sm text-gray-500">City:</span> 
                <span className="font-medium text-gray-800">{studentInfo.presentCity || 'Not provided'}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
                <span className="text-sm text-gray-500">Phone:</span> 
                <span className="font-medium text-gray-800">{studentInfo.presentPhone || studentInfo.mobile || 'Not provided'}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
                <span className="text-sm text-gray-500">District:</span> 
                <span className="font-medium text-gray-800">
                  {presentAddress?.presentDistrictName && presentAddress.presentDistrictName !== 'null' 
                    ? presentAddress.presentDistrictName 
                    : studentInfo.presentDistrict || 'Not provided'}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
                <span className="text-sm text-gray-500">Division:</span> 
                <span className="font-medium text-gray-800">
                  {presentAddress?.presentDivisionName && presentAddress.presentDivisionName !== 'null' 
                    ? presentAddress.presentDivisionName 
                    : 'Not provided'}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
                <span className="text-sm text-gray-500">Country:</span> 
                <span className="font-medium text-gray-800">
                  {presentAddress?.presentCountryName || studentInfo.presentCountry || 'Not provided'}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
              <span className="text-sm text-gray-500">Zip Code:</span> 
              <span className="font-medium text-gray-800">{studentInfo.presentZipCode || 'Not provided'}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1">
              <span className="text-sm text-gray-500">Phone:</span> 
              <span className="font-medium text-gray-800">{studentInfo.presentPhone || 'Not provided'}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {studentInfo.hostelAddress && (
        <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
          <CardHeader className="p-3 sm:p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
            <h2 className="text-lg font-bold text-teal-800">Hostel Address</h2>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1">
              <span className="text-sm text-gray-500">Address:</span> 
              <span className="font-medium text-gray-800">{studentInfo.hostelAddress}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {studentInfo.messAddress && (
        <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
          <CardHeader className="p-3 sm:p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
            <h2 className="text-lg font-bold text-teal-800">Mess Address</h2>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1">
              <span className="text-sm text-gray-500">Address:</span> 
              <span className="font-medium text-gray-800">{studentInfo.messAddress}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {studentInfo.otherAddress && (
        <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
          <CardHeader className="p-3 sm:p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
            <h2 className="text-lg font-bold text-teal-800">Other Address</h2>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1">
              <span className="text-sm text-gray-500">Address:</span> 
              <span className="font-medium text-gray-800">{studentInfo.otherAddress}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export const PresentAddressTab = memo(PresentAddressTabComponent);
export default memo(PresentAddressTabComponent);
