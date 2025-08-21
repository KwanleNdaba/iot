"use client";
import { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Users,
  Activity,
  Zap,
  Shield,
  Package,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { toast } from "sonner";

// Mock data types
enum SubscriptionStatus {
  Active = "Active",
  NonRenewing = "NonRenewing",
  Attention = "Attention",
  Completed = "Completed",
  Cancelled = "Cancelled"
}

enum BillingCycle {
  Monthly = "Monthly",
  Yearly = "Yearly"
}

interface Module {
  id: string;
  name: string;
  description: string;
}

interface Subscription {
  id: number;
  productName: string;
  status: SubscriptionStatus;
  billingCycle: BillingCycle;
  price: number;
  currency: string;
  nextPaymentDate: string;
  initiationDate: string;
}

interface Organisation {
  id: number;
  name: string;
  organisationStatus: number;
  createdAt: string;
  modules: Module[];
  isOwner: boolean;
  subscriptions: Subscription[];
}

// Mock data
const mockSelectedOrganisation: Organisation = {
  id: 1,
  name: "TechCorp Solutions",
  organisationStatus: 1, // Active
  createdAt: "2024-01-15T10:00:00Z",
  isOwner: true,
  modules: [
    { id: "1", name: "IoT Dashboard", description: "Real-time IoT monitoring and analytics" },
    { id: "2", name: "Data Analytics Pro", description: "Advanced data analytics platform" },
    { id: "3", name: "Device Manager", description: "Comprehensive device management" },
    { id: "4", name: "Alert System", description: "Real-time alerting and notifications" },
  ],
  subscriptions: [
    {
      id: 1,
      productName: "IoT Dashboard Pro",
      status: SubscriptionStatus.Active,
      billingCycle: BillingCycle.Monthly,
      price: 99.99,
      currency: "USD",
      nextPaymentDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      initiationDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      productName: "Analytics Suite",
      status: SubscriptionStatus.Active,
      billingCycle: BillingCycle.Yearly,
      price: 599.99,
      currency: "USD",
      nextPaymentDate: new Date(Date.now() + 275 * 24 * 60 * 60 * 1000).toISOString(),
      initiationDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
};

const mockOrganisations = [mockSelectedOrganisation];

const recentActivities = [
  {
    id: 1,
    action: "New user invited to organization",
    user: "John Doe",
    time: "2 hours ago",
    type: "success",
  },
  {
    id: 2,
    action: "Subscription renewed successfully",
    user: "System",
    time: "1 day ago",
    type: "success",
  },
  {
    id: 3,
    action: "IoT Dashboard module accessed",
    user: "Sarah Smith",
    time: "3 hours ago",
    type: "info",
  },
  {
    id: 4,
    action: "System backup completed",
    user: "System",
    time: "6 hours ago",
    type: "success",
  },
  {
    id: 5,
    action: "API rate limit warning",
    user: "System",
    time: "1 day ago",
    type: "warning",
  },
];

const DashBoardComponent: FC = () => {
  // Mock organization store state
  const [selectedOrganisation] = useState<Organisation | null>(mockSelectedOrganisation);
  const [organisations] = useState<Organisation[]>(mockOrganisations);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate real metrics from organization data
  const calculateMetrics = () => {
    if (!selectedOrganisation) {
      return {
        totalUsers: 0,
        activeSessions: 0,
        revenue: 0,
        subscriptionCount: 0,
      };
    }

    const activeSubscriptions = selectedOrganisation.subscriptions.filter(
      (sub) => sub.status === SubscriptionStatus.Active
    );

    const totalRevenue = activeSubscriptions.reduce(
      (sum, sub) => sum + sub.price,
      0
    );

    return {
      totalUsers: 8, // Mock user count
      activeSessions: selectedOrganisation.modules.length,
      revenue: totalRevenue,
      subscriptionCount: activeSubscriptions.length,
    };
  };

  const metrics = calculateMetrics();

  // Generate module usage data from real modules
  const getModuleUsageData = () => {
    if (!selectedOrganisation?.modules?.length) {
      return [];
    }

    const colors = [
      "#8884d8",
      "#82ca9d",
      "#ffc658",
      "#ff7300",
      "#8dd1e1",
      "#d084d0",
    ];

    // Simulate realistic usage percentages
    const usagePercentages = [35, 28, 22, 15]; // Should add up to 100

    return selectedOrganisation.modules.map((module, index) => ({
      name: module.name,
      value: usagePercentages[index] || 10,
      color: colors[index % colors.length],
    }));
  };

  const moduleUsageData = getModuleUsageData();

  // Generate activity data based on organization creation and subscription dates
  const getActivityData = () => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const currentMonth = new Date().getMonth();

    // Generate last 6 months of data with realistic progression
    const baseModules = selectedOrganisation?.modules?.length || 4;
    const baseSubscriptions = selectedOrganisation?.subscriptions?.length || 2;

    // Create a realistic growth pattern
    const growthPattern = [0.6, 0.7, 0.8, 0.9, 0.95, 1.0]; // Gradual growth over 6 months

    return Array.from({ length: 6 }, (_, i) => {
      const monthIndex = (currentMonth - 5 + i + 12) % 12;
      
      return {
        name: months[monthIndex],
        modules: Math.max(1, Math.round(baseModules * growthPattern[i])),
        subscriptions: Math.max(1, Math.round(baseSubscriptions * growthPattern[i])),
        users: Math.max(1, Math.round(8 * growthPattern[i])), // User growth
      };
    });
  };

  const activityData = getActivityData();

  const getStatusIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  const getSubscriptionStatus = () => {
    if (!selectedOrganisation?.subscriptions?.length) {
      return { status: "No Subscription", color: "destructive", icon: XCircle };
    }

    const activeSubscriptions = selectedOrganisation.subscriptions.filter(
      (sub) => sub.status === SubscriptionStatus.Active
    );

    if (activeSubscriptions.length > 0) {
      return { status: "Active", color: "default", icon: CheckCircle };
    }

    return { status: "Inactive", color: "secondary", icon: AlertTriangle };
  };

  const subscriptionInfo = getSubscriptionStatus();

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Dashboard data refreshed successfully");
    } catch (error) {
      toast.error("Failed to refresh dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedOrganisation) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Organization Dashboard
            </h1>
            <p className="text-muted-foreground">
              Please select an organization to view dashboard
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Organization Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor your organization's performance and key metrics
          </p>
        </div>
        <Button onClick={handleRefresh} disabled={isLoading} variant="outline">
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Modules
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeSessions}</div>
            <p className="text-xs text-muted-foreground">
              All modules operational
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${metrics.revenue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              From {metrics.subscriptionCount} subscription(s)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscription</CardTitle>
            <subscriptionInfo.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge variant={subscriptionInfo.color as any}>
                {subscriptionInfo.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {selectedOrganisation.subscriptions.length} subscription(s)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>
              Growth metrics and engagement over time
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ChartContainer
              config={{
                modules: {
                  label: "Modules",
                  color: "hsl(var(--chart-1))",
                },
                subscriptions: {
                  label: "Subscriptions", 
                  color: "hsl(var(--chart-2))",
                },
                users: {
                  label: "Users",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px] w-full overflow-hidden"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={activityData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="modules"
                    stroke="#8884d8"
                    strokeWidth={3}
                    dot={{ fill: "#8884d8", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="subscriptions"
                    stroke="#82ca9d"
                    strokeWidth={3}
                    dot={{ fill: "#82ca9d", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#ffc658"
                    strokeWidth={3}
                    dot={{ fill: "#ffc658", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Module Usage</CardTitle>
            <CardDescription>
              Distribution of module usage across your organization
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ChartContainer
              config={{
                "IoT Dashboard": {
                  label: "IoT Dashboard",
                  color: "#8884d8",
                },
                "Data Analytics Pro": {
                  label: "Data Analytics Pro",
                  color: "#82ca9d",
                },
                "Device Manager": {
                  label: "Device Manager",
                  color: "#ffc658",
                },
                "Alert System": {
                  label: "Alert System",
                  color: "#ff7300",
                },
              }}
              className="h-[300px] w-full overflow-hidden"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <Pie
                    data={moduleUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {moduleUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Modules
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {selectedOrganisation.modules.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Modules currently in use
                </p>
                <div className="mt-4 space-y-2">
                  {selectedOrganisation.modules
                    .slice(0, 3)
                    .map((module, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">{module.name}</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  System Health
                </CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">99.2%</div>
                <p className="text-xs text-muted-foreground">
                  Uptime this month
                </p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>System Status</span>
                    <span>Excellent</span>
                  </div>
                  <Progress value={99.2} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Performance
                </CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Excellent</div>
                <p className="text-xs text-muted-foreground">
                  Average response time: 98ms
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>API Response</span>
                    <span className="text-green-500">98ms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Database Query</span>
                    <span className="text-green-500">32ms</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>
                Monthly revenue breakdown and trends
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ChartContainer
                config={{
                  subscriptions: {
                    label: "Subscriptions",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[250px] w-full overflow-hidden"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={activityData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="subscriptions"
                      stroke="var(--color-subscriptions)"
                      fill="var(--color-subscriptions)"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest actions and events in your organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4 p-3 rounded-lg border"
                  >
                    {getStatusIcon(activity.type)}
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.action}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        by {activity.user}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Organization Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Organization Information</span>
          </CardTitle>
          <CardDescription>
            Key details about your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm font-medium">Organization Name</p>
              <p className="text-sm text-muted-foreground">
                {selectedOrganisation.name}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Created</p>
              <p className="text-sm text-muted-foreground">
                {new Date(selectedOrganisation.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Status</p>
              <Badge
                variant={
                  selectedOrganisation.organisationStatus === 1
                    ? "default"
                    : "secondary"
                }
              >
                {selectedOrganisation.organisationStatus === 1
                  ? "Active"
                  : "Inactive"}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Your Role</p>
              <Badge
                variant={selectedOrganisation.isOwner ? "default" : "outline"}
              >
                {selectedOrganisation.isOwner ? "Owner" : "Member"}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Active Subscriptions</p>
              <p className="text-sm text-muted-foreground">
                {selectedOrganisation.subscriptions.filter(
                  (sub) => sub.status === SubscriptionStatus.Active
                ).length}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Total Modules</p>
              <p className="text-sm text-muted-foreground">
                {selectedOrganisation.modules.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashBoardComponent;