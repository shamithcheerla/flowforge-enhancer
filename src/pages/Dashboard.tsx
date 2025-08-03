import { AppLayout } from "@/components/Layout/AppLayout";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";
import { useAppStore } from "@/hooks/useAppStore";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
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
  const { tasks, projects } = useAppStore();
  const navigate = useNavigate();

  const recentTasks = tasks.slice(-5).reverse();
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const totalTasks = tasks.length;

  const productivityData = [
    { name: 'Mon', tasks: 12 },
    { name: 'Tue', tasks: 19 },
    { name: 'Wed', tasks: 15 },
    { name: 'Thu', tasks: 25 },
    { name: 'Fri', tasks: 22 },
    { name: 'Sat', tasks: 8 },
    { name: 'Sun', tasks: 5 },
  ];

  const taskDistributionData = [
    { name: 'Completed', value: tasks.filter(t => t.status === 'completed').length, color: '#10b981' },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length, color: '#3b82f6' },
    { name: 'To Do', value: tasks.filter(t => t.status === 'todo').length, color: '#f59e0b' },
    { name: 'Review', value: tasks.filter(t => t.status === 'review').length, color: '#8b5cf6' },
  ];

  const upcomingDeadlines = tasks
    .filter(t => t.dueDate && new Date(t.dueDate) > new Date())
    .slice(0, 5)
    .map(t => ({
      id: t.id,
      title: t.title,
      time: `Due ${t.dueDate}`,
      priority: t.priority
    }));

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
          </div>
          <CreateTaskDialog>
            <Button className="bg-primary hover:bg-primary-hover shadow-primary">
              <Plus className="mr-2 h-4 w-4" />
              Quick Task
            </Button>
          </CreateTaskDialog>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Tasks Completed"
            value={completedTasks}
            trend={{ value: `${Math.round((completedTasks/totalTasks)*100)}% completion rate`, isPositive: true }}
            icon={<CheckSquare className="h-4 w-4" />}
          />
          <StatsCard
            title="In Progress"
            value={inProgressTasks}
            subtitle="Active tasks"
            icon={<Clock className="h-4 w-4" />}
          />
          <StatsCard
            title="Productivity Score"
            value={`${Math.round(((completedTasks + inProgressTasks)/totalTasks)*100) || 0}%`}
            subtitle="Based on task completion"
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <StatsCard
            title="Active Projects"
            value={projects.filter(p => p.status === 'active').length}
            subtitle="In progress"
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
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="tasks" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Task Distribution */}
          <Card className="bg-surface border-card-border shadow-card">
            <CardHeader>
              <CardTitle>Task Distribution</CardTitle>
              <p className="text-sm text-muted-foreground">Tasks by priority and status</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={taskDistributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {taskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Tasks and Upcoming Deadlines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Tasks */}
          <Card className="bg-surface border-card-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Tasks</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/tasks')}>
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
                    <p className="text-sm text-muted-foreground">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </p>
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