import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Twitter, Linkedin, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Homepage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = () => {
    navigate("/auth");
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Interactive 3D-like Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
          {/* Animated geometric shapes */}
          <div className="absolute inset-0">
            {/* Large floating orbs */}
            <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-32 w-48 h-48 bg-gradient-to-r from-cyan-500/25 to-blue-500/25 rounded-full blur-2xl animate-bounce" style={{animationDuration: '6s'}}></div>
            <div className="absolute bottom-32 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl animate-bounce" style={{animationDuration: '8s', animationDelay: '1s'}}></div>
            
            {/* Floating particles */}
            <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-cyan-400/60 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400/40 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-purple-400/80 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-indigo-400/50 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
            
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: `
                  linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}></div>
            </div>
            
            {/* Central glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/10 via-blue-500/20 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}}></div>
          </div>
        </div>
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/30 dark:bg-background/50 z-10"></div>

      {/* Fixed Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-background/95 backdrop-blur-md border-b border-border/50' : 'bg-background/70 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-primary">
                <span className="text-white font-bold text-lg">FF</span>
              </div>
              <span className="text-xl font-bold text-foreground">Flow Forge</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  {item.name}
                </a>
              ))}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/50">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Flow Forge
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                Smart Task Management with Beautiful 3D Experiences
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 group border-0"
                onClick={handleGetStarted}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-semibold border-white/30 text-white hover:border-white/50 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                onClick={() => navigate("/dashboard")}
              >
                View Demo
              </Button>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
              <div className="text-center space-y-3 p-6 rounded-xl bg-surface/50 backdrop-blur-sm border border-border/50 hover:bg-surface/70 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                  <div className="w-6 h-6 bg-primary rounded-md"></div>
                </div>
                <h3 className="text-lg font-semibold text-foreground">Smart Organization</h3>
                <p className="text-muted-foreground">AI-powered task management that adapts to your workflow</p>
              </div>
              <div className="text-center space-y-3 p-6 rounded-xl bg-surface/50 backdrop-blur-sm border border-border/50 hover:bg-surface/70 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                  <div className="w-6 h-6 bg-gradient-primary rounded-md"></div>
                </div>
                <h3 className="text-lg font-semibold text-foreground">Beautiful Interface</h3>
                <p className="text-muted-foreground">Stunning 3D visuals with smooth animations</p>
              </div>
              <div className="text-center space-y-3 p-6 rounded-xl bg-surface/50 backdrop-blur-sm border border-border/50 hover:bg-surface/70 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                  <div className="w-6 h-6 bg-primary/20 rounded-md animate-pulse"></div>
                </div>
                <h3 className="text-lg font-semibold text-foreground">Real-time Sync</h3>
                <p className="text-muted-foreground">Seamless collaboration across all your devices</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface/50 backdrop-blur-sm border-t border-border/50 py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-muted-foreground">
              © 2024 Flow Forge. All rights reserved.
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 transform hover:scale-110"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 transform hover:scale-110"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 transform hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;