import { useState, useEffect } from "react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeSelector } from "@/components/ThemeSelector";
import { Settings as SettingsIcon, Bell, Shield, Palette, Users, Database, Globe, Lock, Smartphone, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Settings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserPreferences();
  }, [user]);

  const fetchUserPreferences = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error fetching preferences:', error);
        return;
      }
      
      if (data) {
        setPreferences(data);
      } else {
        // Create default preferences if none exist
        const defaultPrefs = {
          user_id: user.id,
          notifications_email: true,
          notifications_push: true,
          notifications_desktop: true,
          two_factor_enabled: false,
          language: 'en',
          timezone: 'UTC',
          date_format: 'MM/dd/yyyy',
          theme: 'system'
        };
        
        const { data: newData, error: insertError } = await supabase
          .from('user_preferences')
          .insert([defaultPrefs])
          .select()
          .single();
        
        if (!insertError && newData) {
          setPreferences(newData);
        }
      }
    } catch (error) {
      console.error('Error with preferences:', error);
    }
  };

  const updatePreference = async (key: string, value: any) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_preferences')
        .update({ [key]: value })
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setPreferences(prev => ({ ...prev, [key]: value }));
      
      toast({
        title: "Setting Updated",
        description: `${key.replace('_', ' ')} has been updated successfully`
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update setting",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const languageNames = {
    en: "English",
    es: "Español", 
    fr: "Français",
    de: "Deutsch",
    zh: "中文",
    ja: "日本語"
  };

  const handleSettingChange = (setting: string, value: boolean | string) => {
    toast({
      title: "Setting Updated",
      description: `${setting} has been updated successfully`
    });
  };

  const handlePasswordChange = () => {
    toast({
      title: "Password Update",
      description: "Password change form would open in a real app"
    });
  };

  const handleClearCache = () => {
    toast({
      title: "Cache Cleared",
      description: "Application cache has been cleared successfully"
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Export",
      description: "Your data export will be ready shortly"
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
                  checked={preferences.notifications_email || false}
                  onCheckedChange={(value) => updatePreference('notifications_email', value)}
                  disabled={loading}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notif">Push notifications</Label>
                <Switch 
                  id="push-notif" 
                  checked={preferences.notifications_push || false}
                  onCheckedChange={(value) => updatePreference('notifications_push', value)}
                  disabled={loading}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="desktop-notif">Desktop notifications</Label>
                <Switch 
                  id="desktop-notif" 
                  checked={preferences.notifications_desktop || false}
                  onCheckedChange={(value) => updatePreference('notifications_desktop', value)}
                  disabled={loading}
                />
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
                  checked={preferences.two_factor_enabled || false}
                  onCheckedChange={(value) => updatePreference('two_factor_enabled', value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label>Change Password</Label>
                <Button variant="outline" className="w-full" onClick={handlePasswordChange}>
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
                <Select value={preferences.language || 'en'} onValueChange={(value) => {
                  updatePreference('language', value);
                  // Apply language change to document
                  document.documentElement.lang = value;
                  localStorage.setItem('nexaflow_language', value);
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select value={preferences.timezone || 'UTC'} onValueChange={(value) => {
                  updatePreference('timezone', value);
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">Eastern Time</SelectItem>
                    <SelectItem value="PST">Pacific Time</SelectItem>
                    <SelectItem value="GMT">GMT</SelectItem>
                    <SelectItem value="CST">Central Time</SelectItem>
                    <SelectItem value="JST">Japan Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date Format</Label>
                <Select value={preferences.date_format || 'MM/DD/YYYY'} onValueChange={(value) => {
                  updatePreference('date_format', value);
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-save">Auto-save drafts</Label>
                <Switch 
                  id="auto-save" 
                  checked={preferences.auto_save || false}
                  onCheckedChange={(value) => updatePreference('auto_save', value)}
                  disabled={loading}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="compact-view">Compact view</Label>
                <Switch 
                  id="compact-view" 
                  checked={preferences.compact_view || false}
                  onCheckedChange={(value) => updatePreference('compact_view', value)}
                  disabled={loading}
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
              <Button variant="outline" className="w-full" onClick={handleClearCache}>
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Cache
              </Button>
              <Button variant="outline" className="w-full" onClick={handleExportData}>
                <Download className="mr-2 h-4 w-4" />
                Export All Data
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-surface border-card-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Account & Privacy</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Account Type</Label>
                <p className="text-sm text-muted-foreground">Premium Account</p>
              </div>
              <div className="space-y-2">
                <Label>Data Retention</Label>
                <Select defaultValue="1year">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30days">30 Days</SelectItem>
                    <SelectItem value="90days">90 Days</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="forever">Forever</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="profile-public">Public profile</Label>
                <Switch id="profile-public" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="activity-tracking">Activity tracking</Label>
                <Switch id="activity-tracking" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-card-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Advanced Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Currency</Label>
                <Select value={preferences.currency || 'USD'} onValueChange={(value) => updatePreference('currency', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="JPY">JPY (¥)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="analytics">Send analytics</Label>
                <Switch id="analytics" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="beta-features">Beta features</Label>
                <Switch id="beta-features" />
              </div>
              <Button variant="destructive" className="w-full">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;