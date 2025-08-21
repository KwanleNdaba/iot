"use client";
import { mockSubscriptions } from "@/components/products/my-products/data";
import { Organisation, SubscriptionResponse } from "@/interfaces/product";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const useProductsData = (selectedOrganisation: Organisation | null) => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSubscriptions = async () => {
    if (!selectedOrganisation) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Filter to only show Products subscriptions that are ACTIVE or NonRenewing
      const moduleSubscriptions = mockSubscriptions.filter(
        (sub) =>
          sub.productType === 0 && 
          (sub.status === "Active" || sub.status === "NonRenewing")
      );
      setSubscriptions(moduleSubscriptions);
    } catch (error) {
      console.error("Failed to fetch subscriptions:", error);
      toast.error("Failed to load subscriptions");
    } finally {
      setIsLoading(false);
    }
  };

  const removeSubscription = (subscriptionId: number) => {
    setSubscriptions(prev => prev.filter(sub => sub.id !== subscriptionId));
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [selectedOrganisation]);

  return {
    subscriptions,
    isLoading,
    refetchSubscriptions: fetchSubscriptions,
    removeSubscription,
  };
};