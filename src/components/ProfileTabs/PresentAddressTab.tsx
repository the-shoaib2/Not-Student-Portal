import React, { memo } from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Table, TableBody, TableRow, TableCell } from '../ui/table';
import { StudentInfo, PresentAddressInfo } from '../../services/api';

interface PresentAddressTabProps {
  studentInfo: StudentInfo | null;
  presentAddress: PresentAddressInfo | null;
  loading: boolean;
}

const PresentAddressTabComponent: React.FC<PresentAddressTabProps> = ({ studentInfo, presentAddress, loading }) => {
  if (loading || !studentInfo) {
    return (
      <Card className="shadow-sm overflow-hidden animate-in fade-in-50 duration-500">
        <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
          <div className="h-6 w-48 bg-gray-200 rounded-md animate-pulse" />
        </CardHeader>
        <CardContent className="p-2 sm:p-3">
          <div className="space-y-4">
            {[...Array(3)].map((_, sectionIndex) => (
              <div key={sectionIndex} className="space-y-3">
                <div className="h-5 w-40 bg-gray-100 rounded-md animate-pulse mb-2" />
                {[...Array(4)].map((_, rowIndex) => (
                  <div key={rowIndex} className="flex justify-between items-center py-2 border-b border-gray-50">
                    <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" />
                    <div className="h-4 w-48 bg-gray-200 rounded-md animate-pulse" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
        <h2 className="text-base font-semibold text-teal-800">Address Information</h2>
      </CardHeader>
      <CardContent className="p-2 sm:p-3">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-xs text-gray-500 font-semibold bg-gray-50" colSpan={2}>Present Address</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500 w-1/3">House/Building</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.presentHouse || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Street</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.presentStreet || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">City</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.presentCity || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">District</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">
                {presentAddress?.presentDistrictName && presentAddress.presentDistrictName !== 'null' 
                  ? presentAddress.presentDistrictName 
                  : studentInfo.presentDistrict || 'Not provided'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Division</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">
                {presentAddress?.presentDivisionName && presentAddress.presentDivisionName !== 'null' 
                  ? presentAddress.presentDivisionName 
                  : 'Not provided'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Country</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">
                {presentAddress?.presentCountryName || studentInfo.presentCountry || 'Not provided'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Phone</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.presentPhone || studentInfo.mobile || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Zip Code</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.presentZipCode || 'Not provided'}</TableCell>
            </TableRow>

            {studentInfo.hostelAddress && (
              <>
                <TableRow>
                  <TableCell className="text-xs text-gray-500 font-semibold bg-gray-50" colSpan={2}>Hostel Address</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-xs text-gray-500">Address</TableCell>
                  <TableCell className="text-sm font-medium text-gray-800">{studentInfo.hostelAddress}</TableCell>
                </TableRow>
              </>
            )}

            {studentInfo.messAddress && (
              <>
                <TableRow>
                  <TableCell className="text-xs text-gray-500 font-semibold bg-gray-50" colSpan={2}>Mess Address</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-xs text-gray-500">Address</TableCell>
                  <TableCell className="text-sm font-medium text-gray-800">{studentInfo.messAddress}</TableCell>
                </TableRow>
              </>
            )}

            {studentInfo.otherAddress && (
              <>
                <TableRow>
                  <TableCell className="text-xs text-gray-500 font-semibold bg-gray-50" colSpan={2}>Other Address</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-xs text-gray-500">Address</TableCell>
                  <TableCell className="text-sm font-medium text-gray-800">{studentInfo.otherAddress}</TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export const PresentAddressTab = memo(PresentAddressTabComponent);
export default memo(PresentAddressTabComponent);
