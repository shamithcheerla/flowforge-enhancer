import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Zap, Plus, Settings, Play, Pause } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";

const Automations = () => {
  const automations = [
    {
      id: 1,
      name: "Auto-assign new tasks",
      description: "Automatically assign incoming tasks based on team workload",
      enabled: true,
      status: "active",
      triggers: 45,
      lastRun: "2 minutes ago"
    },
    {
      id: 2,
      name: "Send deadline reminders",
      description: "Notify team members 24 hours before task deadlines",
      enabled: true,
      status: "active",
      triggers: 23,
      lastRun: "1 hour ago"
    },
    {
      id: 3,
      name: "Archive completed projects",
      description: "Move completed projects to archive after 30 days",
      enabled: false,
      status: "inactive",
      triggers: 8,
      lastRun: "Never"
    },
    {
      id: 4,
      name: "Weekly progress reports",
      description: "Generate and send weekly progress reports to stakeholders",
      enabled: true,
      status: "active",
      triggers: 12,
      lastRun: "3 days ago"
    }
  ];

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Automations</h1>
            <p className="text-muted-foreground">Streamline your workflow with intelligent automation</p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover">
            <Plus className="mr-2 h-4 w-4" />
            New Automation
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-surface border-card-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Active</span>
              </div>
              <div className="text-2xl font-bold text-foreground">3</div>
              <p className="text-xs text-muted-foreground">Running automations</p>
            </CardContent>
          </Card>

          <Card className="bg-surface border-card-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Play className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-muted-foreground">Triggers</span>
              </div>
              <div className="text-2xl font-bold text-foreground">88</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-surface border-card-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Settings className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium text-muted-foreground">Time Saved</span>
              </div>
              <div className="text-2xl font-bold text-foreground">24h</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {automations.map((automation) => (
            <Card key={automation.id} className="bg-surface border-card-border shadow-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{automation.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{automation.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <StatusBadge status={automation.status as "todo" | "in-progress" | "completed" | "review"} />
                    <Switch checked={automation.enabled} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Triggers:</span>
                    <span className="ml-2 font-medium">{automation.triggers}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last run:</span>
                    <span className="ml-2 font-medium">{automation.lastRun}</span>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Configure
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Automations;