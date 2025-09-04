import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Zap, Plus, Settings, Play, Pause } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Automations = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [automations, setAutomations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAutomations();
  }, [user]);

  const fetchAutomations = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('automation_rules')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) {
        console.error('Error fetching automations:', error);
        return;
      }
      
      if (data && data.length > 0) {
        setAutomations(data.map(rule => ({
          id: rule.id,
          name: rule.name,
          description: rule.description,
          enabled: rule.enabled,
          status: rule.enabled ? 'active' : 'inactive',
          triggers: rule.triggers_count || 0,
          lastRun: rule.last_run_at ? new Date(rule.last_run_at).toLocaleString() : 'Never'
        })));
      } else {
        // Create default automations if none exist
        const defaultAutomations = [
          {
            user_id: user.id,
            name: "Auto-assign new tasks",
            description: "Automatically assign incoming tasks based on team workload",
            enabled: true,
            rule_type: 'task_assignment',
            conditions: { workload_threshold: 80 },
            actions: { assign_to: 'least_busy' }
          },
          {
            user_id: user.id,
            name: "Send deadline reminders",
            description: "Notify team members 24 hours before task deadlines",
            enabled: true,
            rule_type: 'deadline_reminder',
            conditions: { hours_before: 24 },
            actions: { notification_type: 'email' }
          },
          {
            user_id: user.id,
            name: "Archive completed projects",
            description: "Move completed projects to archive after 30 days",
            enabled: false,
            rule_type: 'project_archival',
            conditions: { days_after_completion: 30 },
            actions: { move_to: 'archive' }
          }
        ];
        
        const { data: newData, error: insertError } = await supabase
          .from('automation_rules')
          .insert(defaultAutomations)
          .select();
        
        if (!insertError && newData) {
          setAutomations(newData.map(rule => ({
            id: rule.id,
            name: rule.name,
            description: rule.description,
            enabled: rule.enabled,
            status: rule.enabled ? 'active' : 'inactive',
            triggers: rule.triggers_count || 0,
            lastRun: rule.last_run_at ? new Date(rule.last_run_at).toLocaleString() : 'Never'
          })));
        }
      }
    } catch (error) {
      console.error('Error with automations:', error);
    }
  };

  const handleNewAutomation = () => {
    toast({
      title: "New Automation",
      description: "Automation creation wizard would open here"
    });
  };

  const handleConfigure = (automationName: string) => {
    toast({
      title: "Configure Automation",
      description: `Configuring ${automationName}...`
    });
  };

  const toggleAutomation = async (id: string) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const automation = automations.find(a => a.id === id);
      if (!automation) return;
      
      const newEnabled = !automation.enabled;
      
      const { error } = await supabase
        .from('automation_rules')
        .update({ enabled: newEnabled })
        .eq('id', id)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setAutomations(prev => prev.map(auto => 
        auto.id === id ? { 
          ...auto, 
          enabled: newEnabled, 
          status: newEnabled ? 'active' : 'inactive' 
        } : auto
      ));
      
      toast({
        title: newEnabled ? "Automation Enabled" : "Automation Disabled",
        description: `${automation.name} has been ${newEnabled ? 'enabled' : 'disabled'}`
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update automation",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Automations</h1>
            <p className="text-muted-foreground">Streamline your workflow with intelligent automation</p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover" onClick={handleNewAutomation}>
            <Plus className="mr-2 h-4 w-4" />
            New Automation
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-surface border-card-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Active</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{automations.filter(a => a.enabled).length}</div>
              <p className="text-xs text-muted-foreground">Running automations</p>
            </CardContent>
          </Card>

          <Card className="bg-surface border-card-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Play className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-muted-foreground">Triggers</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{automations.reduce((acc, a) => acc + a.triggers, 0)}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-surface border-card-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Settings className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium text-muted-foreground">Time Saved</span>
              </div>
              <div className="text-2xl font-bold text-foreground">24h</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {automations.map((automation) => (
            <Card key={automation.id} className="bg-surface border-card-border shadow-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{automation.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{automation.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <StatusBadge status={automation.status as "todo" | "in-progress" | "completed" | "review"} />
                    <Switch 
                      checked={automation.enabled} 
                      onCheckedChange={() => toggleAutomation(automation.id)}
                      disabled={loading}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Triggers:</span>
                    <span className="ml-2 font-medium">{automation.triggers}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last run:</span>
                    <span className="ml-2 font-medium">{automation.lastRun}</span>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => handleConfigure(automation.name)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Configure
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

export default Automations;