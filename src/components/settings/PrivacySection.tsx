import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from 'react-hot-toast';
import { Download, Globe, Eye, EyeOff, Smartphone, Mail, Activity } from 'lucide-react';

interface PrivacySectionProps {
  formData: {
    isEmailVisible?: boolean;
    isPhoneVisible?: boolean;
    showOnlineStatus?: boolean;
    websites?: Array<{ name: string; url: string; type: string; isEditing?: boolean }>;
    [key: string]: any;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    isEmailVisible?: boolean;
    isPhoneVisible?: boolean;
    showOnlineStatus?: boolean;
    websites?: Array<{ name: string; url: string; type: string; isEditing?: boolean }>;
    [key: string]: any;
  }>>;
}

export function PrivacySection({ 
  formData = { 
    isEmailVisible: false, 
    isPhoneVisible: false, 
    showOnlineStatus: true,
    websites: []
  }, 
  setFormData 
}: PrivacySectionProps) {
  const handleToggle = (field: 'isEmailVisible' | 'isPhoneVisible' | 'showOnlineStatus') => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
    
    // In a real app, you would call an API here
    toast.success(`Privacy setting updated`);
  };

  const handleDownloadData = () => {
    // In a real app, this would call an API to download user data
    toast.success('Your data download has started');
  };

  const PrivacyToggle = ({ 
    id, 
    label, 
    description, 
    checked, 
    onCheckedChange,
    icon: Icon 
  }: {
    id: string;
    label: string;
    description: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    icon: React.ElementType;
  }) => (
    <div className="flex items-center justify-between p-2 border rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <Label htmlFor={id} className="font-medium">
            {label}
          </Label>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );

  return (
    <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
        <CardTitle className="text-base font-semibold text-teal-800">Privacy Settings</CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-2 space-y-2">
        <PrivacyToggle
          id="email-visibility"
          label="Email Visibility"
          description="Show your email address on your public profile"
          checked={!!formData.isEmailVisible}
          onCheckedChange={() => handleToggle('isEmailVisible')}
          icon={Mail}
        />
        
        <PrivacyToggle
          id="phone-visibility"
          label="Phone Number Visibility"
          description="Show your phone number on your public profile"
          checked={!!formData.isPhoneVisible}
          onCheckedChange={() => handleToggle('isPhoneVisible')}
          icon={Smartphone}
        />
        
        <PrivacyToggle
          id="online-status"
          label="Online Status"
          description="Show when you're active on the platform"
          checked={!!formData.showOnlineStatus}
          onCheckedChange={() => handleToggle('showOnlineStatus')}
          icon={Activity}
        />
      </CardContent>
    </Card>
  );
}
