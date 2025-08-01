import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Bell, Shield, Palette, Users } from "lucide-react";

const Settings = () => {
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
                <Switch id="email-notif" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notif">Push notifications</Label>
                <Switch id="push-notif" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-card-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Appearance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark mode</Label>
                <Switch id="dark-mode" defaultChecked />
              </div>
              <Button variant="outline" className="w-full">Change Theme</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;