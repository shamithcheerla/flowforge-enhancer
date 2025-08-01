import { AppLayout } from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { StatsCard } from "@/components/ui/stats-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, Edit, ExternalLink, Users, Calendar, FolderKanban } from "lucide-react";
import { Input } from "@/components/ui/input";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Website Redesign",
      description: "Complete overhaul of company website with modern design and improved UX",
      priority: "high" as const,
      progress: 75,
      team: ["AJ", "SM", "MD", "EK", "JP"],
      dueDate: "15/06/2024",
      daysLeft: 251,
      status: "in-progress" as const,
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Native mobile application for iOS and Android platforms",
      priority: "high" as const,
      progress: 45,
      team: ["AJ", "SM", "MD", "EK", "JP", "RC", "TL"],
      dueDate: "15/06/2024",
      daysLeft: 190,
      status: "in-progress" as const,
    },
    {
      id: 3,
      title: "Marketing Campaign",
      description: "Q3 digital marketing campaign across all channels",
      priority: "medium" as const,
      progress: 90,
      team: ["SM", "MD", "EK"],
      dueDate: "31/07/2024",
      daysLeft: 365,
      status: "review" as const,
    },
  ];

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground">Organize and track your project progress</p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover shadow-primary">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard
            title="Active Projects"
            value={12}
            icon={<FolderKanban className="h-4 w-4" />}
          />
          <StatsCard
            title="Average Completion"
            value="87%"
            icon={<Calendar className="h-4 w-4" />}
          />
          <StatsCard
            title="Team Members"
            value={24}
            icon={<Users className="h-4 w-4" />}
          />
        </div>

        {/* Filters */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="shared">Shared</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search projects..."
                  className="pl-10 bg-input border-border w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="bg-surface border-card-border shadow-card hover:shadow-glow transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg text-foreground">{project.title}</CardTitle>
                        <StatusBadge status={project.priority} />
                      </div>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {project.description}
                    </p>
                    
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground font-medium">Progress</span>
                        <span className="text-foreground">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {100 - project.progress}% remaining
                      </p>
                    </div>
                    
                    {/* Team */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">Team ({project.team.length})</span>
                        <div className="flex -space-x-1">
                          {project.team.slice(0, 4).map((member, index) => (
                            <div
                              key={index}
                              className="w-6 h-6 bg-primary rounded-full border-2 border-surface flex items-center justify-center"
                            >
                              <span className="text-xs text-primary-foreground font-medium">
                                {member}
                              </span>
                            </div>
                          ))}
                          {project.team.length > 4 && (
                            <div className="w-6 h-6 bg-muted rounded-full border-2 border-surface flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">
                                +{project.team.length - 4}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Due Date */}
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Due {project.dueDate}</span>
                      <span className="text-foreground">{project.daysLeft} days</span>
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Edit
                      </Button>
                      <Button size="sm" className="flex-1">
                        Open
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Active projects will be shown here</p>
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Completed projects will be shown here</p>
            </div>
          </TabsContent>

          <TabsContent value="shared">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Shared projects will be shown here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Projects;