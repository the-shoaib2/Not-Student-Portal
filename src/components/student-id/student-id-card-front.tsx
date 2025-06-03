import { Card, CardContent } from "@/components/ui/card"
import { Phone, Droplets } from "lucide-react"
import Barcode from 'react-barcode';

interface StudentIdCardFrontProps {
  name: string;
  program: string;
  studentId: string;
  regNo: string;
  issueDate: string;
  expireDate: string;
  photoUrl: string;
  phone: string;
  bloodGroup: string;
}

export default function StudentIdCardFront({ 
  name,
  program,
  studentId,
  regNo,
  issueDate,
  expireDate,
  photoUrl,
  phone,
  bloodGroup
}: StudentIdCardFrontProps) {
  // Top mosaic pattern for front side
  const topMosaicPattern = [
    // Row 1
    [
      "bg-orange-400",
      "bg-gray-200",
      "bg-blue-400",
      "bg-gray-200",
      "bg-orange-600",
      "bg-gray-200",
      "bg-gray-200",
      "bg-orange-400",
      "bg-blue-400",
      "bg-orange-600",
      "bg-gray-200",
      "bg-orange-400",
    ],
    // Row 2
    [
      "bg-gray-200",
      "bg-orange-400",
      "bg-gray-200",
      "bg-blue-600",
      "bg-gray-200",
      "bg-yellow-200",
      "bg-gray-200",
      "bg-gray-200",
      "bg-blue-400",
      "bg-gray-200",
      "bg-yellow-200",
      "bg-gray-200",
    ],
  ]

  return (
    <Card className="w-[400px] h-[250px] bg-white shadow-xl rounded-xl overflow-hidden">
      <CardContent className="p-0 h-full relative">
        {/* Top Colorful Mosaic Pattern */}
        <div className="space-y-0">
          {topMosaicPattern.map((row, rowIndex) => (
            <div key={rowIndex} className="h-3 flex">
              {row.map((color, colIndex) => (
                <div key={colIndex} className={`w-8 h-full ${color}`} />
              ))}
              <div className="flex-1 bg-gray-200"></div>
            </div>
          ))}
        </div>

        <div className="flex h-[220px]">
          {/* Left Side Content */}
          <div className="flex-1 pr-4">


            {/* University Logo and Name */}
            <div className="flex justify-center items-center mb-1 p-0">
              <img 
                src="/diulogoside.png" 
                alt="University Logo" 
                className="h-10 object-contain"
              />
            </div>
            <div className="px-4">
              
              {/* Student Information */}
              <div className="space-y-0 text-left text-sm">
              <div className="font-bold text-gray-900 text-[16px] tracking-wide">{name}</div>
              <div className="text-gray-700 text-[13px]">{program}</div>
              <div className="text-gray-700 text-[13px]">ID : {studentId}</div>
              <div className="text-gray-700 text-[13px]">Reg. No : {regNo}</div>
              <div className="text-gray-700 text-[13px]">Issue On : {issueDate}</div>
              <div className="text-gray-700 text-[13px]">Expire On : {expireDate}</div>
            </div>
            </div>


            {/* Barcode */}
            <div className="mt-3 px-2 flex justify-center">
              <Barcode 
                value={studentId} 
                width={1.5} 
                height={30} 
                displayValue={false} 
                background="transparent"
                lineColor="#000000"
                margin={0}
              />
            </div>
          </div>

          {/* Right Side - Photo and Contact */}
          <div className="w-32 flex flex-col">
            {/* Student Photo */}
            <div className="w-28 h-32 bg-blue-500 mb-4 rounded border border-gray-300 overflow-hidden relative px-4">
              <div className="w-full h-full bg-blue-500 flex items-center justify-center">
                <img
                  src={photoUrl}
                  alt="Student Photo"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Colored strip at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-2 flex">
                <div className="flex-1 bg-red-500"></div>
                <div className="flex-1 bg-purple-600"></div>
                <div className="flex-1 bg-orange-500"></div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-xs space-y-1 mb-3">
              <div className="flex items-center">
                <Phone className="w-3 h-3 mr-1" />
                <span className="text-[11px]">{phone}</span>
              </div>
              <div className="flex items-center">
                <Droplets className="w-3 h-3 mr-1 text-red-500" />
                <span className="text-[11px] font-medium">{bloodGroup}</span>
              </div>
            </div>

            {/* Signature */}
            <div className="mt-auto text-center">
              <div className="text-[9px] italic mb-1 text-gray-500">
                <div className="w-16 h-4 border-b border-gray-400 mx-auto mb-1"></div>
              </div>
              <div className="text-[10px] font-medium text-gray-700">Registrar</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
