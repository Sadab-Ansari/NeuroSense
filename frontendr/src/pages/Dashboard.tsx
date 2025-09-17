import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartConfig 
} from "@/components/ui/chart";
import { 
  Brain, 
  TrendingUp, 
  Heart, 
  Zap, 
  Calendar,
  Target,
  Activity,
  Award,
  ArrowUp,
  ArrowDown
} from "lucide-react";

// Mock data
const moodData = [
  { date: "Mon", mood: 75, anxiety: 30, stress: 25 },
  { date: "Tue", mood: 82, anxiety: 20, stress: 15 },
  { date: "Wed", mood: 68, anxiety: 45, stress: 40 },
  { date: "Thu", mood: 90, anxiety: 15, stress: 10 },
  { date: "Fri", mood: 85, anxiety: 25, stress: 20 },
  { date: "Sat", mood: 95, anxiety: 10, stress: 5 },
  { date: "Sun", mood: 88, anxiety: 18, stress: 12 }
];

const emotionDistribution = [
  { name: "Joy", value: 35, color: "#14FFEC" },
  { name: "Calm", value: 28, color: "#0D7377" },
  { name: "Neutral", value: 20, color: "#323232" },
  { name: "Stress", value: 12, color: "#FF6B6B" },
  { name: "Anxiety", value: 5, color: "#FFB347" }
];

const radarData = [
  { subject: "Emotional Stability", A: 85, fullMark: 100 },
  { subject: "Social Connections", A: 70, fullMark: 100 },
  { subject: "Sleep Quality", A: 90, fullMark: 100 },
  { subject: "Stress Management", A: 75, fullMark: 100 },
  { subject: "Physical Activity", A: 60, fullMark: 100 },
  { subject: "Mindfulness", A: 80, fullMark: 100 }
];

const chartConfig: ChartConfig = {
  mood: {
    label: "Mood Score",
    color: "hsl(var(--primary))"
  },
  anxiety: {
    label: "Anxiety Level",
    color: "hsl(var(--destructive))"
  },
  stress: {
    label: "Stress Level",
    color: "hsl(var(--accent))"
  }
};

const stats = [
  {
    title: "Overall Wellness",
    value: "82%",
    change: "+5%",
    trending: "up",
    icon: Heart,
    description: "7-day average"
  },
  {
    title: "Mood Stability",
    value: "7.8/10",
    change: "+0.3",
    trending: "up",
    icon: Brain,
    description: "This week"
  },
  {
    title: "Stress Level",
    value: "Low",
    change: "-15%",
    trending: "down",
    icon: Zap,
    description: "Reduced this week"
  },
  {
    title: "Sessions Completed",
    value: "12",
    change: "+4",
    trending: "up",
    icon: Target,
    description: "This month"
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Mental Health Dashboard</h1>
          <p className="text-muted-foreground">Track your emotional wellness journey</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-gradient-to-r from-blue-50 to-green-50 text-blue-700 border border-blue-200 dark:from-blue-900/20 dark:to-green-900/20 dark:text-blue-300 dark:border-blue-700">
            <Activity className="w-3 h-3 mr-1" />
            Active Monitoring
          </Badge>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700">
            New Assessment
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="glass-card animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1 text-sm">
                    {stat.trending === "up" ? (
                      <ArrowUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-green-500" />
                    )}
                    <span className="text-green-500 font-medium">{stat.change}</span>
                    <span className="text-muted-foreground">{stat.description}</span>
                  </div>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
                  <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Mood Trend Chart */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Weekly Mood Trends
            </CardTitle>
            <CardDescription>
              Track your emotional patterns over the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moodData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="mood"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="anxiety"
                    stroke="hsl(var(--destructive))"
                    fill="hsl(var(--destructive))"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Emotion Distribution */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Emotion Distribution
            </CardTitle>
            <CardDescription>
              Your emotional state breakdown this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={emotionDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {emotionDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
                            <p className="text-sm font-medium">{data.name}</p>
                            <p className="text-sm text-primary">{data.value}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4 w-full">
                {emotionDistribution.map((emotion) => (
                  <div key={emotion.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: emotion.color }}
                    />
                    <span className="text-sm font-medium">{emotion.name}</span>
                    <span className="text-sm text-muted-foreground ml-auto">{emotion.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wellness Radar */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Wellness Dimensions
            </CardTitle>
            <CardDescription>
              Comprehensive view of your mental health factors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
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

        {/* Quick Actions */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start bg-gradient-to-r from-blue-50 to-green-50 text-blue-700 hover:from-blue-100 hover:to-green-100 border border-blue-200 shadow-sm hover:shadow-md dark:from-blue-900/20 dark:to-green-900/20 dark:text-blue-300 dark:hover:from-blue-800/30 dark:hover:to-green-800/30 dark:border-blue-700">
              <Brain className="mr-2 h-4 w-4" />
              Take Mood Assessment
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Heart className="mr-2 h-4 w-4" />
              Start AI Therapy Session
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Activity className="mr-2 h-4 w-4" />
              View Detailed Reports
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Target className="mr-2 h-4 w-4" />
              Set Wellness Goals
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest mental health interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: "2 hours ago", action: "Completed mood assessment", score: "8.2/10", type: "assessment" },
              { time: "Yesterday", action: "AI therapy session", score: "45 min", type: "session" },
              { time: "2 days ago", action: "Stress management exercise", score: "Completed", type: "exercise" },
              { time: "3 days ago", action: "Weekly wellness report generated", score: "View Report", type: "report" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === "assessment" ? "bg-primary" :
                    activity.type === "session" ? "bg-accent" :
                    activity.type === "exercise" ? "bg-green-500" : "bg-blue-500"
                  }`} />
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <Badge variant="outline">{activity.score}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}