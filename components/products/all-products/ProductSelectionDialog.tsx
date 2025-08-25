"use client";
import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal, Badge, Alert, Spinner } from "flowbite-react";
import { Package, Shield, Clock, HeadphonesIcon, CheckCircle, Info } from "lucide-react";
import Loader from "@/components/ui/loader";
import PricingCard from "./PricingCard";
import { ProductSelectionDialogProps } from "@/interfaces/product";

const ProductSelectionDialog: FC<ProductSelectionDialogProps> = ({ 
  isOpen, 
  onClose, 
  selectedModule, 
  onPurchaseProduct, 
  purchasingProductId, 
  selectedOrganisation 
}) => {
  if (!selectedModule) return null;

  const getPopularPlanIndex = (planCount: number) => {
    if (planCount >= 3) return Math.floor(planCount / 2);
    if (planCount === 2) return 1;
    return -1;
  };

  const popularPlanIndex = getPopularPlanIndex(selectedModule.products.length);

  const benefits = [
    { icon: Shield, title: "30-Day Money Back", description: "Full refund if you're not satisfied" },
    { icon: CheckCircle, title: "Cancel Anytime", description: "No long-term contracts required" },
    { icon: HeadphonesIcon, title: "24/7 Support", description: "Expert help whenever you need it" }
  ];

  return (
    <Modal show={isOpen} onClose={onClose} size="md">
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-[30vw] bg-white rounded-2xl shadow-2xl overflow-hidden"
              style={{ minWidth: '1200px', maxHeight: '90vh' }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 p-2 text-gray-400 hover:text-gray-600 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Scrollable Content */}
              <div className="max-h-[90vh] overflow-y-auto p-8">
                {/* Header */}
                <div className="text-center space-y-4 pb-8">
                  <h2 className="text-4xl font-bold text-gray-900">
                    {selectedModule.name}
                  </h2>
                  
                  <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                    Choose the perfect plan for your {selectedModule.name.toLowerCase()} needs. 
                    All plans include our standard features with varying levels of access and support.
                  </p>
                  
                  <Alert color="info" className="max-w-3xl mx-auto">
                    <Info className="w-5 h-5" />
                    <div>
                      <span className="font-medium">Need a custom solution?</span> Contact us at{" "}
                      <a
                        href="mailto:info@smartsensorflow.com"
                        className="font-medium text-blue-600 hover:text-blue-800 underline"
                      >
                        info@smartsensorflow.com
                      </a>
                      {" "}for enterprise pricing and customized features.
                    </div>
                  </Alert>
                </div>

                {/* Content */}
                <div className="mt-8">
                  {selectedModule.productsLoading ? (
                    <div className="text-center py-20">
                      <Spinner size="xl" color="purple" className="mb-4" />
                      <p className="text-lg text-gray-600">Loading subscription plans...</p>
                    </div>
                  ) : selectedModule.products.length === 0 ? (
                    <div className="text-center py-20">
                      <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6">
                        <Package className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                        No Plans Available
                      </h3>
                      <p className="text-gray-600 max-w-lg mx-auto">
                        We're currently preparing subscription plans for this module. 
                        Please check back soon or contact our support team for updates.
                      </p>
                    </div>
                  ) : (
                    <div className={`grid gap-8 justify-center ${
                      selectedModule.products.length === 1
                        ? "grid-cols-1"
                        : selectedModule.products.length === 2
                          ? "grid-cols-1 lg:grid-cols-2"
                          : "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
                    }`}>
                      {selectedModule.products.map((product, index) => {
                        const isPopular = index === popularPlanIndex;
                        const isPurchasing = purchasingProductId === product.id;
                        
                        return (
                          <PricingCard
                            key={product.id}
                            product={product}
                            isPopular={isPopular}
                            onPurchase={onPurchaseProduct}
                            isPurchasing={isPurchasing}
                            disabled={!selectedOrganisation}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Footer Info */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    {benefits.map((benefit, index) => (
                      <div key={benefit.title} className="space-y-3">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto">
                          <benefit.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 text-lg">{benefit.title}</h4>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Trust Indicators */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                      <span className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>SSL Secured</span>
                      </span>
                      <span className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>GDPR Compliant</span>
                      </span>
                      <span className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>99.9% Uptime SLA</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
};

export default ProductSelectionDialog;