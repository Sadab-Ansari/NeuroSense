import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Share, Calendar } from "lucide-react";

export default function Reports() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Reports</h1>
          <p className="text-muted-foreground">Download and share your mental health reports</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700">
          <FileText className="mr-2 h-4 w-4" />
          Generate New Report
        </Button>
      </div>

      <div className="grid gap-6">
        {[
          {
            title: "Weekly Wellness Summary",
            date: "Dec 1-7, 2024",
            status: "Ready",
            type: "Weekly"
          },
          {
            title: "Monthly Mental Health Report",
            date: "November 2024",
            status: "Ready", 
            type: "Monthly"
          },
          {
            title: "Assessment Analysis",
            date: "Last 30 days",
            status: "Processing",
            type: "Custom"
          }
        ].map((report, index) => (
          <Card key={index} className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <CardDescription>{report.date}</CardDescription>
                </div>
                <Badge variant={report.status === "Ready" ? "default" : "secondary"}>
                  {report.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button size="sm" disabled={report.status !== "Ready"}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button size="sm" variant="outline" disabled={report.status !== "Ready"}>
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}