import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, Check, X, Clock, Mail, MessageSquare, CheckSquare, FolderKanban, Calendar } from "lucide-react";
import { useAppStore } from "@/hooks/useAppStore";
import { useToast } from "@/hooks/use-toast";

const Notifications = () => {
  const { notifications, tasks, projects, markNotificationRead, deleteNotification, markAllNotificationsRead } = useAppStore();
  const { toast } = useToast();

  // Check for deadline notifications
  const deadlineNotifications = [
    ...tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      const diffTime = dueDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 2 && diffDays >= 0;
    }).map(task => ({
      id: `task-${task.id}`,
      type: "deadline",
      title: "Deadline approaching",
      message: `Task "${task.title}" is due in ${Math.ceil((new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days`,
      time: "System alert",
      unread: true,
      icon: Clock
    })),
    ...projects.filter(project => {
      const dueDate = new Date(project.endDate);
      const today = new Date();
      const diffTime = dueDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 2 && diffDays >= 0;
    }).map(project => ({
      id: `project-${project.id}`,
      type: "deadline",
      title: "Project deadline approaching",
      message: `Project "${project.name}" is due in ${Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days`,
      time: "System alert",
      unread: true,
      icon: Clock
    }))
  ];

  const allNotifications = [...(notifications || []), ...deadlineNotifications];

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'CheckSquare': return CheckSquare;
      case 'FolderKanban': return FolderKanban;
      case 'Calendar': return Calendar;
      default: return MessageSquare;
    }
  };

  const markAllRead = () => {
    markAllNotificationsRead();
    toast({
      title: "Notifications marked as read",
      description: "All notifications have been marked as read"
    });
  };

  const handleMarkRead = (notificationId: string | number) => {
    markNotificationRead(notificationId);
    toast({
      title: "Marked as read",
      description: "Notification has been marked as read"
    });
  };

  const handleDelete = (notificationId: string | number) => {
    deleteNotification(notificationId);
    toast({
      title: "Notification deleted",
      description: "Notification has been removed"
    });
  };

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
            <Button onClick={markAllRead}>
              <Check className="mr-2 h-4 w-4" />
              Mark All Read
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {allNotifications.map((notification) => {
            const IconComponent = typeof notification.icon === 'string' ? getIcon(notification.icon) : notification.icon;
            return (
            <Card key={notification.id} className={`${notification.unread ? 'border-primary/50' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-primary" />
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
                    <Button size="sm" variant="ghost" onClick={() => handleMarkRead(notification.id)}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(notification.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )})}
        </div>
      </div>
    </AppLayout>
  );
};

export default Notifications;