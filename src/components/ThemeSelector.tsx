import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Palette, Sun, Moon, Monitor } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState("system");
  const [selectedColorScheme, setSelectedColorScheme] = useState("default");
  const { toast } = useToast();

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

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // System theme
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    
    toast({
      title: "Theme Updated",
      description: `Switched to ${theme} theme`
    });
  };

  const handleColorSchemeChange = (scheme: string) => {
    setSelectedColorScheme(scheme);
    toast({
      title: "Color Scheme Updated",
      description: `Applied ${colorSchemes.find(c => c.value === scheme)?.label} color scheme`
    });
  };

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
            {themes.map((theme) => {
              const Icon = theme.icon;
              return (
                <Button
                  key={theme.value}
                  variant={selectedTheme === theme.value ? "default" : "outline"}
                  className="flex flex-col items-center space-y-2 h-auto py-3"
                  onClick={() => handleThemeChange(theme.value)}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs">{theme.label}</span>
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
          <Button variant="outline" className="w-full">
            Reset to Defaults
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}