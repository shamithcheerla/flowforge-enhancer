import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { CreateEventDialog } from "@/components/CreateEventDialog";

const Calendar = () => {
  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
            <p className="text-muted-foreground">Schedule and manage your tasks and meetings</p>
          </div>
          <CreateEventDialog>
            <Button className="bg-primary hover:bg-primary-hover">
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Button>
          </CreateEventDialog>
        </div>

        <Card className="bg-surface border-card-border shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5" />
                <span>January 2024</span>
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-96 flex items-center justify-center bg-muted rounded-lg">
              <p className="text-muted-foreground">Calendar view will be implemented here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Calendar;