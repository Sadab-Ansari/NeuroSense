import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Download } from "lucide-react";

export default function AdminUsers() {
  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      role: "Premium",
      lastTest: "2024-01-15",
      riskLevel: "Low"
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      role: "Free",
      lastTest: "2024-01-14",
      riskLevel: "Medium"
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.w@email.com",
      role: "Premium",
      lastTest: "2024-01-13",
      riskLevel: "Low"
    },
    {
      id: 4,
      name: "David Brown",
      email: "david.brown@email.com",
      role: "Free",
      lastTest: "2024-01-12",
      riskLevel: "High"
    },
    {
      id: 5,
      name: "Lisa Garcia",
      email: "lisa.garcia@email.com",
      role: "Premium",
      lastTest: "2024-01-11",
      riskLevel: "Medium"
    },
    {
      id: 6,
      name: "Tom Anderson",
      email: "tom.a@email.com",
      role: "Free",
      lastTest: "2024-01-10",
      riskLevel: "Low"
    }
  ];

  const getRiskBadgeVariant = (level: string) => {
    switch (level) {
      case "Low": return "default";
      case "Medium": return "secondary";
      case "High": return "destructive";
      default: return "default";
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    return role === "Premium" ? "default" : "outline";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight gradient-text">User Management</h1>
          <p className="text-muted-foreground">
            Manage users, view their data and monitor risk levels
          </p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export Users
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Users ({users.length})</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search users..." className="pl-8 w-64" />
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last Test Date</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastTest}</TableCell>
                  <TableCell>
                    <Badge variant={getRiskBadgeVariant(user.riskLevel)}>
                      {user.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}