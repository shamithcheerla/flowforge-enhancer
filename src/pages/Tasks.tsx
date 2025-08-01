import { AppLayout } from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const Tasks = () => {
  const columns = [
    {
      id: "todo",
      title: "To Do",
      count: 2,
      tasks: [
        {
          id: 1,
          title: "Design new landing page",
          description: "Create a modern landing page for the new product launch",
          priority: "high" as const,
          assignee: "Alex",
          date: "29/06/2024",
        },
        {
          id: 2,
          title: "Research competitor analysis",
          description: "Research competitor features and pricing strategies",
          priority: "medium" as const,
          assignee: "Sarah",
          date: "20/06/2024",
        },
      ],
    },
    {
      id: "progress",
      title: "In Progress",
      count: 1,
      tasks: [
        {
          id: 3,
          title: "Implement user authentication",
          description: "Set up secure login and registration system",
          priority: "high" as const,
          assignee: "Mike",
          date: "27/06/2024",
        },
      ],
    },
    {
      id: "review",
      title: "Under Review",
      count: 1,
      tasks: [
        {
          id: 4,
          title: "Update API documentation",
          description: "Review and update all API endpoint documentation",
          priority: "low" as const,
          assignee: "Emma",
          date: "25/06/2024",
        },
      ],
    },
    {
      id: "completed",
      title: "Completed",
      count: 1,
      tasks: [
        {
          id: 5,
          title: "Set up CI/CD pipeline",
          description: "Configure automated testing and deployment",
          priority: "medium" as const,
          assignee: "John",
          date: "24/06/2024",
        },
      ],
    },
  ];

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Task Board</h1>
            <p className="text-muted-foreground">Manage your tasks with drag & drop functionality</p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover shadow-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search tasks..."
              className="pl-10 bg-input border-border"
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
                    {column.count}
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
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                              <span className="text-primary-foreground font-medium text-xs">
                                {task.assignee.charAt(0)}
                              </span>
                            </div>
                            <span>{task.assignee}</span>
                          </div>
                          <span>{task.date}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Add Task Button */}
              <Button 
                variant="ghost" 
                className="w-full justify-start text-muted-foreground border-2 border-dashed border-muted"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add a task
              </Button>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Tasks;