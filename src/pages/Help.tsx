import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircle, Search, BookOpen, MessageCircle, Mail, Video } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Help = () => {
  const { toast } = useToast();
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      setChatMessages(prev => [...prev, `You: ${currentMessage}`, "Support: Thank you for your message. We'll get back to you soon!"]);
      setCurrentMessage("");
    }
  };

  const handleStartChat = () => {
    toast({
      title: "Live Chat Started",
      description: "Connecting you with our support team..."
    });
  };

  const helpTopics = [
    {
      id: 1,
      title: "Getting Started",
      description: "Learn the basics of using NexaFlow",
      icon: BookOpen,
      articles: 12
    },
    {
      id: 2,
      title: "Task Management",
      description: "How to create, assign, and track tasks effectively",
      icon: HelpCircle,
      articles: 18
    },
    {
      id: 3,
      title: "Project Planning",
      description: "Best practices for project organization",
      icon: BookOpen,
      articles: 15
    },
    {
      id: 4,
      title: "Team Collaboration",
      description: "Work together seamlessly with your team",
      icon: MessageCircle,
      articles: 10
    }
  ];

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Help Center</h1>
          <p className="text-muted-foreground">Find answers and get support</p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {helpTopics.map((topic) => (
            <Card key={topic.id} className="bg-surface border-card-border shadow-card hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <topic.icon className="h-5 w-5 text-primary" />
                  <span>{topic.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">{topic.description}</p>
                <p className="text-sm text-muted-foreground">{topic.articles} articles</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-surface border-card-border shadow-card">
            <CardContent className="p-6 text-center">
              <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-4">Send us your questions and get detailed responses</p>
              <div className="space-y-3">
                {chatMessages.length > 0 && (
                  <div className="max-h-32 overflow-y-auto space-y-1 p-2 bg-muted rounded">
                    {chatMessages.map((msg, idx) => (
                      <p key={idx} className="text-sm">{msg}</p>
                    ))}
                  </div>
                )}
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button size="sm" onClick={handleSendMessage}>Send</Button>
                </div>
                <Button variant="outline" className="w-full" onClick={() => {
                  toast({
                    title: "Email Support",
                    description: "Redirecting to email support..."
                  });
                }}>
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-card-border shadow-card">
            <CardContent className="p-6 text-center">
              <HelpCircle className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">FAQ & Documentation</h3>
              <p className="text-sm text-muted-foreground mb-4">Browse our comprehensive knowledge base</p>
              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Documentation
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Browse FAQ
                </Button>
                <Button className="w-full" onClick={handleStartChat}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Start Live Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Help;