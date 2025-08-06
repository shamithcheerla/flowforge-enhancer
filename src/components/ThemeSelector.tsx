import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Palette, Sun, Moon, Monitor } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [selectedColorScheme, setSelectedColorScheme] = useState("default");
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themes = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor }
  ];

  const colorSchemes = [
    { value: "default", label: "Default Blue", color: "bg-blue-500" },
    { value: "emerald", label: "Emerald Green", color: "bg-emerald-500" },
    { value: "purple", label: "Purple", color: "bg-purple-500" },
    { value: "rose", label: "Rose", color: "bg-rose-500" },
    { value: "orange", label: "Orange", color: "bg-orange-500" },
    { value: "slate", label: "Slate Gray", color: "bg-slate-500" }
  ];

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    toast({
      title: "Theme Updated",
      description: `Switched to ${newTheme} theme`
    });
  };

  const handleColorSchemeChange = (scheme: string) => {
    setSelectedColorScheme(scheme);
    // Apply color scheme to CSS variables
    const root = document.documentElement;
    const schemeConfig = colorSchemes.find(c => c.value === scheme);
    
    if (schemeConfig) {
      // Update CSS custom properties based on color scheme
      switch (scheme) {
        case 'emerald':
          root.style.setProperty('--primary', '160 84% 39%');
          break;
        case 'purple':
          root.style.setProperty('--primary', '262 83% 58%');
          break;
        case 'rose':
          root.style.setProperty('--primary', '347 77% 50%');
          break;
        case 'orange':
          root.style.setProperty('--primary', '25 95% 53%');
          break;
        case 'slate':
          root.style.setProperty('--primary', '210 40% 50%');
          break;
        default:
          root.style.setProperty('--primary', '221 83% 53%');
      }
    }
    
    toast({
      title: "Color Scheme Updated",
      description: `Applied ${colorSchemes.find(c => c.value === scheme)?.label} color scheme`
    });
  };

  if (!mounted) {
    return (
      <Card className="bg-surface border-card-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="h-5 w-5" />
            <span>Appearance</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-16 bg-muted rounded"></div>
              <div className="h-16 bg-muted rounded"></div>
              <div className="h-16 bg-muted rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-surface border-card-border shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Palette className="h-5 w-5" />
          <span>Appearance</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Theme Mode</Label>
          <div className="grid grid-cols-3 gap-2">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon;
              return (
                <Button
                  key={themeOption.value}
                  variant={theme === themeOption.value ? "default" : "outline"}
                  className="flex flex-col items-center space-y-2 h-auto py-3"
                  onClick={() => handleThemeChange(themeOption.value)}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs">{themeOption.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Color Scheme</Label>
          <Select value={selectedColorScheme} onValueChange={handleColorSchemeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {colorSchemes.map((scheme) => (
                <SelectItem key={scheme.value} value={scheme.value}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${scheme.color}`} />
                    <span>{scheme.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="pt-4 border-t border-border">
          <Button variant="outline" className="w-full" onClick={() => {
            setTheme("system");
            setSelectedColorScheme("default");
            document.documentElement.style.setProperty('--primary', '221 83% 53%');
            toast({
              title: "Settings Reset",
              description: "Theme settings have been reset to defaults"
            });
          }}>
            Reset to Defaults
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}