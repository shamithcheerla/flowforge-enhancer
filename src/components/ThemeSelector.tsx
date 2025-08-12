import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Palette, Sun, Moon, Monitor } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ThemeSelector() {
  const [theme, setThemeState] = useState(() => 
    localStorage.getItem('theme') || 'light'
  );
  const [selectedColorScheme, setSelectedColorScheme] = useState(() =>
    localStorage.getItem('colorScheme') || 'default'
  );
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Apply saved theme on mount
    document.documentElement.classList.toggle('dark', theme === 'dark');
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, [theme]);

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
    setThemeState(newTheme);
    
    // Apply theme immediately
    const applyTheme = () => {
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (newTheme === 'light') {
        document.documentElement.classList.remove('dark');
      } else if (newTheme === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', isDark);
      }
    };
    
    applyTheme();
    localStorage.setItem('theme', newTheme);
    
    toast({
      title: "Theme Updated",
      description: `Switched to ${newTheme} theme`
    });
  };

  const handleColorSchemeChange = (scheme: string) => {
    setSelectedColorScheme(scheme);
    localStorage.setItem('colorScheme', scheme);
    
    // Apply color scheme to CSS variables
    const root = document.documentElement;
    
    // Update CSS custom properties based on color scheme
    switch (scheme) {
      case 'emerald':
        root.style.setProperty('--primary', '160 84% 39%');
        root.style.setProperty('--primary-hover', '160 84% 34%');
        root.style.setProperty('--primary-glow', '160 84% 44%');
        break;
      case 'purple':
        root.style.setProperty('--primary', '262 83% 58%');
        root.style.setProperty('--primary-hover', '262 83% 53%');
        root.style.setProperty('--primary-glow', '262 83% 63%');
        break;
      case 'rose':
        root.style.setProperty('--primary', '347 77% 50%');
        root.style.setProperty('--primary-hover', '347 77% 45%');
        root.style.setProperty('--primary-glow', '347 77% 55%');
        break;
      case 'orange':
        root.style.setProperty('--primary', '25 95% 53%');
        root.style.setProperty('--primary-hover', '25 95% 48%');
        root.style.setProperty('--primary-glow', '25 95% 58%');
        break;
      case 'slate':
        root.style.setProperty('--primary', '210 40% 50%');
        root.style.setProperty('--primary-hover', '210 40% 45%');
        root.style.setProperty('--primary-glow', '210 40% 55%');
        break;
      default:
        root.style.setProperty('--primary', '221.2 83.2% 53.3%');
        root.style.setProperty('--primary-hover', '221.2 83.2% 48%');
        root.style.setProperty('--primary-glow', '221.2 83.2% 58%');
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
            handleThemeChange("light");
            setSelectedColorScheme("default");
            localStorage.setItem('colorScheme', 'default');
            document.documentElement.style.setProperty('--primary', '221.2 83.2% 53.3%');
            document.documentElement.style.setProperty('--primary-hover', '221.2 83.2% 48%');
            document.documentElement.style.setProperty('--primary-glow', '221.2 83.2% 58%');
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