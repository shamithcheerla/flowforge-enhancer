import { useState, useEffect } from "react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Play, Pause, Square, Calendar } from "lucide-react";
import { StatsCard } from "@/components/ui/stats-card";
import { SearchInput } from "@/components/SearchInput";
import { useAppStore } from "@/hooks/useAppStore";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const TimeTracking = () => {
  const { isTimerRunning, timerSeconds, currentTask, startTimer, pauseTimer, stopTimer, updateTimer } = useAppStore();
  const { toast } = useToast();
  const { user } = useAuth();
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetchTasksAndProjects();
  }, [user]);

  const fetchTasksAndProjects = async () => {
    if (!user) return;
    
    try {
      const [tasksResponse, projectsResponse] = await Promise.all([
        supabase.from('tasks').select('*').eq('user_id', user.id),
        supabase.from('projects').select('*').eq('user_id', user.id)
      ]);
      
      if (tasksResponse.data) setTasks(tasksResponse.data);
      if (projectsResponse.data) setProjects(projectsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredItems([]);
      setShowSuggestions(false);
      return;
    }

    const taskResults = tasks.filter(task => 
      task.title.toLowerCase().includes(query.toLowerCase())
    ).map(task => ({ ...task, type: 'task' }));
    
    const projectResults = projects.filter(project => 
      project.name.toLowerCase().includes(query.toLowerCase())
    ).map(project => ({ ...project, type: 'project' }));

    const combined = [...taskResults, ...projectResults];
    setFilteredItems(combined);
    setShowSuggestions(true);
  };

  const selectItem = (item: any) => {
    const name = item.type === 'task' ? item.title : item.name;
    setTaskName(name);
    setShowSuggestions(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        updateTimer(timerSeconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, updateTimer]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTimer = () => {
    if (!taskName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a task name before starting the timer.",
        variant: "destructive"
      });
      return;
    }
    startTimer(taskName);
    toast({
      title: "Timer Started",
      description: `Started tracking time for: ${taskName}`
    });
  };

  const handlePauseTimer = () => {
    pauseTimer();
    toast({
      title: "Timer Paused",
      description: "Time tracking paused"
    });
  };

  const handleStopTimer = () => {
    stopTimer();
    setTaskName("");
    toast({
      title: "Timer Stopped",
      description: "Time tracking stopped and logged"
    });
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Time Tracking</h1>
            <p className="text-muted-foreground">Track your time and improve productivity</p>
          </div>
          {!isTimerRunning ? (
            <div className="flex gap-2 relative">
              <div className="relative w-64">
                <SearchInput
                  placeholder="Search tasks or projects..."
                  onSearch={handleSearch}
                  className="w-full"
                />
                {showSuggestions && filteredItems.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-md shadow-lg z-10 mt-1">
                    {filteredItems.slice(0, 5).map((item) => (
                      <div
                        key={`${item.type}-${item.id}`}
                        className="p-3 hover:bg-accent cursor-pointer border-b last:border-b-0"
                        onClick={() => selectItem(item)}
                      >
                        <div className="font-medium">{item.type === 'task' ? item.title : item.name}</div>
                        <div className="text-sm text-muted-foreground capitalize">{item.type}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button className="bg-primary hover:bg-primary-hover" onClick={handleStartTimer}>
                <Play className="mr-2 h-4 w-4" />
                Start Timer
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handlePauseTimer}>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </Button>
              <Button variant="destructive" onClick={handleStopTimer}>
                <Square className="mr-2 h-4 w-4" />
                Stop
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard
            title="Today"
            value="6h 24m"
            icon={<Clock className="h-4 w-4" />}
            trend={{ value: "+12%", isPositive: true }}
            subtitle="Time logged today"
          />
          <StatsCard
            title="This Week"
            value="32h 15m"
            icon={<Calendar className="h-4 w-4" />}
            trend={{ value: "+8%", isPositive: true }}
            subtitle="Weekly progress"
          />
          <StatsCard
            title="Average/Day"
            value="6h 30m"
            icon={<Clock className="h-4 w-4" />}
            trend={{ value: "+5%", isPositive: true }}
            subtitle="Daily average"
          />
          <StatsCard
            title="Efficiency"
            value="94%"
            icon={<Play className="h-4 w-4" />}
            trend={{ value: "+2%", isPositive: true }}
            subtitle="Productivity score"
          />
        </div>

        <Card className="bg-surface border-card-border shadow-card">
          <CardHeader>
            <CardTitle>Current Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-6xl font-mono text-primary mb-4">{formatTime(timerSeconds)}</div>
              <p className="text-muted-foreground mb-6">
                {currentTask ? `Working on: ${currentTask}` : "No active task"}
              </p>
              {isTimerRunning && (
                <div className="flex justify-center space-x-4">
                  <Button size="lg" onClick={handlePauseTimer}>
                    <Pause className="mr-2 h-5 w-5" />
                    Pause
                  </Button>
                  <Button size="lg" variant="destructive" onClick={handleStopTimer}>
                    <Square className="mr-2 h-5 w-5" />
                    Stop
                  </Button>
                </div>
              )}
              {!isTimerRunning && currentTask && (
                <Button size="lg" onClick={() => startTimer(currentTask)}>
                  <Play className="mr-2 h-5 w-5" />
                  Resume
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default TimeTracking;