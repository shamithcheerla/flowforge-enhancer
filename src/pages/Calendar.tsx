import { useState } from "react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Clock, MapPin, Trash2 } from "lucide-react";
import { CreateEventDialog } from "@/components/CreateEventDialog";
import { useAppStore } from "@/hooks/useAppStore";
import { format } from "date-fns";

const Calendar = () => {
  const { events, deleteEvent } = useAppStore();
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthName = format(currentDate, "MMMM yyyy");

  // Filter events for current month
  const currentMonthEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === currentDate.getMonth() && 
           eventDate.getFullYear() === currentDate.getFullYear();
  });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

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
                <span>{monthName}</span>
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={previousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentMonthEvents.length === 0 ? (
                <div className="h-96 flex items-center justify-center bg-muted rounded-lg">
                  <p className="text-muted-foreground">No events scheduled for {monthName}</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {currentMonthEvents.map((event) => (
                    <Card key={event.id} className="bg-surface border-card-border">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="font-medium text-foreground">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <CalendarIcon className="h-3 w-3" />
                                <span>{format(event.date, "MMM dd, yyyy")}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{event.time}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`px-2 py-1 rounded-full text-xs ${
                              event.type === 'meeting' ? 'bg-primary/10 text-primary' :
                              event.type === 'deadline' ? 'bg-destructive/10 text-destructive' :
                              event.type === 'reminder' ? 'bg-warning/10 text-warning' :
                              'bg-muted text-muted-foreground'
                            }`}>
                              {event.type}
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => deleteEvent(event.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Calendar;