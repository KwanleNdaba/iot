"use client";
import { FC, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, ArrowRight, Mail, Shield, Clock, Users } from "lucide-react";
import { toast } from "sonner";

// Types
export enum ProductType {
  Products = "Products",
  Platform = "Platform"
}

export interface ProductAttributesProducts {
  features?: string[];
  gateways?: string;
  assets?: string;
  dataPoints?: string;
  support?: boolean;
  whiteLabel?: boolean;
}

export interface ProductAttributesPlatform {
  userLimit?: number;
  supportChannels?: string[];
  responseSLA?: string;
  knowledgeBaseAccess?: boolean;
  proactiveMonitoring?: boolean;
  businessReviews?: boolean;
  onDemandTraining?: boolean;
  dedicatedAccountManager?: boolean;
}

export interface ProductResponse {
  id: number;
  planID: string;
  name: string;
  price: string;
  type: ProductType;
  description: string;
  attributes: ProductAttributesPlatform | ProductAttributesProducts;
}

// Mock data
const mockProducts: ProductResponse[] = [
  {
    id: 1,
    planID: "basic-plan",
    name: "Starter",
    price: "$29/month",
    type: ProductType.Products,
    description: "Perfect for small projects and individual developers getting started with IoT",
    attributes: {
      gateways: "2",
      assets: "10",
      dataPoints: "10,000",
      support: true,
      whiteLabel: false,
      features: ["Real-time monitoring", "Basic analytics", "Email notifications"]
    }
  },
  {
    id: 2,
    planID: "professional-plan",
    name: "Professional",
    price: "$99/month",
    type: ProductType.Platform,
    description: "Ideal for growing businesses and development teams",
    attributes: {
      userLimit: 25,
      supportChannels: ["Email", "Chat", "Phone"],
      responseSLA: "24 hours",
      knowledgeBaseAccess: true,
      proactiveMonitoring: true,
      businessReviews: false,
      onDemandTraining: false,
      dedicatedAccountManager: false
    }
  },
  {
    id: 3,
    planID: "enterprise-plan",
    name: "Enterprise",
    price: "$299/month",
    type: ProductType.Platform,
    description: "Comprehensive solution for large organizations and enterprises",
    attributes: {
      userLimit: 100,
      supportChannels: ["Email", "Chat", "Phone", "Dedicated Support"],
      responseSLA: "4 hours",
      knowledgeBaseAccess: true,
      proactiveMonitoring: true,
      businessReviews: true,
      onDemandTraining: true,
      dedicatedAccountManager: true
    }
  },
  {
    id: 4,
    planID: "premium-products",
    name: "Premium",
    price: "$199/month",
    type: ProductType.Products,
    description: "Advanced features and capabilities for power users and large deployments",
    attributes: {
      gateways: "Unlimited",
      assets: "1,000",
      dataPoints: "1,000,000",
      support: true,
      whiteLabel: true,
      features: ["Advanced analytics", "Custom dashboards", "API access", "Priority support"]
    }
  }
];

const PricingComponent: FC = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoadingProducts(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(mockProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Failed to load subscription plans. Please try again.");
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const parsePrice = (priceString: string) => {
    const match = priceString.match(/^\$(\d+)\/(.+)$/);
    return match ? { amount: match[1], period: match[2] } : { amount: priceString, period: "" };
  };

  const renderFeatures = (product: ProductResponse) => {
    const features: string[] = [];

    if (product.type === ProductType.Platform) {
      const attrs = product.attributes as ProductAttributesPlatform;
      if (attrs.userLimit) features.push(`Up to ${attrs.userLimit} team members`);
      if (attrs.supportChannels) features.push(`${attrs.supportChannels.length} support channels`);
      if (attrs.responseSLA) features.push(`${attrs.responseSLA} response time`);
      if (attrs.knowledgeBaseAccess) features.push("Knowledge base access");
      if (attrs.proactiveMonitoring) features.push("Proactive monitoring");
      if (attrs.businessReviews) features.push("Quarterly business reviews");
      if (attrs.onDemandTraining) features.push("On-demand training sessions");
      if (attrs.dedicatedAccountManager) features.push("Dedicated account manager");
    } else {
      const attrs = product.attributes as ProductAttributesProducts;
      if (attrs.gateways) features.push(`${attrs.gateways} IoT gateways`);
      if (attrs.assets) features.push(`${attrs.assets} connected assets`);
      if (attrs.dataPoints) features.push(`${attrs.dataPoints} data points/month`);
      if (attrs.support) features.push("Technical support included");
      if (attrs.whiteLabel) features.push("White-label solution");
      if (attrs.features) features.push(...attrs.features);
    }

    return features;
  };

  if (isLoadingProducts) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-12 bg-gray-200 rounded-lg mx-auto w-64"></div>
              <div className="h-6 bg-gray-200 rounded mx-auto w-96"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-96 bg-white rounded-xl shadow-sm"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const popularPlan = products.find(p => p.name.toLowerCase() === "professional");

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Simple, Transparent Pricing
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Choose the Perfect Plan for Your Business
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Start free, scale as you grow. No hidden fees, no surprises. 
            Cancel or upgrade anytime with our flexible pricing plans.
          </p>
          
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              <span>30-day money back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-700" />
              <span>24/7 customer support</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
          {products.map((product) => {
            const isPopular = product.id === popularPlan?.id;
            const { amount, period } = parsePrice(product.price);
            const features = renderFeatures(product);

            return (
              <Card
                key={product.id}
                className={`relative transition-all duration-300 hover:shadow-xl ${
                  isPopular
                    ? "ring-2 ring-blue-500 shadow-2xl scale-105 bg-white"
                    : "border border-gray-200 bg-white hover:shadow-lg"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-2">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold text-gray-900">${amount}</span>
                      <span className="text-gray-500">/{period}</span>
                    </div>
                    <CardDescription className="text-gray-600 leading-relaxed px-2">
                      {product.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  <ul className="space-y-4 mb-8">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full py-3 font-semibold transition-all duration-200 ${
                      isPopular
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                    size="lg"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {isPopular && (
                    <p className="text-center text-sm text-blue-600 font-medium mt-3">
                      Save 25% vs monthly billing
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>



        {/* Trust Indicators */}
        <div className="text-center mt-16 space-y-6">
          <p className="text-gray-500 text-sm">Trusted by 10,000+ companies worldwide</p>
          <div className="flex items-center justify-center space-x-8 text-xs text-gray-400">
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-500" />
              SOC 2 Type II Certified
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              GDPR Compliant
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-700" />
              99.9% Uptime SLA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingComponent;