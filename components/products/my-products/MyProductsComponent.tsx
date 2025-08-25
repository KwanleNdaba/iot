"use client";
import { FC, useState } from "react";
import { Package } from "lucide-react";
import { toast } from "sonner";
import Loader from "@/components/ui/loader";
import ProductsSummary from "./ProductsSummary";
import EmptyState from "./EmptyState";
import SubscriptionCard from "./SubscriptionCard";
import CancelSubscriptionDialog from "./CancelSubscriptionDialog";
import { Module, Organisation, SubscriptionResponse } from "@/interfaces/product";
import { mockSelectedOrganisation } from "./data";
import { useProductsData } from "@/hooks/useProductsData";

const MyProductsComponent: FC = () => {
  const [selectedOrganisation] = useState<Organisation | null>(mockSelectedOrganisation);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [subscriptionToCancel, setSubscriptionToCancel] = useState<SubscriptionResponse | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const {
    subscriptions,
    isLoading,
    removeSubscription,
  } = useProductsData(selectedOrganisation);

  const handleModuleClick = (module: Module) => {
    if (module.attributes.urlLive) {
      console.log(`Opening module: https://${module.attributes.urlLive}`);
      toast.success(`Opening ${module.name} module`);
    }
  };

  const handleCancelClick = (subscription: SubscriptionResponse) => {
    setSubscriptionToCancel(subscription);
    setShowCancelDialog(true);
  };

  const handleCancelSubscription = async () => {
    if (!selectedOrganisation || !subscriptionToCancel) return;

    setIsCancelling(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Remove cancelled subscription from list
      removeSubscription(subscriptionToCancel.id);
      
      toast.success(`${subscriptionToCancel.productName} subscription cancelled successfully`);
      setShowCancelDialog(false);
      setSubscriptionToCancel(null);
    } catch (error) {
      toast.error("Failed to cancel subscription");
      console.error("Cancel subscription error:", error);
    } finally {
      setIsCancelling(false);
    }
  };

  const findModuleForSubscription = (subscription: SubscriptionResponse): Module | undefined => {
    if (!selectedOrganisation) return undefined;
    
    return selectedOrganisation.modules.find((m) => {
      // Try exact match first
      if (m.name === subscription.productName) return true;

      // Try case-insensitive match
      if (m.name.toLowerCase() === subscription.productName.toLowerCase()) return true;

      // Try partial matches for common variations
      const moduleName = m.name.toLowerCase();
      const productName = subscription.productName.toLowerCase();

      // Handle common naming patterns
      return moduleName.includes(productName) || productName.includes(moduleName);
    });
  };

  const totalMonthlyCost = subscriptions
    .filter(sub => sub.status === "Active")
    .reduce((sum, sub) => sum + sub.price, 0);

  if (!selectedOrganisation) {
    return (
      <div className="w-full max-w-none">
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                <Package className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  My Products
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  Please select an organization to view your products
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-none">
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                <Package className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  My Products
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  Loading subscriptions for {selectedOrganisation.name}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-center items-center h-64">
            <Loader text="Loading subscriptions..." />
          </div>
        </div>
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <div className="w-full max-w-none">
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                <Package className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  My Products
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  No active subscriptions for {selectedOrganisation.name}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <EmptyState
            title="No module subscriptions found"
            description="Browse all products to subscribe to modules and get started with your organization."
            actionText="Browse Products"
            onAction={() => toast.info("Navigate to products page")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-none">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                <Package className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  My Products
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  {subscriptions.length} active subscriptions for {selectedOrganisation.name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(totalMonthlyCost)}
                </div>
                <div className="text-xs text-gray-500">monthly total</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Summary Cards */}
        <ProductsSummary 
          subscriptions={subscriptions}
          totalMonthlyCost={totalMonthlyCost}
          currency="USD"
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {subscriptions.map((subscription) => {
            const module = findModuleForSubscription(subscription);
            
            return (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                module={module}
                onModuleClick={handleModuleClick}
                onCancelClick={handleCancelClick}
              />
            );
          })}
        </div>
      </div>

      <CancelSubscriptionDialog
        isOpen={showCancelDialog}
        onClose={() => {
          setShowCancelDialog(false);
          setSubscriptionToCancel(null);
        }}
        onConfirm={handleCancelSubscription}
        subscription={subscriptionToCancel}
        isCancelling={isCancelling}
      />
    </div>
  );
};

export default MyProductsComponent;