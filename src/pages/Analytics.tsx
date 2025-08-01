import { AppLayout } from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/ui/stats-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Download, 
  Calendar,
  CheckSquare,
  Clock,
  TrendingUp,
  Zap,
  Target,
  AlertTriangle,
  Trophy
} from "lucide-react";

const Analytics = () => {
  const teamPerformance = [
    { name: "Alex Johnson", performance: 95 },
    { name: "Sarah Wilson", performance: 89 },
    { name: "Mike Chen", performance: 78 },
  ];

  const projectProgress = [
    { name: "Website Redesign", progress: 85 },
    { name: "Mobile App", progress: 60 },
    { name: "API Integration", progress: 40 },
  ];

  const insights = [
    {
      type: "success" as const,
      title: "Productivity Up",
      description: "Team efficiency increased by 15% this week",
    },
    {
      type: "success" as const,
      title: "Milestone Reached",
      description: "Website project hit 85% completion",
    },
    {
      type: "warning" as const,
      title: "Action Needed",
      description: "3 tasks overdue require attention",
    },
  ];

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground">Track your productivity and team performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Data Range
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary-hover">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Tasks Completed"
            value="1,247"
            trend={{ value: "+12% from last month", isPositive: true }}
            icon={<CheckSquare className="h-4 w-4" />}
          />
          <StatsCard
            title="Average Completion Time"
            value="2.4h"
            trend={{ value: "35% faster than average", isPositive: true }}
            icon={<Clock className="h-4 w-4" />}
          />
          <StatsCard
            title="Team Productivity"
            value="94%"
            subtitle="Above target"
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <StatsCard
            title="Project Velocity"
            value="32 pts"
            subtitle="Story points per sprint"
            icon={<Zap className="h-4 w-4" />}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Productivity Trend */}
          <Card className="bg-surface border-card-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Productivity Trend</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">Monthly task completion and efficiency rates</p>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex flex-col items-center justify-center bg-muted rounded-lg space-y-4">
                <div className="flex space-x-8">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Completed Tasks</div>
                    <div className="w-16 h-32 bg-primary rounded-t-lg"></div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Efficiency %</div>
                    <div className="w-16 h-24 bg-success rounded-t-lg"></div>
                  </div>
                </div>
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
              <div className="h-64 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-destructive rounded-full"></div>
                      <span className="text-sm">High Priority</span>
                    </div>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      <span className="text-sm">Medium Priority</span>
                    </div>
                    <span className="text-sm font-medium">35%</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="text-sm">Low Priority</span>
                    </div>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Performance and Project Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Performance */}
          <Card className="bg-surface border-card-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Team Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamPerformance.map((member, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-medium text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-foreground">{member.name}</span>
                    </div>
                    <span className="text-foreground font-medium">{member.performance}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Progress */}
          <Card className="bg-surface border-card-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Project Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectProgress.map((project, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-foreground">{project.name}</span>
                      <span className="text-foreground font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Insights */}
        <Card className="bg-surface border-card-border shadow-card">
          <CardHeader>
            <CardTitle>Recent Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {insights.map((insight, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      insight.type === 'success' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-warning/10 text-warning'
                    }`}>
                      {insight.type === 'success' ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <AlertTriangle className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Analytics;