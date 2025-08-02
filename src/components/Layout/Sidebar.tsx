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
  { name: "Help", href: "/help", icon: HelpCircle },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();

  return (
    <div className={cn("flex h-full w-64 flex-col bg-surface border-r border-border", className)}>
      {/* Logo */}
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

      {/* Quick Actions */}
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

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 custom-scrollbar overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link key={item.name} to={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start h-10",
                  isActive && "bg-primary/10 text-primary hover:bg-primary/20"
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-medium text-sm">AJ</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Alex Johnson</p>
            <p className="text-xs text-muted-foreground truncate">Product Manager</p>
          </div>
        </div>
        <div className="mt-3 flex space-x-2">
          <ThemeToggle />
          <Button size="sm" variant="outline">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}