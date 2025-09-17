import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Calendar, Download } from "lucide-react";

export default function Analytics() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Analytics</h1>
          <p className="text-muted-foreground">Detailed insights into your mental health journey</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Mood Trends", value: "Improving", icon: TrendingUp },
          { title: "Assessment Count", value: "24", icon: BarChart3 },
          { title: "Active Days", value: "18/30", icon: Calendar }
        ].map((stat, index) => (
          <Card key={stat.title} className="glass-card">
            <CardContent className="p-6 text-center">
              <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-muted-foreground">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Advanced Analytics Coming Soon</CardTitle>
          <CardDescription>
            We're building comprehensive analytics to help you better understand your mental health patterns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Advanced charts and insights will be available soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}