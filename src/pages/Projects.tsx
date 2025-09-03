import { useState, useEffect } from "react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { StatsCard } from "@/components/ui/stats-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateProjectDialog } from "@/components/CreateProjectDialog";
import { Plus, Search, Filter, Edit, ExternalLink, Users, Calendar, FolderKanban, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Projects = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
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

  const deleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)
        .eq('user_id', user?.id);

      if (error) throw error;

      setProjects(projects.filter(p => p.id !== projectId));
      toast({
        title: "Success",
        description: "Project deleted successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error", 
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (!matchesSearch) return false;
    
    if (activeTab === "all") return true;
    if (activeTab === "active") return project.status === "active";
    if (activeTab === "completed") return project.status === "completed";
    if (activeTab === "shared") return false; // No team functionality yet
    return true;
  });

  const projectStats = [
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
          <CreateProjectDialog onProjectCreated={fetchProjects}>
            <Button className="bg-primary hover:bg-primary-hover shadow-primary">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </CreateProjectDialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard
            title="Active Projects"
            value={projects.filter(p => p.status === 'active').length}
            icon={<FolderKanban className="h-4 w-4" />}
          />
          <StatsCard
            title="Average Completion"
            value={`${Math.round(projects.reduce((acc, p) => acc + (p.progress || 0), 0) / projects.length) || 0}%`}
            icon={<Calendar className="h-4 w-4" />}
          />
          <StatsCard
            title="Total Projects"
            value={projects.length}
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="mt-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="bg-surface border-card-border shadow-card hover:shadow-glow transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg text-foreground">{project.name}</CardTitle>
                          <StatusBadge status="medium" />
                        </div>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => deleteProject(project.id)}>
                            <Trash2 className="h-4 w-4" />
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
                          <span className="text-foreground">{project.progress || 0}%</span>
                        </div>
                        <Progress value={project.progress || 0} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {100 - (project.progress || 0)}% remaining
                        </p>
                      </div>
                      
                      {/* Due Date */}
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">
                          Due {project.end_date ? new Date(project.end_date).toLocaleDateString() : 'No due date'}
                        </span>
                        {project.end_date && (
                          <span className="text-foreground">
                            {Math.max(0, Math.ceil((new Date(project.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days
                          </span>
                        )}
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
            )}
          </TabsContent>

          <TabsContent value="active">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.filter(p => p.status === 'active').map((project) => (
                  <Card key={project.id} className="bg-surface border-card-border shadow-card hover:shadow-glow transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg text-foreground">{project.name}</CardTitle>
                          <StatusBadge status="medium" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground font-medium">Progress</span>
                          <span className="text-foreground">{project.progress || 0}%</span>
                        </div>
                        <Progress value={project.progress || 0} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.filter(p => p.status === 'completed').map((project) => (
                  <Card key={project.id} className="bg-surface border-card-border shadow-card hover:shadow-glow transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg text-foreground">{project.name}</CardTitle>
                          <StatusBadge status="medium" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground font-medium">Progress</span>
                          <span className="text-foreground">{project.progress || 0}%</span>
                        </div>
                        <Progress value={project.progress || 0} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="shared">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.filter(p => false).map((project) => (
                  <Card key={project.id} className="bg-surface border-card-border shadow-card hover:shadow-glow transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg text-foreground">{project.name}</CardTitle>
                          <StatusBadge status="medium" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground font-medium">Progress</span>
                          <span className="text-foreground">{project.progress || 0}%</span>
                        </div>
                        <Progress value={project.progress || 0} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">Shared projects feature coming soon...</p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Projects;