import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface PaymentBannerProps {
  loading?: boolean;
}

export default function PaymentBanner({ loading = false }: PaymentBannerProps) {
  if (loading) {
    return (
      <Card className="overflow-hidden pb-0 w-full h-full shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-0">
          <div className="w-full h-0 pb-[80%] relative overflow-hidden aspect-[5/4]">
            <Skeleton className="absolute inset-0 w-full h-full" />
          </div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card style={{ background: 'linear-gradient(to left, hsl(355.93deg 72.97% 43.53%), hsl(357.43deg 85.37% 51.76%))' }} className="overflow-hidden pb-0 w-full h-full shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="w-full h-0 pb-[80%] relative overflow-hidden aspect-[5/4]">
          <Image
            src="/dashbord/account.jpg"
            alt="Payment Banner"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      </CardContent>
    </Card>
  )
}
