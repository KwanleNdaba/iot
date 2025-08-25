"use client";
import { FC, useState } from "react";
import { Package, Store } from "lucide-react";
import { toast } from "sonner";
import ModuleCard from "./ModuleCard";
import ProductSelectionDialog from "./ProductSelectionDialog";
import { ModuleWithProducts, Organisation, ProductResponse } from "@/interfaces/product";
import { mockSelectedOrganisation } from "./data";
import { useModulesData } from "@/hooks/useModulesData";

const AllProductsComponent: FC = () => {
  const [purchasingProductId, setPurchasingProductId] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<ModuleWithProducts | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Mock organization store state
  const [selectedOrganisation] = useState<Organisation | null>(mockSelectedOrganisation);

  const { modules, isLoading, error } = useModulesData();

  const handlePurchaseProduct = async (product: ProductResponse) => {
    if (!selectedOrganisation) {
      toast.error("Please select an organization first");
      return;
    }

    setPurchasingProductId(product.id);
    try {
      // Simulate payment initialization
      
      // Mock payment URL
      const mockPaymentUrl = `https://payment.smartsensorflow.com/pay?product=${product.id}&org=${selectedOrganisation.id}`;
      
      console.log("Opening payment page:", mockPaymentUrl);
      toast.success(
        `Payment initialized for ${product.name} plan. Complete your payment to activate your subscription.`
      );

      // Close the dialog
      setIsDialogOpen(false);
      setSelectedModule(null);

      // Simulate navigation to My Products tab
      setTimeout(() => {
        console.log("Navigating to My Products");
        toast.success("Redirecting to My Products...");
      }, 2000);
    } catch (error) {
      toast.error("Failed to initialize payment. Please try again.");
      console.error("Payment initialization error:", error);
    } finally {
      setPurchasingProductId(null);
    }
  };

  const handleViewProducts = (module: ModuleWithProducts) => {
    setSelectedModule(module);
    setIsDialogOpen(true);
  };

  const isModuleOwned = (moduleId: string): boolean => {
    return selectedOrganisation?.modules.some(
      (orgModule) => orgModule.id === moduleId
    ) || false;
  };


  if (modules.length === 0) {
    return (
      <div className="w-full max-w-none">
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                <Store className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  All Products
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  No modules available at this time
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-8 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-4">
                <Package className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No modules available
              </h3>
              <p className="text-sm text-gray-600">
                We're currently preparing our product catalog. Please check back soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const availableCount = modules.filter(module => !isModuleOwned(module.id)).length;
  const ownedCount = modules.filter(module => isModuleOwned(module.id)).length;

  return (
    <div className="w-full max-w-none">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                <Store className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  All Products
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  Discover and subscribe to professional modules for your organization
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{availableCount}</div>
                <div className="text-xs text-gray-500">Available</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">{ownedCount}</div>
                <div className="text-xs text-gray-500">Subscribed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg flex-shrink-0">
              <Store className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-900 mb-1">
                Professional IoT & Analytics Solutions
              </h3>
              <p className="text-sm text-blue-800">
                All modules are designed for enterprise use with 99.9% uptime, advanced security, 
                and 24/7 support. Start with any plan and upgrade as your needs grow.
              </p>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {modules.map((module) => {
            const isOwned = isModuleOwned(module.id);

            return (
              <ModuleCard
                key={module.id}
                module={module}
                isOwned={isOwned}
                onViewProducts={handleViewProducts}
                selectedOrganisation={selectedOrganisation}
              />
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center text-sm text-gray-600">
            <div>
              <div className="font-semibold text-gray-900">30-Day Free Trial</div>
              <div>Test any module risk-free</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">Cancel Anytime</div>
              <div>No long-term commitments</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">Enterprise Ready</div>
              <div>99.9% uptime guarantee</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">Expert Support</div>
              <div>24/7 technical assistance</div>
            </div>
          </div>
        </div>
      </div>

      <ProductSelectionDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedModule(null);
        }}
        selectedModule={selectedModule}
        onPurchaseProduct={handlePurchaseProduct}
        purchasingProductId={purchasingProductId}
        selectedOrganisation={selectedOrganisation}
      />
    </div>
  );
};

export default AllProductsComponent;