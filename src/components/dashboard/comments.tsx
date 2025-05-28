import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"

export default function Comments() {
  const [activeTab, setActiveTab] = useState("part-one")

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(prevTab => prevTab === "part-one" ? "part-two" : "part-one")
    }, 3000)

    return () => clearInterval(interval)
  }, [])
  return (
    <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-purple-50 to-pink-50 border-b">
        <CardTitle className="text-base font-semibold text-purple-800">Comments</CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-3">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="part-one">PART ONE</TabsTrigger>
            <TabsTrigger value="part-two">PART TWO</TabsTrigger>
          </TabsList>
          <TabsContent value="part-one" className="space-y-4 mt-4">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src="/dashbord/socrates.jpg" alt="Al-Hadith" />
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
                <AvatarImage src="/dashbord/muhammadAli.jpg" alt="Muhammad Ali" />
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
                <AvatarImage src="/dashbord/steveJobs.png" alt="Steve Jobs" />
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

          <TabsContent value="part-two" className="space-y-4 mt-4">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src="/dashbord/albertEinestine.jpg" alt="Albert Einstein" />
                <AvatarFallback>AE</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="font-semibold">Albert Einstein</h4>
                <p className="text-sm">
                  Life is like riding a bicycle. To keep your balance, you must keep moving.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src="/dashbord/socrates.jpg" alt="Socrates" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="font-semibold">Socrates</h4>
                <p className="text-sm">
                  Know Thyself.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src="/dashbord/abdulKalam.jpg" alt="Abdul Kalam" />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="font-semibold">Abdul Kalam</h4>
                <p className="text-sm">
                  Don't read success stories, you will only get a message. Read failure stories, you will get some ideas to get success.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
