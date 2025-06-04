import { Card, CardContent } from "@/components/ui/card"
import { Home, Phone, Globe, Mail } from "lucide-react"

interface StudentIdCardBackProps {
  universityName: string;
  returnAddressLine1: string;
  returnAddressLine2: string;
  contactPhone1: string;
  contactPhone2: string;
  website: string;
  email: string;
}

export default function StudentIdCardBack({
  universityName,
  returnAddressLine1,
  returnAddressLine2,
  contactPhone1,
  contactPhone2,
  website,
  email
}: StudentIdCardBackProps) {
  // Exact mosaic pattern from the image
  const mosaicPattern = [
    // Row 1
    [
      "bg-yellow-400",
      "bg-purple-600",
      "bg-orange-600",
      "bg-red-500",
      "bg-blue-800",
      "bg-gray-100",
      "bg-blue-400",
      "bg-yellow-200",
    ],
    // Row 2
    [
      "bg-orange-500",
      "bg-red-500",
      "bg-gray-100",
      "bg-blue-800",
      "bg-gray-100",
      "bg-blue-400",
      "bg-gray-100",
      "bg-yellow-200",
    ],
    // Row 3
    [
      "bg-yellow-400",
      "bg-orange-600",
      "bg-red-500",
      "bg-gray-100",
      "bg-blue-600",
      "bg-gray-100",
      "bg-green-400",
      "bg-gray-100",
    ],
    // Row 4
    [
      "bg-orange-500",
      "bg-red-500",
      "bg-purple-600",
      "bg-blue-800",
      "bg-gray-100",
      "bg-blue-400",
      "bg-gray-100",
      "bg-yellow-200",
    ],
    // Row 5
    [
      "bg-yellow-400",
      "bg-orange-600",
      "bg-red-500",
      "bg-gray-100",
      "bg-blue-600",
      "bg-gray-100",
      "bg-blue-400",
      "bg-gray-100",
    ],
    // Row 6
    [
      "bg-orange-500",
      "bg-red-500",
      "bg-purple-600",
      "bg-blue-800",
      "bg-gray-100",
      "bg-green-400",
      "bg-gray-100",
      "bg-yellow-200",
    ],
    // Row 7
    [
      "bg-yellow-400",
      "bg-purple-600",
      "bg-orange-600",
      "bg-red-500",
      "bg-blue-600",
      "bg-gray-100",
      "bg-blue-400",
      "bg-gray-100",
    ],
    // Row 8
    [
      "bg-orange-500",
      "bg-red-500",
      "bg-gray-100",
      "bg-blue-800",
      "bg-gray-100",
      "bg-blue-400",
      "bg-gray-100",
      "bg-yellow-200",
    ],
    // Row 9
    [
      "bg-yellow-400",
      "bg-orange-600",
      "bg-red-500",
      "bg-purple-600",
      "bg-blue-600",
      "bg-gray-100",
      "bg-green-400",
      "bg-gray-100",
    ],
    // Row 10
    [
      "bg-orange-500",
      "bg-red-500",
      "bg-purple-600",
      "bg-blue-800",
      "bg-gray-100",
      "bg-blue-400",
      "bg-gray-100",
      "bg-yellow-200",
    ],
    // Row 11
    [
      "bg-yellow-400",
      "bg-purple-600",
      "bg-orange-600",
      "bg-red-500",
      "bg-blue-600",
      "bg-gray-100",
      "bg-blue-400",
      "bg-gray-100",
    ],
    // Row 12
    [
      "bg-orange-500",
      "bg-red-500",
      "bg-gray-100",
      "bg-blue-800",
      "bg-gray-100",
      "bg-green-400",
      "bg-gray-100",
      "bg-yellow-200",
    ],
    // Row 13
    [
      "bg-yellow-400",
      "bg-orange-600",
      "bg-red-500",
      "bg-purple-600",
      "bg-blue-600",
      "bg-gray-100",
      "bg-blue-400",
      "bg-gray-100",
    ],
    // Row 14
    [
      "bg-orange-500",
      "bg-red-500",
      "bg-purple-600",
      "bg-blue-800",
      "bg-gray-100",
      "bg-blue-400",
      "bg-gray-100",
      "bg-yellow-200",
    ],
    // Row 15
    [
      "bg-yellow-400",
      "bg-purple-600",
      "bg-orange-600",
      "bg-red-500",
      "bg-blue-600",
      "bg-gray-100",
      "bg-green-400",
      "bg-gray-100",
    ],
  ]

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <Card className="w-[400px] h-[250px] bg-white shadow-xl rounded-xl overflow-hidden">
        <CardContent className="p-0 h-full">
          <div className="flex h-full">
            {/* Left Side - Mosaic Pattern */}
            <div className="w-32 flex flex-col">
              {mosaicPattern.map((row, rowIndex) => (
                <div key={rowIndex} className="flex h-[16.67px]">
                  {row.map((color, colIndex) => (
                    <div key={colIndex} className={`w-4 h-full ${color}`} />
                  ))}
                </div>
              ))}
            </div>

            {/* Right Side - Contact Information */}
            <div className="flex-1 bg-gray-50 p-5 flex flex-col justify-between">
              {/* Header Text */}
              <div>
                <div className="text-[8px] text-gray-600 mb-1 leading-tight">
                  If found, please return to the Office of the Registrar
                </div>

                <div className="text-blue-700 font-bold text-[15px] mb-5 leading-tight whitespace-nowrap">
                  {universityName}
                </div>

                {/* Contact Information */}
                <div className="space-y-1">
                  {/* Address */}
                  <div className="flex bg-gray-50 items-start gap-2">
                    <div className="w-7 h-7 bg-red-600 flex items-center justify-center rounded-sm flex-shrink-0 mt-0.5">
                      <Home className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-[10px] text-gray-800 leading-tight">
                      <div className="font-medium">{returnAddressLine1}</div>
                      <div>{returnAddressLine2}</div>
                    </div>
                  </div>

                  {/* Phone Numbers */}
                  <div className="flex bg-gray-50 items-start gap-2">
                    <div className="w-7 h-7 bg-blue-500 flex items-center justify-center rounded-sm flex-shrink-0">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-[10px] text-gray-800 leading-tight">
                      <div>{contactPhone1}</div>
                      <div>{contactPhone2}</div>
                    </div>
                  </div>

                  {/* Website */}
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-purple-700 flex items-center justify-center rounded-sm flex-shrink-0">
                      <Globe className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-[10px] text-gray-800">{website}</div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-gray-700 flex items-center justify-center rounded-sm flex-shrink-0">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-[10px] text-gray-800">{email}</div>
                  </div>
                </div>
              </div>

              {/* Footer Text */}
              <div className="text-[10px] text-gray-600 mt-4">This card is not transferable</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
