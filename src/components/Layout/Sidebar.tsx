import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  CheckSquare, 
  FolderKanban, 
  BarChart3, 
  Users, 
  Calendar, 
  Settings, 
  FileText, 
  Clock,
  Target,
  Zap,
  HelpCircle,
  Bell,
  Archive,
  Palette,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAppStore } from "@/hooks/useAppStore";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Team", href: "/team", icon: Users },
  { name: "Time Tracking", href: "/time-tracking", icon: Clock },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Goals", href: "/goals", icon: Target },
  { name: "Templates", href: "/templates", icon: Archive },
  { name: "Automations", href: "/automations", icon: Zap },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Profile", href: "/profile", icon: Palette },
  { name: "Help", href: "/help", icon: HelpCircle },
];

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
}

export function Sidebar({ className, collapsed = false }: SidebarProps) {
  const location = useLocation();
  const { user } = useAppStore();

  return (
    <div className={cn(
      "flex h-full flex-col bg-surface border-r border-border transition-all duration-300",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Logo - Hidden when collapsed */}
      {!collapsed && (
        <div className="flex h-16 items-center px-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">NexaFlow</h1>
              <p className="text-xs text-muted-foreground">Advanced Task Manager</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions - Hidden when collapsed */}
      {!collapsed && (
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <CreateTaskDialog>
              <Button size="sm" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Create Task
              </Button>
            </CreateTaskDialog>
            <Button size="sm" variant="outline" className="w-full justify-start">
              Search
            </Button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 custom-scrollbar overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link key={item.name} to={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full h-10",
                  collapsed ? "justify-center px-0" : "justify-start",
                  isActive && "bg-primary/10 text-primary hover:bg-primary/20"
                )}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
                {!collapsed && item.name}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Bottom spacing when collapsed */}
      {collapsed && <div className="p-4"></div>}
    </div>
  );
}