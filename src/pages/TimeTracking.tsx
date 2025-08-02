import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Play, Pause, Square, Calendar } from "lucide-react";
import { StatsCard } from "@/components/ui/stats-card";

const TimeTracking = () => {
  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Time Tracking</h1>
            <p className="text-muted-foreground">Track your time and improve productivity</p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover">
            <Play className="mr-2 h-4 w-4" />
            Start Timer
          </Button>
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
              <div className="text-6xl font-mono text-primary mb-4">02:34:56</div>
              <p className="text-muted-foreground mb-6">Working on: Homepage Redesign</p>
              <div className="flex justify-center space-x-4">
                <Button size="lg">
                  <Pause className="mr-2 h-5 w-5" />
                  Pause
                </Button>
                <Button size="lg" variant="destructive">
                  <Square className="mr-2 h-5 w-5" />
                  Stop
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default TimeTracking;