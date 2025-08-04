import { useState } from "react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeSelector } from "@/components/ThemeSelector";
import { Settings as SettingsIcon, Bell, Shield, Palette, Users, Database, Globe, Lock, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("UTC");

  const handleSettingChange = (setting: string, value: boolean | string) => {
    toast({
      title: "Setting Updated",
      description: `${setting} has been updated successfully`
    });
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and application settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-surface border-card-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notif">Email notifications</Label>
                <Switch 
                  id="email-notif" 
                  checked={emailNotifications}
                  onCheckedChange={(value) => {
                    setEmailNotifications(value);
                    handleSettingChange("Email notifications", value);
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notif">Push notifications</Label>
                <Switch 
                  id="push-notif" 
                  checked={pushNotifications}
                  onCheckedChange={(value) => {
                    setPushNotifications(value);
                    handleSettingChange("Push notifications", value);
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="mobile-notif">Mobile app notifications</Label>
                <Switch id="mobile-notif" />
              </div>
            </CardContent>
          </Card>

          <ThemeSelector />

          <Card className="bg-surface border-card-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="2fa">Two-factor authentication</Label>
                <Switch 
                  id="2fa" 
                  checked={twoFactorAuth}
                  onCheckedChange={(value) => {
                    setTwoFactorAuth(value);
                    handleSettingChange("Two-factor authentication", value);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Change Password</Label>
                <Button variant="outline" className="w-full">
                  <Lock className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-card-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">Eastern Time</SelectItem>
                    <SelectItem value="PST">Pacific Time</SelectItem>
                    <SelectItem value="GMT">GMT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-save">Auto-save drafts</Label>
                <Switch 
                  id="auto-save" 
                  checked={autoSave}
                  onCheckedChange={setAutoSave}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-card-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Data & Storage</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Storage Usage</Label>
                <div className="flex justify-between text-sm">
                  <span>Used: 2.4 GB</span>
                  <span>Available: 7.6 GB</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Clear Cache
              </Button>
              <Button variant="destructive" className="w-full">
                Export All Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;