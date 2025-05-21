import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Monitor } from "lucide-react"

interface AppearanceSectionProps {
  formData: {
    fontSize: string;
    reducedMotion: boolean;
    [key: string]: any;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    fontSize: string;
    reducedMotion: boolean;
    [key: string]: any;
  }>>;
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
}

const THEMES = [
  { 
    id: 'light', 
    name: 'Light',
    icon: Sun,
    description: 'Light theme with white background',
    color: 'bg-white border-2 border-gray-200'
  },
  { 
    id: 'dark', 
    name: 'Dark',
    icon: Moon,
    description: 'Dark theme with dark background',
    color: 'bg-gray-900 border-2 border-gray-700'
  },
  { 
    id: 'system', 
    name: 'System',
    icon: Monitor,
    description: 'Use system theme',
    color: 'bg-gradient-to-r from-white to-gray-900 border-2 border-gray-300'
  }
];

export function AppearanceSection({ 
  formData, 
  setFormData, 
  currentTheme, 
  setCurrentTheme 
}: AppearanceSectionProps) {
  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  };

  return (
    <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
        <CardTitle className="text-base font-semibold text-teal-800">Appearance</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-4 space-y-2">
        <div className="space-y-2">
          <div>
            <h3 className="text-sm font-medium mb-3">Theme</h3>
            <RadioGroup 
              value={currentTheme} 
              onValueChange={handleThemeChange}
              className="grid grid-cols-3 gap-4"
            >
              {THEMES.map((theme) => {
                const Icon = theme.icon;
                return (
                  <div key={theme.id} className="space-y-2">
                    <RadioGroupItem value={theme.id} id={theme.id} className="peer sr-only" />
                    <Label
                      htmlFor={theme.id}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-500 [&:has([data-state=checked])]:border-teal-500 cursor-pointer transition-colors"
                    >
                      <div className={`w-full h-10 rounded-md mb-2 ${theme.color} flex items-center justify-center`}>
                        <Icon className="h-5 w-5 text-foreground" />
                      </div>
                      <span className="text-sm font-medium">{theme.name}</span>
                      <span className="text-xs text-muted-foreground text-center">
                        {theme.description}
                      </span>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Font Size</h3>
            <div className="grid grid-cols-3 gap-2">
              {['Small', 'Medium', 'Large'].map((size) => (
                <Button
                  key={size}
                  variant={formData.fontSize === size.toLowerCase() ? 'default' : 'outline'}
                  size="sm"
                  className={`w-full ${
                    formData.fontSize === size.toLowerCase() 
                      ? 'bg-teal-600 hover:bg-teal-700' 
                      : 'hover:bg-teal-50 hover:text-teal-700 dark:hover:bg-teal-900/30 dark:hover:text-teal-400'
                  }`}
                  onClick={() => setFormData({ ...formData, fontSize: size.toLowerCase() })}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between space-x-4">
            <div className="space-y-0.5">
              <Label htmlFor="reduced-motion" className="text-sm font-medium">
                Reduced Motion
              </Label>
              <p className="text-xs text-muted-foreground">
                Reduce the amount of animation and motion
              </p>
            </div>
            <Switch
              id="reduced-motion"
              checked={formData.reducedMotion}
              onCheckedChange={(checked) => setFormData({ ...formData, reducedMotion: checked })}
              className="data-[state=checked]:bg-teal-600 data-[state=unchecked]:bg-gray-200"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
