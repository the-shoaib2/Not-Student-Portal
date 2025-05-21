import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Bell, BellOff, Mail, Shield, Smartphone } from "lucide-react"

interface NotificationsSectionProps {
  formData: {
    securityAlerts: boolean;
    accountUpdates: boolean;
    browserNotifications: boolean;
    emailNotifications: boolean;
    marketingEmails: boolean;
    [key: string]: any;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    securityAlerts: boolean;
    accountUpdates: boolean;
    browserNotifications: boolean;
    emailNotifications: boolean;
    marketingEmails: boolean;
    [key: string]: any;
  }>>;
}

const notificationSettings = [
  {
    id: 'email',
    title: 'Email Notifications',
    icon: Mail,
    description: 'Receive notifications via email',
    items: [
      {
        id: 'securityAlerts',
        label: 'Security Alerts',
        description: 'Get notified about security events and account activity',
        icon: Shield
      },
      {
        id: 'accountUpdates',
        label: 'Account Updates',
        description: 'Get notified about important account changes',
        icon: Smartphone
      },
      {
        id: 'marketingEmails',
        label: 'Marketing Emails',
        description: 'Receive updates about new features and promotions',
        icon: Mail
      }
    ]
  },
  {
    id: 'push',
    title: 'Push Notifications',
    icon: Bell,
    description: 'Receive notifications in your browser',
    items: [
      {
        id: 'browserNotifications',
        label: 'Browser Notifications',
        description: 'Show desktop notifications in your browser',
        icon: Bell
      },
      {
        id: 'emailNotifications',
        label: 'Email Notifications',
        description: 'Send me notifications via email when I\'m not active',
        icon: BellOff
      }
    ]
  }
];

export function NotificationsSection({ formData, setFormData }: NotificationsSectionProps) {
  const handleToggle = (key: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
        <CardTitle className="text-base font-semibold text-teal-800">Notifications</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-4 space-y-2">
        {notificationSettings.map((setting) => (
          <div key={setting.id} className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <setting.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium">{setting.title}</h3>
                <p className="text-xs text-muted-foreground">{setting.description}</p>
              </div>
            </div>
            
            <div className="space-y-2 pl-11">
              {setting.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <label 
                          htmlFor={item.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {item.label}
                        </label>
                      </div>
                      <p className="text-xs text-muted-foreground pl-6">
                        {item.description}
                      </p>
                    </div>
                    <Switch
                      id={item.id}
                      checked={formData[item.id]}
                      onCheckedChange={(checked) => handleToggle(item.id, checked)}
                    />
                  </div>
                );
              })}
            </div>
            
            {setting.id !== notificationSettings[notificationSettings.length - 1].id && (
              <Separator className="my-2" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
