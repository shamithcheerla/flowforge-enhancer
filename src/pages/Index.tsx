import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timer, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAppStore } from "@/hooks/useAppStore";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUser } = useAppStore();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    navigate("/dashboard");
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    setUser({ name, email, role: "Team Member" });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        
        {/* Left Side - Smart Task Management */}
        <div className="text-center lg:text-left space-y-6">
          <div className="flex items-center justify-center lg:justify-start space-x-2">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center pulse-glow">
              <Timer className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Smart Task Management</h2>
            </div>
          </div>
          <p className="text-muted-foreground text-lg">
            AI-powered organization that adapts to your workflow
          </p>
        </div>

        {/* Center - Login Form */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md bg-surface border-card-border shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-foreground">Welcome</CardTitle>
              <CardDescription className="text-muted-foreground">
                Sign in to your account or create a new one
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="alex@nexaflow.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-background border-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-background border-input"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary-hover shadow-primary">
                      Sign In
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      Demo credentials: any email/password combination
                    </p>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-background border-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-background border-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-background border-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-background border-input"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary-hover shadow-primary">
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Beautiful Experience */}
        <div className="text-center lg:text-right space-y-6">
          <div className="flex items-center justify-center lg:justify-end space-x-2">
            <div>
              <h2 className="text-xl font-bold text-foreground">Beautiful Experience</h2>
            </div>
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center pulse-glow">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
          <p className="text-muted-foreground text-lg">
            Stunning 3D interface with multiple themes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;