import { useState } from "react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";
import { useAppStore } from "@/hooks/useAppStore";
import { Plus, Search, Filter, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const Tasks = () => {
  const { tasks, updateTask, deleteTask } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      id: "todo",
      title: "To Do", 
      tasks: filteredTasks.filter(task => task.status === "todo")
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: filteredTasks.filter(task => task.status === "in-progress")
    },
    {
      id: "review",
      title: "Under Review",
      tasks: filteredTasks.filter(task => task.status === "review")
    },
    {
      id: "completed",
      title: "Completed",
      tasks: filteredTasks.filter(task => task.status === "completed")
    }
  ];

  const handleTaskStatusChange = (taskId: number, newStatus: "todo" | "in-progress" | "review" | "completed") => {
    updateTask(taskId, { status: newStatus });
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Task Board</h1>
            <p className="text-muted-foreground">Manage your tasks with drag & drop functionality</p>
          </div>
          <CreateTaskDialog>
            <Button className="bg-primary hover:bg-primary-hover shadow-primary">
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </CreateTaskDialog>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search tasks..."
              className="pl-10 bg-input border-border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <div key={column.id} className="space-y-4">
              {/* Column Header */}
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground flex items-center space-x-2">
                  <span>{column.title}</span>
                  <span className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs">
                    {column.tasks.length}
                  </span>
                </h3>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <Card key={task.id} className="bg-surface border-card-border shadow-card hover:shadow-glow transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-foreground line-clamp-2">
                            {task.title}
                          </h4>
                          <StatusBadge status={task.priority} />
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {task.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                              <span className="text-primary-foreground font-medium text-xs">
                                {task.assignee.charAt(0)}
                              </span>
                            </div>
                            <span>{task.assignee}</span>
                          </div>
                          <span>{task.dueDate}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {["todo", "in-progress", "review", "completed"].map((status) => (
                            <Button
                              key={status}
                              size="sm"
                              variant={task.status === status ? "default" : "outline"}
                              onClick={() => handleTaskStatusChange(task.id, status as any)}
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

              {/* Add Task Button */}
              <CreateTaskDialog>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-muted-foreground border-2 border-dashed border-muted"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add a task
                </Button>
              </CreateTaskDialog>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Tasks;