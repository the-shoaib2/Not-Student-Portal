import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, ExternalLink, HelpCircle, Clock, LayoutDashboard } from "lucide-react"

export function ContactInfo() {
  const contactItems = [
    {
      icon: <MapPin className="h-5 w-5 text-teal-600" />,
      title: "Office Address",
      value: "Transport Office, DSC"
    },
    {
      icon: <Mail className="h-5 w-5 text-teal-600" />,
      title: "Email",
      value: "transport-dsc@daffodilvarsity.edu.bd",
      href: "mailto:transport-dsc@daffodilvarsity.edu.bd"
    },
    {
      icon: <Phone className="h-5 w-5 text-teal-600" />,
      title: "Mobile",
      value: "01847140037",
      href: "tel:+8801847140037"
    }
  ]

  const usefulLinks = [
    {
      icon: <HelpCircle className="h-4 w-4" />,
      title: "Help Desk",
      href: "https://pd.daffodilvarsity.edu.bd/support_ticket"
    },
    {
      icon: <Clock className="h-4 w-4" />,
      title: "Transport Schedule",
      href: "https://transport.daffodilvarsity.edu.bd"
    },
    {
      icon: <LayoutDashboard className="h-4 w-4" />,
      title: "Display Board",
      href: "https://transport.daffodilvarsity.edu.bd/display"
    }
  ]

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-lg py-4">
        <CardTitle className="text-lg font-semibold">Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">Need Help?</h3>
            <p className="text-sm text-muted-foreground">
              For any support, feedback or suggestions, please reach out through the following channels:
            </p>
          </div>

          <div className="space-y-3">
            {contactItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  {item.href ? (
                    <a 
                      href={item.href}
                      className="text-sm text-teal-600 hover:underline hover:text-teal-700 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Useful Links</h3>
          <div className="space-y-2">
            {usefulLinks.map((link, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start gap-2 text-left h-auto py-2"
                asChild
              >
                <a 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="no-underline"
                >
                  {link.icon}
                  <span className="flex-1">{link.title}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
