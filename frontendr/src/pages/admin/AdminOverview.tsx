import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Brain, Activity } from "lucide-react";

export default function AdminOverview() {
  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12%",
      icon: Users,
      description: "Active registered users"
    },
    {
      title: "Tests Taken",
      value: "15,294",
      change: "+8%",
      icon: Brain,
      description: "Mental health assessments completed"
    },
    {
      title: "Active Users Today",
      value: "186",
      change: "+23%",
      icon: Activity,
      description: "Users active in the last 24 hours"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text">Admin Overview</h1>
        <p className="text-muted-foreground">
          Monitor key metrics and system performance
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span className="text-green-600 font-medium">{stat.change}</span>
                <span>from last month</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: "Sarah Johnson", action: "Completed anxiety assessment", time: "2 minutes ago" },
                { user: "Mike Chen", action: "Started voice analysis", time: "5 minutes ago" },
                { user: "Emma Wilson", action: "Generated weekly report", time: "12 minutes ago" },
                { user: "David Brown", action: "Used AI support chat", time: "18 minutes ago" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium text-sm">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover-card">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { service: "AI Analysis Engine", status: "Online", uptime: "99.9%" },
                { service: "Voice Processing", status: "Online", uptime: "99.7%" },
                { service: "Database", status: "Online", uptime: "100%" },
                { service: "API Gateway", status: "Online", uptime: "99.8%" }
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium text-sm">{service.service}</p>
                    <p className="text-xs text-muted-foreground">Uptime: {service.uptime}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {service.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}