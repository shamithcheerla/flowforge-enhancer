import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, Check, X, Clock, Mail, MessageSquare } from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "task",
      title: "New task assigned",
      message: "You have been assigned to 'Design Review' by Sarah Johnson",
      time: "2 min ago",
      unread: true,
      icon: MessageSquare
    },
    {
      id: 2,
      type: "deadline",
      title: "Deadline approaching",
      message: "Project 'Mobile App' is due in 2 days",
      time: "1 hour ago",
      unread: true,
      icon: Clock
    },
    {
      id: 3,
      type: "comment",
      title: "New comment",
      message: "Alex commented on 'Homepage Redesign'",
      time: "3 hours ago",
      unread: false,
      icon: MessageSquare
    }
  ];

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with your latest activities</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button>
              <Check className="mr-2 h-4 w-4" />
              Mark All Read
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`${notification.unread ? 'border-primary/50' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <notification.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-foreground">{notification.title}</h3>
                      <div className="flex items-center space-x-2">
                        {notification.unread && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary">New</Badge>
                        )}
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <X className="h-4 w-4" />
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

export default Notifications;