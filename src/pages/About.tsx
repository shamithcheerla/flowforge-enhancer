import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Users, Lightbulb, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Mission-Driven",
      description: "We're dedicated to empowering teams worldwide to achieve their full potential through intelligent task management and seamless collaboration."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "User-Centric",
      description: "Every feature we build starts with understanding our users' real needs and challenges, ensuring our solutions truly make work better."
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation First",
      description: "We leverage cutting-edge AI and modern technologies to create experiences that weren't possible before, pushing the boundaries of productivity tools."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description: "We maintain the highest standards in everything we do, from security and performance to user experience and customer support."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50+", label: "Countries" },
    { number: "99.9%", label: "Uptime" },
    { number: "4.9/5", label: "User Rating" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Building the Future of{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Work Management
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Flow Forge was created with a simple vision: to make project management intuitive, 
              collaborative, and powerful enough for teams of any size to achieve extraordinary results.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Founded in 2024, Flow Forge emerged from the frustration of using outdated, 
                  complex project management tools that hindered rather than helped productivity. 
                  Our founding team, with decades of combined experience in software development 
                  and team management, set out to create something different.
                </p>
                <p>
                  We believe that the best tools are invisible – they should enhance your natural 
                  workflow without getting in the way. That's why Flow Forge combines powerful 
                  features with an intuitive interface that feels natural from day one.
                </p>
                <p>
                  Today, Flow Forge serves teams across 50+ countries, from startups to 
                  Fortune 500 companies, helping them collaborate more effectively and 
                  achieve their goals faster than ever before.
                </p>
              </div>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white mt-8"
                onClick={() => navigate("/auth")}
              >
                Join Our Mission
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-white font-bold text-2xl">FF</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Flow Forge</h3>
                <p className="text-gray-600 mt-2">Empowering teams worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and shape the culture we've built.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-white border border-gray-200 p-8 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl flex items-center justify-center text-blue-600">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Built by a Passionate Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Our diverse team of designers, developers, and product experts is united 
            by a shared commitment to making work more human and productive.
          </p>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h3 className="text-2xl font-semibold mb-4">Want to join our team?</h3>
            <p className="text-blue-100 mb-6">
              We're always looking for talented individuals who share our passion for building amazing products.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              View Open Positions
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;