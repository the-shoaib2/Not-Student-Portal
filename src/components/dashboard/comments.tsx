import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Comments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="part-one">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="part-one">PART ONE</TabsTrigger>
            <TabsTrigger value="part-two">PART TWO</TabsTrigger>
          </TabsList>
          <TabsContent value="part-one" className="space-y-4 mt-4">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Al-Hadith" />
                <AvatarFallback>AH</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="font-semibold">Al-Hadith</h4>
                <p className="text-sm">
                  Ibn Abbas said, When you want to mention your companion's faults, remember your own faults. - (Al-Adab
                  Al-Mufrad 328)
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Muhammad Ali" />
                <AvatarFallback>MA</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="font-semibold">Muhammad Ali</h4>
                <p className="text-sm">
                  I hated every minute of training, but I said, Don't quit. Suffer now and live the rest of your life as
                  a champion.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Steve Jobs" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="font-semibold">Steve Jobs</h4>
                <p className="text-sm">
                  The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't
                  settle.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="part-two" className="mt-4">
            <p className="text-muted-foreground text-center py-8">No comments in part two.</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
