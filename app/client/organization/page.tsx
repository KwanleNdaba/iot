'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, AlertTriangle, Zap } from "lucide-react";
import OrganizationComponent from "@/components/organization/OrganizationComponent";
import { CreateOrganisationDialog } from "@/components/ui/custom/create-organisation-dialog";

// Simple mock types
enum SubscriptionStatus {
  Active = "Active",
  Cancelled = "Cancelled"
}

interface MockSubscription {
  id: number;
  status: SubscriptionStatus;
  productType: number | string;
  productName: string;
}

interface MockOrganisation {
  id: number;
  name: string;
  subscriptions: MockSubscription[];
}

// Mock data - change hasPlatform to test different scenarios
const mockOrganisation: MockOrganisation = {
  id: 1,
  name: "Acme Corp",
  subscriptions: [
    {
      id: 101,
      status: SubscriptionStatus.Active,
      productType: 1, // Platform = 1
      productName: "Platform Pro"
    }
  ]
};

// Alternative mock data for testing blocked content
// const mockOrganisation: MockOrganisation = {
//   id: 1,
//   name: "Acme Corp",
//   subscriptions: [
//     {
//       id: 102,
//       status: SubscriptionStatus.Active,
//       productType: 0, // Products = 0 (no platform)
//       productName: "Products Basic"
//     }
//   ]
// };

export default function OrganizationPage() {
  const searchParams = useSearchParams();
  const component = searchParams.get('component') || 'dashboard';
  
  const [selectedOrganisation] = useState(mockOrganisation);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [blockContent, setBlockContent] = useState(false);

  // Mock functions
  const refreshSelectedOrganisation = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
  };

  const openDialog = (step: number) => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const setOrganizationData = (id: number, name: string) => {
    console.log(`Setting org data: ${name} (${id})`);
  };

  const completeFlow = () => {
    setIsDialogOpen(false);
  };

  const loadFromDatabase = async (orgId: number) => {
    await new Promise(resolve => setTimeout(resolve, 200));
  };

  // Check subscriptions and enforce dialog logic
  useEffect(() => {
    const checkSubscriptions = async () => {
      if (!selectedOrganisation) {
        setBlockContent(false);
        return;
      }

      let subs = selectedOrganisation.subscriptions || [];
      if (subs.length === 0) {
        await refreshSelectedOrganisation();
        subs = selectedOrganisation.subscriptions || [];
      }

      const hasPlatform = subs.some(
        (s) =>
          s.status === SubscriptionStatus.Active &&
          (s.productType === 1 ||
            s.productType === "Platform" ||
            s.productName?.toLowerCase().includes("platform"))
      );

      console.log("Subscription check:", { hasPlatform, subscriptions: subs });
      
      if (hasPlatform) {
        setBlockContent(false);
        if (isDialogOpen) {
          completeFlow();
        }
        closeDialog();
      } else {
        openDialog(2);
        setBlockContent(true);
      }
    };
    
    checkSubscriptions();
  }, [selectedOrganisation?.id, isDialogOpen]);

  // Load payment flow state
  useEffect(() => {
    if (selectedOrganisation) {
      setOrganizationData(selectedOrganisation.id, selectedOrganisation.name);
      loadFromDatabase(selectedOrganisation.id).catch(console.error);
    }
  }, [selectedOrganisation]);

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      closeDialog();
    }
  };

  return (
    <div className="w-full h-full">
      {blockContent ? (
        <div className="flex flex-col items-center justify-center h-full p-6">
          <div className="max-w-2xl w-full space-y-6">
            {/* Main Alert */}
            <Alert className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 dark:border-orange-800 dark:from-orange-950 dark:to-amber-950">
              <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              <AlertTitle className="text-orange-800 dark:text-orange-200 text-lg font-semibold">
                Subscription Required
              </AlertTitle>
              <AlertDescription className="text-orange-700 dark:text-orange-300">
                <div className="space-y-3 mt-2">
                  <p className="text-base">
                    Your organization requires active Platform and Support
                    subscriptions to access all features.
                  </p>
                  <p className="text-sm">
                    Complete the payment process to unlock your organization's
                    full potential.
                  </p>
                </div>
              </AlertDescription>
            </Alert>

            {/* Feature Card */}
            <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:border-blue-800 dark:from-blue-950 dark:to-indigo-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                  <Zap className="h-5 w-5" />
                  What You'll Get
                </CardTitle>
                <CardDescription className="text-blue-700 dark:text-blue-300">
                  Unlock these powerful features with your subscription
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200">
                      Platform Features
                    </h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• Advanced sensor analytics</li>
                      <li>• Real-time monitoring</li>
                      <li>• Custom dashboards</li>
                      <li>• Data export capabilities</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200">
                      Support Benefits
                    </h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• Priority technical support</li>
                      <li>• Expert consultation</li>
                      <li>• Training resources</li>
                      <li>• Implementation assistance</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Card */}
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Complete Your Setup
                </CardTitle>
                <CardDescription>
                  The payment dialog will guide you through the subscription
                  process
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      ) : (
        <OrganizationComponent activeComponent={component} />
      )}

      <CreateOrganisationDialog
        open={isDialogOpen}
        onOpenChange={handleDialogOpenChange}
        onComplete={() => handleDialogOpenChange(false)}
      />
    </div>
  );
}