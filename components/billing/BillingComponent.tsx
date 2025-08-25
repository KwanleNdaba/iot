"use client";
import { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Building,
  User,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { DisableSubscriptionDialog } from "@/components/ui/custom/DisableSubscriptionDialog";

// Mock data types and enums
export enum SubscriptionStatus {
  Active = "Active",
  NonRenewing = "NonRenewing", 
  Attention = "Attention",
  Completed = "Completed",
  Cancelled = "Cancelled"
}

export enum BillingCycle {
  Monthly = "Monthly",
  Yearly = "Yearly"
}

export enum AccountStatus {
  Active = "Active",
  Pending = "Pending", 
  Suspended = "Suspended",
  Removed = "Removed"
}

export interface SubscriptionResponse {
  id: number;
  productName: string;
  status: SubscriptionStatus;
  billingCycle: BillingCycle;
  price: number;
  currency: string;
  nextPaymentDate: string;
  initiationDate: string;
  cancellationDate?: string;
}

export interface OrganisationResponse {
  id: number;
  name: string;
  isOwner: boolean;
  userStatus: AccountStatus;
  subscriptions: SubscriptionResponse[];
}

// Mock data
const mockUser = {
  firstName: "John",
  lastName: "Doe", 
  emailAddress: "john.doe@example.com"
};

const mockOrganisations: OrganisationResponse[] = [
  {
    id: 1,
    name: "Acme Corp",
    isOwner: true,
    userStatus: AccountStatus.Active,
    subscriptions: [
      {
        id: 101,
        productName: "Pro Plan",
        status: SubscriptionStatus.Active,
        billingCycle: BillingCycle.Monthly,
        price: 99.99,
        currency: "USD",
        nextPaymentDate: "2025-09-19",
        initiationDate: "2025-01-19"
      },
      {
        id: 102,
        productName: "Enterprise Plan",
        status: SubscriptionStatus.NonRenewing,
        billingCycle: BillingCycle.Yearly,
        price: 999.99,
        currency: "USD", 
        nextPaymentDate: "2025-12-19",
        initiationDate: "2024-12-19"
      }
    ]
  },
  {
    id: 2,
    name: "Startup Inc",
    isOwner: true,
    userStatus: AccountStatus.Active,
    subscriptions: [
      {
        id: 201,
        productName: "Basic Plan",
        status: SubscriptionStatus.Attention,
        billingCycle: BillingCycle.Monthly,
        price: 29.99,
        currency: "USD",
        nextPaymentDate: "2025-08-20",
        initiationDate: "2024-08-20"
      }
    ]
  },
  {
    id: 3,
    name: "Old Company",
    isOwner: true, 
    userStatus: AccountStatus.Active,
    subscriptions: [
      {
        id: 301,
        productName: "Legacy Plan",
        status: SubscriptionStatus.Cancelled,
        billingCycle: BillingCycle.Monthly,
        price: 49.99,
        currency: "USD",
        nextPaymentDate: "2025-06-15",
        initiationDate: "2024-01-15",
        cancellationDate: "2025-06-15"
      }
    ]
  }
];

const BillingComponent: FC = () => {
  const [organisations] = useState(mockOrganisations);
  const [selectedOrganisation] = useState(mockOrganisations[0]);
  const { firstName, lastName, emailAddress } = mockUser;

  const [isLoading, setIsLoading] = useState(false);
  const [isManaging, setIsManaging] = useState(false);
  const [isDisabling, setIsDisabling] = useState(false);
  const [showDisableDialog, setShowDisableDialog] = useState(false);
  const [subscriptionToDisable, setSubscriptionToDisable] = useState<
    | (SubscriptionResponse & {
        organisationId: number;
        organisationName: string;
      })
    | null
  >(null);

  // Get subscriptions only from organizations the user owns
  const ownedOrganisations = organisations.filter((org) => org.isOwner);
  const allSubscriptions = ownedOrganisations.flatMap((org) =>
    org.subscriptions.map((sub) => ({
      ...sub,
      organisationName: org.name,
      organisationId: org.id,
    }))
  );

  const activeSubscriptions = allSubscriptions.filter(
    (sub) => sub.status === SubscriptionStatus.Active
  );
  const inactiveSubscriptions = allSubscriptions.filter(
    (sub) => sub.status !== SubscriptionStatus.Active
  );

  const handleRefreshBilling = async () => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Billing information refreshed");
    } catch (error) {
      toast.error("Failed to refresh billing information");
      console.error("Refresh billing error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageSubscription = async (
    subscription: SubscriptionResponse & {
      organisationId: number;
      organisationName: string;
    }
  ) => {
    setIsManaging(true);
    try {
      // Simulate opening management link
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock opening subscription management page
      const mockUrl = `https://example-payment-processor.com/manage/${subscription.id}`;
      window.open(mockUrl, "_blank");

      toast.success("Subscription management page opened");
    } catch (error) {
      toast.error("Failed to open subscription management page");
      console.error("Manage subscription error:", error);
    } finally {
      setIsManaging(false);
    }
  };

  const handleDisableSubscription = async () => {
    if (!subscriptionToDisable) return;

    setIsDisabling(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock disabling subscription - in real app this would update the data
      toast.success("Subscription disabled successfully");
      await handleRefreshBilling();
      setShowDisableDialog(false);
      setSubscriptionToDisable(null);
    } catch (error) {
      toast.error("Failed to disable subscription");
      console.error("Disable subscription error:", error);
    } finally {
      setIsDisabling(false);
    }
  };

  const getStatusDescription = (status: SubscriptionStatus) => {
    switch (status) {
      case SubscriptionStatus.Active:
        return "Subscription is active and will renew automatically";
      case SubscriptionStatus.NonRenewing:
        return "Subscription will not renew - click Manage to update payment method";
      case SubscriptionStatus.Attention:
        return "Payment failed - click Manage to update payment method and retry";
      case SubscriptionStatus.Completed:
        return "Subscription has completed - click Manage to restart";
      case SubscriptionStatus.Cancelled:
        return "Subscription is permanently cancelled";
      default:
        return "";
    }
  };

  const getSubscriptionActionButton = (
    subscription: SubscriptionResponse & {
      organisationId: number;
      organisationName: string;
    }
  ) => {
    const isActive = subscription.status === SubscriptionStatus.Active;
    const isNonRenewing =
      subscription.status === SubscriptionStatus.NonRenewing;
    const hasPaymentIssue =
      subscription.status === SubscriptionStatus.Attention;
    const isCancelled = subscription.status === SubscriptionStatus.Cancelled;
    const isCompleted = subscription.status === SubscriptionStatus.Completed;

    // Show disable button for active subscriptions
    if (isActive) {
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleManageSubscription(subscription)}
            disabled={isManaging}
          >
            {isManaging ? "Opening..." : "Manage"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSubscriptionToDisable(subscription);
              setShowDisableDialog(true);
            }}
          >
            Disable
          </Button>
        </div>
      );
    }

    // Show manage button for non-renewing, completed, or payment issue subscriptions
    if (isNonRenewing || isCompleted || hasPaymentIssue) {
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleManageSubscription(subscription)}
          disabled={isManaging}
        >
          {isManaging ? "Opening..." : "Manage"}
        </Button>
      );
    }

    // No button for permanently cancelled subscriptions
    if (isCancelled) {
      return null;
    }

    // Fallback - should not happen
    return null;
  };

  const formatCurrency = (amount: number, currency: string) => {
    // Use appropriate locale for currency
    const locale = currency === "ZAR" ? "en-ZA" : "en-US";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency || "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: SubscriptionStatus) => {
    switch (status) {
      case SubscriptionStatus.Active:
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case SubscriptionStatus.NonRenewing:
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Disabled
          </Badge>
        );
      case SubscriptionStatus.Attention:
        return (
          <Badge variant="destructive">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Attention
          </Badge>
        );
      case SubscriptionStatus.Completed:
        return (
          <Badge variant="secondary">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      case SubscriptionStatus.Cancelled:
        return (
          <Badge variant="secondary">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAccountStatusDisplay = (status: AccountStatus) => {
    return status;
  };

  const getBillingCycleBadge = (cycle: BillingCycle) => {
    return (
      <Badge variant="outline">
        <Calendar className="w-3 h-3 mr-1" />
        {cycle}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Billing & Subscriptions
          </h1>
          <p className="text-muted-foreground">
            Manage your subscriptions and billing information
          </p>
        </div>
        <Button
          onClick={handleRefreshBilling}
          disabled={isLoading}
          variant="outline"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Account Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Subscriptions
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeSubscriptions.length}
            </div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Organizations
            </CardTitle>
            <Building className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ownedOrganisations.length}
            </div>
            <p className="text-xs text-muted-foreground">Organizations owned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                activeSubscriptions
                  .filter((sub) => sub.billingCycle === BillingCycle.Monthly)
                  .reduce((total, sub) => total + sub.price, 0),
                activeSubscriptions.length > 0
                  ? activeSubscriptions[0].currency
                  : "USD"
              )}
            </div>
            <p className="text-xs text-muted-foreground">Per month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Account Status
            </CardTitle>
            <User className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedOrganisation
                ? getAccountStatusDisplay(selectedOrganisation.userStatus)
                : "Unknown"}
            </div>
            <p className="text-xs text-muted-foreground">
              {firstName} {lastName}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* No owned organizations message */}
      {ownedOrganisations.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Building className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No Organizations Owned
            </h3>
            <p className="text-muted-foreground mb-4">
              You don't own any organizations. Only organization owners can view
              billing information.
            </p>
            <p className="text-sm text-muted-foreground">
              If you're a member of an organization, contact the owner for
              billing details.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Active Subscriptions */}
      {ownedOrganisations.length > 0 && activeSubscriptions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Active Subscriptions
            </CardTitle>
            <CardDescription>
              Your currently active subscription plans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeSubscriptions.map((subscription) => (
                <div
                  key={`${subscription.organisationId}-${subscription.id}`}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">
                        {subscription.productName}
                      </h3>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(subscription.status)}
                        {getBillingCycleBadge(subscription.billingCycle)}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {getStatusDescription(subscription.status)}
                    </p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        {subscription.organisationName}
                      </p>
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Next payment: {formatDate(subscription.nextPaymentDate)}
                      </p>
                      <p className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        {formatCurrency(
                          subscription.price,
                          subscription.currency
                        )}{" "}
                        / {subscription.billingCycle.toLowerCase()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {getSubscriptionActionButton(subscription)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inactive/Cancelled Subscriptions */}
      {ownedOrganisations.length > 0 && inactiveSubscriptions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-gray-600" />
              Inactive & Cancelled Subscriptions
            </CardTitle>
            <CardDescription>
              Your previous and cancelled subscription plans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inactiveSubscriptions.map((subscription) => (
                <div
                  key={`${subscription.organisationId}-${subscription.id}`}
                  className="flex items-center justify-between p-4 border rounded-lg bg-muted/30"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-muted-foreground">
                        {subscription.productName}
                      </h3>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(subscription.status)}
                        {getBillingCycleBadge(subscription.billingCycle)}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {getStatusDescription(subscription.status)}
                    </p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        {subscription.organisationName}
                      </p>
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Started: {formatDate(subscription.initiationDate)}
                      </p>
                      {subscription.cancellationDate && (
                        <p className="flex items-center gap-2">
                          <XCircle className="w-4 h-4" />
                          Cancelled: {formatDate(subscription.cancellationDate)}
                        </p>
                      )}
                      <p className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        {formatCurrency(
                          subscription.price,
                          subscription.currency
                        )}{" "}
                        / {subscription.billingCycle.toLowerCase()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {getSubscriptionActionButton(subscription)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Subscriptions */}
      {allSubscriptions.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              No Subscriptions
            </CardTitle>
            <CardDescription>
              You don't have any subscriptions yet
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-8">
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <CreditCard className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">
                  Get Started with a Subscription
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Create an organization and choose a plan to get started
                </p>
              </div>
              <Button>
                <Building className="h-4 w-4 mr-2" />
                Create Organization
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Billing Information
          </CardTitle>
          <CardDescription>Your account and billing details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Account Holder</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  {firstName} {lastName}
                </p>
                <p>{emailAddress}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Payment Method</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Managed by Payment Processor</p>
                <p className="text-xs">
                  Payment methods are managed through our secure payment
                  processor
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Need Help?</h4>
              <p className="text-sm text-muted-foreground">
                Contact our support team for billing assistance
              </p>
            </div>
            <Button variant="outline">Contact Support</Button>
          </div>
        </CardContent>
      </Card>

      {/* <DisableSubscriptionDialog
        isOpen={showDisableDialog}
        onClose={() => {
          setShowDisableDialog(false);
          setSubscriptionToDisable(null);
        }}
        onConfirm={handleDisableSubscription}
        isDisabling={isDisabling}
      /> */}
    </div>
  );
};

export default BillingComponent;