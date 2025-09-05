import { Menu, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface NavBarProps {
  onToggleSidebar: () => void;
}

export function NavBar({ onToggleSidebar }: NavBarProps) {
  const { user, profile, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      // Clear all stored data
      localStorage.clear();
      sessionStorage.clear();
      
      // Force redirect to homepage after logout
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    } catch (error) {
      console.error('Logout error:', error);
      // Force redirect even if logout fails
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    }
  };

  return (
    <header className="h-16 border-b border-border bg-surface/80 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="hover:bg-surface-hover"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">NexaFlow</h1>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || user?.email || 'User'} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {profile?.full_name 
                      ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
                      : user?.email ? user.email[0].toUpperCase() : 'U'
                    }
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{profile?.full_name || user?.email || 'User'}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {profile?.role || 'Member'}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}