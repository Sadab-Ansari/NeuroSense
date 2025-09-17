import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Shield, Heart, ArrowRight, Star, Users, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms analyze your emotional patterns across text, voice, and facial expressions."
  },
  {
    icon: Heart,
    title: "Holistic Mental Health",
    description: "Complete emotional wellness tracking with personalized insights and actionable recommendations."
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your mental health data is encrypted and secure. We never share personal information."
  },
  {
    icon: Zap,
    title: "Real-Time Support",
    description: "Instant AI-powered emotional support and coping strategies whenever you need them."
  }
];

const stats = [
  { label: "Users Helped", value: "50,000+", icon: Users },
  { label: "Accuracy Rate", value: "95%", icon: BarChart3 },
  { label: "Success Stories", value: "4.9/5", icon: Star }
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">NeuroSense</h1>
                <p className="text-xs text-muted-foreground">AI Mental Health Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="ghost">Sign In</Button>
                </SignInButton>
                <SignInButton mode="modal">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700">
                    Get Started
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link to="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center space-y-8 animate-fade-in">
          <Badge className="bg-gradient-to-r from-blue-50 to-green-50 text-blue-700 border border-blue-200 dark:from-blue-900/20 dark:to-green-900/20 dark:text-blue-300 dark:border-blue-700">
            ✨ AI-Powered Mental Health Analysis
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Your Mental Health
            <span className="gradient-text block">Deserves AI Care</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Advanced AI technology analyzes your emotions through text, voice, and facial expressions 
            to provide personalized mental health insights and support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedIn>
              <Link to="/model-selection">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl text-lg px-8 py-6 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700">
                  Start Your Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/20 dark:hover:border-blue-600">
                  View Dashboard
                </Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl text-lg px-8 py-6 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700">
                  Start Your Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </SignInButton>
              <Link to="/model-selection">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/20 dark:hover:border-blue-600">
                  View Demo
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="glass-card text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="text-3xl font-bold gradient-text mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need for comprehensive mental health monitoring and support
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={feature.title} className="glow-card glass-card group hover:shadow-2xl transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-50 to-green-50 group-hover:from-blue-600 group-hover:to-green-600 transition-all duration-300 dark:from-blue-900/20 dark:to-green-900/20">
                    <feature.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-300 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="glass-card text-center p-12 bg-gradient-to-r from-blue-50/50 to-green-50/50 border border-blue-200 dark:from-blue-900/10 dark:to-green-900/10 dark:border-blue-700">
          <CardContent className="space-y-6">
            <h2 className="text-4xl font-bold gradient-text">Ready to Start Your Mental Health Journey?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of users who are already improving their mental wellness with AI-powered insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl text-lg px-8 py-6 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700">
                    Create Free Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </SignInButton>
                <Link to="/model-selection">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/20 dark:hover:border-blue-600">
                    Try Demo
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link to="/model-selection">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl text-lg px-8 py-6 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700">
                    Start Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/20 dark:hover:border-blue-600">
                    Go to Dashboard
                  </Button>
                </Link>
              </SignedIn>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/30 backdrop-blur-xl mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-green-600">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold gradient-text">NeuroSense</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 NeuroSense. All rights reserved. Your mental health matters.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}