import { useState, useEffect } from "react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Play, Pause, Square, Calendar } from "lucide-react";
import { StatsCard } from "@/components/ui/stats-card";
import { useAppStore } from "@/hooks/useAppStore";
import { useToast } from "@/hooks/use-toast";

const TimeTracking = () => {
  const { isTimerRunning, timerSeconds, currentTask, startTimer, pauseTimer, stopTimer, updateTimer } = useAppStore();
  const { toast } = useToast();
  const [taskName, setTaskName] = useState("");

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
            <div className="flex gap-2">
              <Input
                placeholder="Enter task name..."
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="w-64"
              />
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