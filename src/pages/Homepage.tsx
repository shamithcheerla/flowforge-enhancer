import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Twitter, Linkedin, Menu, X } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Spline from '@splinetool/react-spline';

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
      {/* 3D Spline Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={
          <div className="w-full h-full bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        }>
          <Spline 
            scene="https://prod.spline.design/JAmAHkGVTlu2ylarApoko3XX/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </Suspense>
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/20 z-10"></div>

      {/* Fixed Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-background/90 backdrop-blur-md border-b border-border/50' : 'bg-background/60 backdrop-blur-sm'
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
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Flow Forge
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Smart Task Management with Beautiful 3D Experiences
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4 text-lg font-semibold shadow-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105 group"
                onClick={handleGetStarted}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-semibold border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
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