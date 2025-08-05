import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Target, Plus, Calendar, TrendingUp } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { useAppStore } from "@/hooks/useAppStore";
import { CreateGoalDialog } from "@/components/CreateGoalDialog";

const Goals = () => {
  const { goals } = useAppStore();

  const sampleGoals = [
    {
      id: 1,
      title: "Complete Q1 Project Milestones",
      description: "Finish all major project deliverables for Q1",
      progress: 75,
      status: "in-progress",
      deadline: "March 31, 2024",
      category: "Projects"
    },
    {
      id: 2,
      title: "Improve Team Productivity by 20%",
      description: "Implement new workflows and tools to boost efficiency",
      progress: 45,
      status: "in-progress",
      deadline: "April 15, 2024",
      category: "Performance"
    },
    {
      id: 3,
      title: "Launch New Product Feature",
      description: "Complete development and testing of the new dashboard",
      progress: 90,
      status: "completed",
      deadline: "January 20, 2024",
      category: "Development"
    }
  ];

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Goals</h1>
            <p className="text-muted-foreground">Track your objectives and key results</p>
          </div>
          <CreateGoalDialog>
            <Button className="bg-primary hover:bg-primary-hover">
              <Plus className="mr-2 h-4 w-4" />
              New Goal
            </Button>
          </CreateGoalDialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-surface border-card-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Active Goals</span>
              </div>
              <div className="text-2xl font-bold text-foreground">12</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-surface border-card-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-muted-foreground">Completed</span>
              </div>
              <div className="text-2xl font-bold text-foreground">8</div>
              <p className="text-xs text-muted-foreground">67% success rate</p>
            </CardContent>
          </Card>

          <Card className="bg-surface border-card-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium text-muted-foreground">Due Soon</span>
              </div>
              <div className="text-2xl font-bold text-foreground">3</div>
              <p className="text-xs text-muted-foreground">Next 7 days</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {goals.map((goal) => (
            <Card key={goal.id} className="bg-surface border-card-border shadow-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{goal.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{goal.description}</p>
                  </div>
                  <StatusBadge status={goal.status as "todo" | "in-progress" | "completed" | "review"} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">{Math.round((goal.current / goal.target) * 100)}%</span>
                    </div>
                    <Progress value={Math.round((goal.current / goal.target) * 100)} className="h-2" />
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Target: {goal.current}/{goal.target}</span>
                    <span className="text-muted-foreground">Due: {goal.deadline}</span>
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

export default Goals;