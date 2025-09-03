import { useState, useEffect } from "react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Trash2, Plus, Filter } from "lucide-react";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Tasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)
        .eq('user_id', user?.id);

      if (error) throw error;

      setTasks(tasks.filter(task => task.id !== taskId));
      toast({
        title: "Success",
        description: "Task deleted successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', taskId)
        .eq('user_id', user?.id);

      if (error) throw error;

      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const columns = [
    {
      id: "todo",
      title: "To Do", 
      tasks: tasks.filter(task => task.status === "todo")
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: tasks.filter(task => task.status === "in-progress")
    },
    {
      id: "completed",
      title: "Completed",
      tasks: tasks.filter(task => task.status === "completed")
    }
  ];

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
            <p className="text-muted-foreground">Manage and track your tasks</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <CreateTaskDialog onTaskCreated={fetchTasks}>
              <Button className="bg-primary hover:bg-primary-hover">
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </CreateTaskDialog>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map((column) => (
              <div key={column.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground flex items-center space-x-2">
                    <span>{column.title}</span>
                    <span className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs">
                      {column.tasks.length}
                    </span>
                  </h3>
                </div>

                <div className="space-y-3">
                  {column.tasks.map((task) => (
                    <Card key={task.id} className="bg-surface border-card-border shadow-card hover:shadow-glow transition-all">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-foreground line-clamp-2">
                              {task.title}
                            </h4>
                            <StatusBadge status={task.priority} />
                          </div>
                          
                          {task.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {task.description}
                            </p>
                          )}
                          
                          {task.due_date && (
                            <div className="text-xs text-muted-foreground">
                              Due: {new Date(task.due_date).toLocaleDateString()}
                            </div>
                          )}

                          <div className="flex flex-wrap gap-1">
                            {["todo", "in-progress", "completed"].map((status) => (
                              <Button
                                key={status}
                                size="sm"
                                variant={task.status === status ? "default" : "outline"}
                                onClick={() => updateTaskStatus(task.id, status)}
                                className="text-xs h-6 px-2"
                              >
                                {status === "in-progress" ? "Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
                              </Button>
                            ))}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteTask(task.id)}
                              className="text-xs h-6 px-2"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Tasks;