import { useState } from "react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Briefcase, Camera, Save, Edit } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user, profile, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    bio: profile?.bio || "Passionate team member focused on excellence and innovation.",
    role: profile?.role || "Team Member",
    avatar_url: profile?.avatar_url || ""
  });

  const handleSave = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await updateProfile(formData);
      if (!error) {
        setIsEditing(false);
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProfilePictureChange = () => {
    // Create input element for file selection
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // This enables camera option on mobile
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setFormData(prev => ({ ...prev, profilePicture: result }));
          toast({
            title: "Profile Picture Updated",
            description: "Your profile picture has been updated successfully"
          });
        };
        reader.readAsDataURL(file);
      }
    };
    
    // Show options for gallery or camera on mobile
    if (navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
      const action = confirm("Choose from Gallery (OK) or Take Photo (Cancel)?");
      if (!action) {
        input.capture = 'user'; // Front camera for selfies
      }
    }
    
    input.click();
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground">Manage your personal information and preferences</p>
          </div>
          <Button 
            onClick={handleSave}
            disabled={loading}
            className={isEditing ? "bg-primary hover:bg-primary-hover" : ""}
          >
            {loading ? (
              "Updating..."
            ) : isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <Card className="bg-surface border-card-border shadow-card">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profile?.avatar_url} alt="Profile" />
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      {profile?.full_name 
                        ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
                        : user?.email ? user.email[0].toUpperCase() : 'U'
                      }
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="sm" 
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    onClick={() => {
                      toast({
                        title: "Coming Soon",
                        description: "Profile picture upload feature coming soon!"
                      });
                    }}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{profile?.full_name || user?.email || 'User'}</h2>
                  <p className="text-muted-foreground">{profile?.role || 'Team Member'}</p>
                  <div className="flex justify-center mt-2">
                    <Badge variant="secondary">Product Team</Badge>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">{profile?.bio || formData.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="lg:col-span-2 bg-surface border-card-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={isEditing ? formData.full_name : profile?.full_name || 'Not provided'}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || 'Not provided'}
                    disabled={true}
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={isEditing ? formData.role : profile?.role || 'Team Member'}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joined">Member Since</Label>
                  <Input
                    id="joined"
                    value={user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Recently'}
                    disabled={true}
                    className="bg-muted"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={isEditing ? formData.bio : profile?.bio || 'No bio provided'}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Work Information */}
          <Card className="lg:col-span-3 bg-surface border-card-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Account Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="user_id">User ID</Label>
                  <Input
                    id="user_id"
                    value={user?.id || 'Not available'}
                    disabled={true}
                    className="bg-muted font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="auth_provider">Authentication</Label>
                  <Input
                    id="auth_provider"
                    value="Supabase Auth"
                    disabled={true}
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account_status">Status</Label>
                  <Input
                    id="account_status"
                    value="Active"
                    disabled={true}
                    className="bg-muted"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Stats */}
          <Card className="bg-surface border-card-border shadow-card">
            <CardHeader>
              <CardTitle>Activity Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tasks Completed</span>
                  <span className="font-semibold">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Projects Active</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Hours Tracked</span>
                  <span className="font-semibold">145.5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Team Rating</span>
                  <span className="font-semibold">4.8/5</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2 bg-surface border-card-border shadow-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Completed task "UI Design Review"</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Created new project "Mobile App Redesign"</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Updated profile information</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;