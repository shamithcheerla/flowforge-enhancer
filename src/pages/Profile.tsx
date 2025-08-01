import { AppLayout } from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/ui/stats-card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Edit, 
  MapPin, 
  Mail, 
  Calendar,
  CheckSquare,
  FolderKanban,
  Clock,
  TrendingUp,
  Trophy,
  Users,
  Zap,
  Crown,
  Settings
} from "lucide-react";

const Profile = () => {
  const achievements = [
    {
      icon: "🏆",
      title: "Task Master",
      description: "Completed 200+ tasks",
    },
    {
      icon: "🤝",
      title: "Team Player",
      description: "Collaborated on 50+ projects",
    },
    {
      icon: "⚡",
      title: "Speed Demon",
      description: "Completed 10 tasks in one day",
    },
    {
      icon: "👑",
      title: "Consistency King",
      description: "Active for 30 days straight",
    },
  ];

  const activities = [
    {
      type: "task",
      action: "Completed",
      item: "Update user interface design",
      time: "2 hours ago",
    },
    {
      type: "project",
      action: "Collaborated",
      item: "Marketing Campaign project",
      time: "4 hours ago",
    },
    {
      type: "meeting",
      action: "Reviewed",
      item: "Team standing meeting",
      time: "6 hours ago",
    },
    {
      type: "achievement",
      action: "Achieved",
      item: "Task Master badge",
      time: "1 day ago",
    },
  ];

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground">Manage your account and track your progress</p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover shadow-primary">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="bg-surface border-card-border shadow-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground">
                AJ
              </div>
              <div className="flex-1 space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Alex Johnson</h2>
                <p className="text-muted-foreground">Product Manager</p>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Member since 15/01/2024</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>alex@nexaflow.com</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
              </div>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Tasks Completed"
            value={247}
            icon={<CheckSquare className="h-4 w-4" />}
          />
          <StatsCard
            title="Projects Active"
            value={8}
            icon={<FolderKanban className="h-4 w-4" />}
          />
          <StatsCard
            title="Hours Tracked"
            value="1,240"
            icon={<Clock className="h-4 w-4" />}
          />
          <StatsCard
            title="Productivity Score"
            value={94}
            icon={<TrendingUp className="h-4 w-4" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Achievements */}
          <Card className="bg-surface border-card-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Achievements</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">Your accomplishments and milestones</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <h4 className="font-medium text-foreground">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity */}
          <Card className="bg-surface border-card-border shadow-card">
            <CardHeader>
              <CardTitle>Activity</CardTitle>
              <p className="text-sm text-muted-foreground">Your recent activity and updates</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'task' ? 'bg-primary/10 text-primary' :
                      activity.type === 'project' ? 'bg-success/10 text-success' :
                      activity.type === 'meeting' ? 'bg-warning/10 text-warning' :
                      'bg-destructive/10 text-destructive'
                    }`}>
                      {activity.type === 'task' && <CheckSquare className="h-4 w-4" />}
                      {activity.type === 'project' && <FolderKanban className="h-4 w-4" />}
                      {activity.type === 'meeting' && <Users className="h-4 w-4" />}
                      {activity.type === 'achievement' && <Trophy className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{activity.action}</span> {activity.item}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {activity.type}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preferences */}
        <Card className="bg-surface border-card-border shadow-card">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <p className="text-sm text-muted-foreground">Customize your experience</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications" className="text-foreground">Email notifications</Label>
                    <p className="text-sm text-muted-foreground">Notifications</p>
                  </div>
                  <Switch id="notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="visibility" className="text-foreground">Profile visibility</Label>
                    <p className="text-sm text-muted-foreground">Privacy</p>
                  </div>
                  <Switch id="visibility" defaultChecked />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-assign" className="text-foreground">Auto-assign tasks</Label>
                    <p className="text-sm text-muted-foreground">Collaboration</p>
                  </div>
                  <Switch id="auto-assign" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dark-mode" className="text-foreground">Dark mode</Label>
                    <p className="text-sm text-muted-foreground">Display</p>
                  </div>
                  <Switch id="dark-mode" defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Profile;