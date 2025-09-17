import { useLocation, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartConfig 
} from "@/components/ui/chart";
import { 
  Brain, 
  Heart, 
  TrendingUp, 
  Download,
  Share,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle,
  Activity,
  Lightbulb,
  ArrowRight,
  MessageSquare,
  Mic,
  Camera
} from "lucide-react";

// Mock results based on analysis
const mockResults = {
  overallScore: 78,
  emotions: {
    joy: 65,
    calm: 72,
    anxiety: 35,
    stress: 28,
    depression: 15
  },
  dimensions: [
    { subject: "Emotional Stability", A: 78, fullMark: 100 },
    { subject: "Stress Management", A: 65, fullMark: 100 },
    { subject: "Social Connection", A: 85, fullMark: 100 },
    { subject: "Sleep Quality", A: 45, fullMark: 100 },
    { subject: "Physical Wellness", A: 70, fullMark: 100 },
    { subject: "Life Satisfaction", A: 82, fullMark: 100 }
  ],
  detectedPatterns: [
    "Work-related stress patterns detected",
    "Positive social connections identified", 
    "Sleep quality concerns noted",
    "Overall emotional resilience is strong"
  ],
  recommendations: [
    {
      category: "Sleep Improvement",
      priority: "High",
      action: "Establish consistent sleep schedule",
      description: "Your responses indicate irregular sleep patterns. Try going to bed at the same time each night."
    },
    {
      category: "Stress Management", 
      priority: "Medium",
      action: "Practice mindfulness techniques",
      description: "Consider 10-15 minutes of daily meditation to help manage work stress."
    },
    {
      category: "Physical Activity",
      priority: "Medium", 
      action: "Increase daily movement",
      description: "Regular exercise can significantly improve both mood and sleep quality."
    }
  ]
};

const chartConfig: ChartConfig = {
  emotions: {
    label: "Emotion Level",
    color: "hsl(var(--primary))"
  }
};

export default function Results() {
  const location = useLocation();
  const { method, answers } = location.state || {};

  const getMethodIcon = () => {
    switch (method) {
      case "voice": return Mic;
      case "webcam": return Camera;
      default: return MessageSquare;
    }
  };

  const getMethodName = () => {
    switch (method) {
      case "voice": return "Voice Analysis";
      case "webcam": return "Facial Expression Analysis"; 
      default: return "Text Analysis";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Attention";
  };

  const emotionData = Object.entries(mockResults.emotions).map(([emotion, value]) => ({
    emotion: emotion.charAt(0).toUpperCase() + emotion.slice(1),
    value
  }));

  const MethodIcon = getMethodIcon();

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
            <MethodIcon className="h-6 w-6 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-bold gradient-text">Assessment Results</h1>
            <p className="text-muted-foreground">{getMethodName()} Complete</p>
          </div>
        </div>
        
        <Badge className="bg-gradient-to-r from-green-500/10 to-green-600/10 text-green-600 border-green-500/20">
          <CheckCircle className="w-3 h-3 mr-1" />
          Analysis Complete
        </Badge>
      </div>

      {/* Overall Score */}
      <Card className="glass-card bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="w-32 h-32 mx-auto relative">
              <div className="w-full h-full rounded-full bg-gradient-to-r from-primary to-accent p-1">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getScoreColor(mockResults.overallScore)}`}>
                      {mockResults.overallScore}
                    </div>
                    <div className="text-xs text-muted-foreground">/ 100</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Overall Mental Wellness Score</h2>
              <p className="text-lg text-muted-foreground">
                {getScoreLabel(mockResults.overallScore)} - Your mental health appears to be in {getScoreLabel(mockResults.overallScore).toLowerCase()} condition
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emotional Analysis */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Detected Emotions
            </CardTitle>
            <CardDescription>
              Emotional patterns identified through {method} analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={emotionData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="emotion" type="category" width={80} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="value" 
                    fill="hsl(var(--primary))" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Wellness Dimensions */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Wellness Dimensions
            </CardTitle>
            <CardDescription>
              Multi-dimensional analysis of your mental health
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={mockResults.dimensions}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Wellness Score"
                  dataKey="A"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detected Patterns */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Key Insights
          </CardTitle>
          <CardDescription>
            Important patterns and observations from your assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockResults.detectedPatterns.map((pattern, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <Activity className="h-5 w-5 text-primary mt-0.5" />
                <p className="text-sm leading-relaxed">{pattern}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Personalized Recommendations
          </CardTitle>
          <CardDescription>
            AI-generated suggestions to improve your mental wellness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockResults.recommendations.map((rec, index) => (
              <div key={index} className="p-4 border border-border/50 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{rec.action}</h4>
                  <Badge variant={rec.priority === "High" ? "destructive" : "secondary"}>
                    {rec.priority} Priority
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">{rec.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Category: {rec.category}</span>
                  <Button size="sm" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700">
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
        <Button size="lg" variant="outline">
          <Share className="mr-2 h-4 w-4" />
          Share with Provider
        </Button>
        <Link to="/ai-support">
          <Button size="lg" variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Talk to AI Counselor
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button size="lg" variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            View Dashboard
          </Button>
        </Link>
      </div>

      {/* Next Steps */}
      <Card className="glass-card bg-gradient-to-r from-muted/30 to-muted/10">
        <CardContent className="p-6 text-center space-y-4">
          <h3 className="text-xl font-bold">What's Next?</h3>
          <p className="text-muted-foreground">
            Continue your mental health journey with regular assessments and AI-powered support.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/model-selection">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700">
                Take Another Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline">
                Return to Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}