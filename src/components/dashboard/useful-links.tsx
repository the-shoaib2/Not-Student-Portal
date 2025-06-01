import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function UsefulLinks() {
  // Mock data - in a real app, this would come from an API
  const links = [
    { name: "Daffodil University", url: "#", image: "/dashbord/diulogo.png" },
    { name: "IQAC", url: "#", image: "/dashbord/iqac.png" },
    { name: "HRDI", url: "#", image: "/dashbord/hrdi.png" },
    { name: "Academic Calendar", url: "#", image: "/dashbord/calender.png" },
    { name: "DIU Library", url: "#", image: "/dashbord/diuLibrary.png" },
    { name: "DIU Hostel", url: "#", image: "/dashbord/hostel.png" },
    { name: "Art Gallery", url: "#", image: "/dashbord/artof.png" },
    { name: "Notice Board", url: "#", image: "/dashbord/noticeBoard.png" },
    { name: "SBSD", url: "#", image: "/dashbord/sbsf.png" },
  ]

  return (
    <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <CardTitle className="text-base font-semibold text-blue-800">Useful Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-muted transition-colors"
            >
              <div className="relative w-full h-10 mb-2">
                <Image src={link.image || "/dashbord/placeholder.svg"} alt={link.name} fill className="object-contain" sizes="(max-width: 768px) 100vw, 100vw" />
              </div>
              <span className="text-xs text-center">{link.name}</span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
