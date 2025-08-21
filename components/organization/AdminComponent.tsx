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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Settings,
  Users,
  Shield,
  Bell,
  Key,
  Database,
  Globe,
  Mail,
  Building,
  Calendar,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  AlertTriangle,
  Info,
} from "lucide-react";
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

enum OrganisationState {
  Inactive = 0,
  Active = 1,
  Disabled = 2
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
  organisationStatus: OrganisationState;
  createdAt: string;
  modules: Module[];
  isOwner: boolean;
  subscriptions: Subscription[];
}

// Mock data
const mockSelectedOrganisation: Organisation = {
  id: 1,
  name: "TechCorp Solutions",
  organisationStatus: OrganisationState.Active,
  createdAt: "2024-01-15T10:00:00Z",
  isOwner: true,
  modules: [
    { id: "1", name: "IoT Dashboard", description: "Real-time IoT monitoring" },
    { id: "2", name: "Data Analytics", description: "Advanced analytics platform" },
    { id: "3", name: "Device Manager", description: "Device management system" },
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

const AdminComponent: FC = () => {
  // Mock organization store state
  const [selectedOrganisation] = useState<Organisation | null>(mockSelectedOrganisation);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: selectedOrganisation?.name || "",
    description: "Leading IoT solutions provider specializing in smart sensor networks and data analytics",
    website: "https://techcorp-solutions.com",
    email: "contact@techcorp-solutions.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street",
    city: "San Francisco",
    country: "United States",
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    securityAlerts: true,
    dataRetention: "12",
    autoBackup: true,
    twoFactorAuth: false,
  });

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsEditing(false);
      toast.success("Organization settings updated successfully");
      console.log("Updated form data:", formData);
      console.log("Updated settings:", settings);
    } catch (error) {
      toast.error("Failed to update organization settings");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: selectedOrganisation?.name || "",
      description: "Leading IoT solutions provider specializing in smart sensor networks and data analytics",
      website: "https://techcorp-solutions.com",
      email: "contact@techcorp-solutions.com",
      phone: "+1 (555) 123-4567",
      address: "123 Tech Street",
      city: "San Francisco",
      country: "United States",
    });
  };

  const getStatusBadge = (status: OrganisationState) => {
    switch (status) {
      case OrganisationState.Active:
        return (
          <Badge variant="default" className="bg-green-500">
            Active
          </Badge>
        );
      case OrganisationState.Inactive:
        return <Badge variant="secondary">Inactive</Badge>;
      case OrganisationState.Disabled:
        return <Badge variant="destructive">Disabled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleExportData = () => {
    toast.success("Data export initiated. You'll receive an email when ready.");
    console.log("Exporting organization data...");
  };

  const handleDeleteOrganization = () => {
    toast.error("Organization deletion requires additional confirmation steps");
    console.log("Delete organization requested");
  };

  const handleConnectIntegration = (integrationName: string) => {
    toast.success(`${integrationName} integration initiated`);
    console.log(`Connecting to ${integrationName}...`);
  };

  if (!selectedOrganisation) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Organization Administration
            </h1>
            <p className="text-muted-foreground">
              Please select an organization to manage settings
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
            Organization Administration
          </h1>
          <p className="text-muted-foreground">
            Manage your organization settings, security, and preferences
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Settings
            </Button>
          )}
        </div>
      </div>

      {/* Organization Status Alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Organization Status</AlertTitle>
        <AlertDescription className="flex items-center space-x-2">
          <span>Current status:</span>
          {getStatusBadge(selectedOrganisation.organisationStatus)}
          <span>•</span>
          <span>
            Created:{" "}
            {new Date(selectedOrganisation.createdAt).toLocaleDateString()}
          </span>
          <span>•</span>
          <span>
            Role: {selectedOrganisation.isOwner ? "Owner" : "Member"}
          </span>
        </AlertDescription>
      </Alert>

      {/* Main Content */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <span>Organization Details</span>
                </CardTitle>
                <CardDescription>
                  Basic information about your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input
                    id="org-name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    disabled={!isEditing}
                    placeholder="Brief description of your organization"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                    disabled={!isEditing}
                    placeholder="https://example.com"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Contact Information</span>
                </CardTitle>
                <CardDescription>
                  How to reach your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={!isEditing}
                    placeholder="contact@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    disabled={!isEditing}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    disabled={!isEditing}
                    placeholder="123 Main St"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      disabled={!isEditing}
                      placeholder="New York"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      disabled={!isEditing}
                      placeholder="United States"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Organization Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Organization Statistics</span>
              </CardTitle>
              <CardDescription>
                Key metrics and information about your organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Total Modules</p>
                  <p className="text-2xl font-bold">
                    {selectedOrganisation.modules.length}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Active Subscriptions</p>
                  <p className="text-2xl font-bold">
                    {selectedOrganisation.subscriptions.filter(
                      (sub) => sub.status === SubscriptionStatus.Active
                    ).length}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Organization ID</p>
                  <p className="text-sm text-muted-foreground font-mono">
                    {selectedOrganisation.id}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Created Date</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedOrganisation.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>
                  Configure security and access controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked: boolean) =>
                      setSettings({ ...settings, twoFactorAuth: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about security events
                    </p>
                  </div>
                  <Switch
                    checked={settings.securityAlerts}
                    onCheckedChange={(checked: boolean) =>
                      setSettings({ ...settings, securityAlerts: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="data-retention">
                    Data Retention (months)
                  </Label>
                  <Input
                    id="data-retention"
                    type="number"
                    value={settings.dataRetention}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        dataRetention: e.target.value,
                      })
                    }
                    min="1"
                    max="120"
                  />
                  <p className="text-sm text-muted-foreground">
                    How long to keep organization data
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Data Management</span>
                </CardTitle>
                <CardDescription>
                  Backup and data management settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automatic Backups</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically backup your data daily
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoBackup}
                    onCheckedChange={(checked: boolean) =>
                      setSettings({ ...settings, autoBackup: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Button variant="outline" className="w-full" onClick={handleExportData}>
                    <Database className="h-4 w-4 mr-2" />
                    Export Organization Data
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Download a complete backup of your organization data
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Button variant="destructive" className="w-full" onClick={handleDeleteOrganization}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Organization
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete this organization and all its data
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified about organization activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked: boolean) =>
                    setSettings({ ...settings, emailNotifications: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive critical alerts via SMS
                  </p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked: boolean) =>
                    setSettings({ ...settings, smsNotifications: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about new features and promotions
                  </p>
                </div>
                <Switch
                  checked={settings.marketingEmails}
                  onCheckedChange={(checked: boolean) =>
                    setSettings({ ...settings, marketingEmails: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>API & Webhooks</span>
                </CardTitle>
                <CardDescription>
                  Manage API keys and webhook endpoints
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <div className="flex space-x-2">
                    <Input
                      value="sk_live_••••••••••••••••••••••••••••"
                      disabled
                      className="font-mono"
                    />
                    <Button variant="outline" size="sm" onClick={() => toast.success("API key regenerated")}>
                      <Key className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use this key to authenticate API requests
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Webhook URL</Label>
                  <Input
                    placeholder="https://your-app.com/webhooks"
                    disabled={!isEditing}
                  />
                  <p className="text-sm text-muted-foreground">
                    Receive real-time notifications about events
                  </p>
                </div>
                <Button variant="outline" className="w-full" onClick={() => toast.success("Webhook added")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Webhook
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Third-party Integrations</span>
                </CardTitle>
                <CardDescription>
                  Connect with external services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Mail className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Email Service</p>
                        <p className="text-sm text-muted-foreground">
                          Connected
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <Database className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Analytics</p>
                        <p className="text-sm text-muted-foreground">
                          Not connected
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleConnectIntegration("Analytics")}>
                      Connect
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <Bell className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Slack</p>
                        <p className="text-sm text-muted-foreground">
                          Not connected
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleConnectIntegration("Slack")}>
                      Connect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Subscription & Billing</span>
              </CardTitle>
              <CardDescription>
                Manage your subscriptions and billing information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedOrganisation.subscriptions.length > 0 ? (
                <div className="space-y-4">
                  {selectedOrganisation.subscriptions.map(
                    (subscription, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">
                            {subscription.productName}
                          </h4>
                          <Badge
                            variant={
                              subscription.status === SubscriptionStatus.Active
                                ? "default"
                                : "secondary"
                            }
                          >
                            {subscription.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Price</p>
                            <p className="font-medium">
                              {subscription.currency} {subscription.price}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">
                              Billing Cycle
                            </p>
                            <p className="font-medium">
                              {subscription.billingCycle}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">
                              Next Payment
                            </p>
                            <p className="font-medium">
                              {new Date(
                                subscription.nextPaymentDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Started</p>
                            <p className="font-medium">
                              {new Date(
                                subscription.initiationDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>No Active Subscriptions</AlertTitle>
                  <AlertDescription>
                    You don't have any active subscriptions. Visit the billing
                    page to subscribe to a plan.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminComponent;