import { AppLayout } from "@/components/Layout/AppLayout";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { 
  CheckSquare, 
  Clock, 
  TrendingUp, 
  Users, 
  BarChart3,
  Calendar,
  ArrowRight,
  Plus
} from "lucide-react";

const Dashboard = () => {
  const recentTasks = [
    {
      id: 1,
      title: "Update user interface design",
      time: "2 hours ago",
      priority: "high" as const,
    },
    {
      id: 2,
      title: "Review marketing proposals",
      time: "4 hours ago",
      priority: "medium" as const,
    },
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: "Product demo presentation",
      time: "In 3 days",
      priority: "high" as const,
    },
    {
      id: 2,
      title: "Code review session",
      time: "Tomorrow 2:00 PM",
      priority: "medium" as const,
    },
  ];

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover shadow-primary">
            <Plus className="mr-2 h-4 w-4" />
            Quick Task
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Tasks Completed"
            value={247}
            trend={{ value: "+12% from last week", isPositive: true }}
            icon={<CheckSquare className="h-4 w-4" />}
          />
          <StatsCard
            title="In Progress"
            value={18}
            subtitle="Active tasks"
            icon={<Clock className="h-4 w-4" />}
          />
          <StatsCard
            title="Productivity Score"
            value="94%"
            subtitle="Above target"
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <StatsCard
            title="Team Members"
            value={24}
            subtitle="Active members"
            icon={<Users className="h-4 w-4" />}
          />
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Productivity Chart */}
          <Card className="bg-surface border-card-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Weekly Productivity</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">Your task completion rate this week</p>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center bg-muted rounded-lg">
                <p className="text-muted-foreground">Chart Component</p>
              </div>
            </CardContent>
          </Card>

          {/* Task Distribution */}
          <Card className="bg-surface border-card-border shadow-card">
            <CardHeader>
              <CardTitle>Task Distribution</CardTitle>
              <p className="text-sm text-muted-foreground">Tasks by priority and status</p>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center bg-muted rounded-lg">
                <p className="text-muted-foreground">Distribution Chart</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Tasks and Upcoming Deadlines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Tasks */}
          <Card className="bg-surface border-card-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Tasks</CardTitle>
              <Button variant="ghost" size="sm">
                View All Tasks
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <div>
                      <p className="font-medium text-foreground">{task.title}</p>
                      <p className="text-sm text-muted-foreground">{task.time}</p>
                    </div>
                    <StatusBadge status={task.priority} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card className="bg-surface border-card-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Upcoming Deadlines</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <div>
                      <p className="font-medium text-foreground">{deadline.title}</p>
                      <p className="text-sm text-muted-foreground">{deadline.time}</p>
                    </div>
                    <StatusBadge status={deadline.priority} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;