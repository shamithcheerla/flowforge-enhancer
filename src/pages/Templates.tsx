import { useState } from "react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Archive, Plus, Search, Filter, Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Templates = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const handleUseTemplate = (templateName: string) => {
    toast({
      title: "Template Applied",
      description: `${templateName} template has been applied to your project!`
    });
  };

  const handleCreateTemplate = () => {
    toast({
      title: "Create Template",
      description: "Template creation dialog would open here"
    });
  };

  const templates = [
    {
      id: 1,
      name: "Software Development Sprint",
      description: "Complete sprint planning template with tasks and milestones",
      category: "Development",
      tasks: 12,
      usage: 156
    },
    {
      id: 2,
      name: "Marketing Campaign",
      description: "End-to-end marketing campaign workflow template",
      category: "Marketing",
      tasks: 8,
      usage: 89
    },
    {
      id: 3,
      name: "Product Launch",
      description: "Comprehensive product launch checklist and timeline",
      category: "Product",
      tasks: 15,
      usage: 67
    },
    {
      id: 4,
      name: "Client Onboarding",
      description: "Step-by-step client onboarding process",
      category: "Sales",
      tasks: 10,
      usage: 123
    }
  ];

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Templates</h1>
            <p className="text-muted-foreground">Reusable project templates to accelerate your workflow</p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover" onClick={handleCreateTemplate}>
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        </div>

        <div className="flex space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="bg-surface border-card-border shadow-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>
                  <Archive className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{template.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tasks:</span>
                    <span className="font-medium">{template.tasks}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Used:</span>
                    <span className="font-medium">{template.usage} times</span>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <Button className="flex-1" onClick={() => handleUseTemplate(template.name)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Use Template
                    </Button>
                    <Button variant="outline" size="sm">
                      Preview
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

export default Templates;