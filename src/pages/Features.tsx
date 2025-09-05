import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Users, BarChart3, Calendar, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Smart Task Management",
      description: "AI-powered task organization that learns from your patterns and suggests optimal workflows for maximum productivity.",
      color: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration", 
      description: "Real-time collaboration tools with seamless communication, shared workspaces, and integrated team management features.",
      color: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Advanced Analytics",
      description: "Comprehensive insights into productivity trends, time tracking, and performance metrics with beautiful visualizations.",
      color: "bg-gradient-to-br from-green-500/20 to-emerald-500/20"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Smart Scheduling",
      description: "Intelligent calendar management with automated scheduling suggestions and conflict resolution for optimal time allocation.",
      color: "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption, secure data storage, and compliance with industry standards.",
      color: "bg-gradient-to-br from-red-500/20 to-rose-500/20"
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "AI Automation",
      description: "Intelligent automation workflows that handle repetitive tasks, smart notifications, and predictive project management.",
      color: "bg-gradient-to-br from-indigo-500/20 to-purple-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Modern Teams
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover the comprehensive suite of tools designed to streamline your workflow, 
            enhance collaboration, and boost productivity across your organization.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
            onClick={() => navigate("/auth")}
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From individual productivity to enterprise collaboration, 
              Flow Forge provides all the tools you need in one integrated platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-xl ${feature.color} flex items-center justify-center mb-4 text-gray-700`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of teams already using Flow Forge to achieve their goals faster and more efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg"
              onClick={() => navigate("/auth")}
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg"
              onClick={() => navigate("/dashboard")}
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;