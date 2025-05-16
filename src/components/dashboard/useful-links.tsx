import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function UsefulLinks() {
  // Mock data - in a real app, this would come from an API
  const links = [
    { name: "Daffodil University", url: "#", image: "/dashbord/placeholder.svg?height=50&width=150" },
    { name: "IQAC", url: "#", image: "/placeholder.svg?height=50&width=150" },
    { name: "HRDI", url: "#", image: "/placeholder.svg?height=50&width=150" },
    { name: "Academic Calendar", url: "#", image: "/placeholder.svg?height=50&width=150" },
    { name: "DIU Library", url: "#", image: "/placeholder.svg?height=50&width=150" },
    { name: "DIU Hostel", url: "#", image: "/placeholder.svg?height=50&width=150" },
    { name: "Art Gallery", url: "#", image: "/placeholder.svg?height=50&width=150" },
    { name: "Notice Board", url: "#", image: "/placeholder.svg?height=50&width=150" },
    { name: "SBSD", url: "#", image: "/placeholder.svg?height=50&width=150" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Useful Links</CardTitle>
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
                <Image src={link.image || "/placeholder.svg"} alt={link.name} fill className="object-contain" />
              </div>
              <span className="text-xs text-center">{link.name}</span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
