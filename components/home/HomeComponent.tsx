"use client"
import { useState, useEffect, useMemo } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  Wifi,
  Package,
  ExternalLink,
  ArrowRight,
  Loader2,
  Building2,
  Users,
  Star,
  HeadphonesIcon,
  Trophy,
  CreditCard,
  AlertCircle,
  Rocket,
  Check
} from "lucide-react";

// Type definitions
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

export enum ProductType {
  Products = 0,
  Platform = 1
}

export enum OrganisationState {
  Inactive = 0,
  Active = 1,
  Disabled = 2
}

export enum AccountStatus {
  Pending = 0,
  Active = 1,
  Suspended = 2,
  Removed = 3
}

export interface SubscriptionResponse {
  id: number;
  productName: string;
  status: SubscriptionStatus;
  billingCycle: BillingCycle;
  productType: number | string;
  price: number;
  currency: string;
  nextPaymentDate: string;
  initiationDate: string;
  cancellationDate?: string;
}

export interface ModuleAttributes {
  urlLive: string;
  urlLocal: string;
}

export interface ModuleResponse {
  id: string;
  name: string;
  description: string;
  attributes: ModuleAttributes;
  createdBy: string;
  createdAt: string;
  modifiedBy: string;
  modifiedAt: string;
}

export interface OrganisationResponse {
  id: number;
  name: string;
  organisationStatus: OrganisationState;
  createdAt: string;
  modules: ModuleResponse[];
  isOwner: boolean;
  userStatus: AccountStatus;
  subscriptions: SubscriptionResponse[];
  hasActiveSubscription: boolean;
}

// Mock data
const mockModules = [
  {
    id: "1",
    name: "IoT Dashboard Pro",
    description: "Advanced IoT monitoring dashboard with real-time analytics, customizable widgets, and comprehensive device management capabilities.",
    attributes: {
      urlLive: "iot-dashboard.smartsensorflow.com",
      urlLocal: "localhost:3001",
    },
    createdBy: "Smart Sensor Flow",
    createdAt: "2024-01-15T10:00:00Z",
    modifiedBy: "Smart Sensor Flow",
    modifiedAt: "2025-01-01T10:00:00Z"
  },
  {
    id: "2",
    name: "Environmental Analytics",
    description: "Comprehensive environmental monitoring solution with AI-powered insights, predictive analytics, and automated reporting.",
    attributes: {
      urlLive: "env-analytics.smartsensorflow.com",
      urlLocal: "localhost:3002",
    },
    createdBy: "EcoTech Solutions",
    createdAt: "2024-02-10T14:30:00Z",
    modifiedBy: "EcoTech Solutions", 
    modifiedAt: "2024-03-15T09:20:00Z",
  },
  {
    id: "3",
    name: "Industrial Monitoring Suite",
    description: "Enterprise-grade industrial monitoring platform with advanced alerting, compliance tracking, and performance optimization.",
    attributes: {
      urlLive: "industrial.smartsensorflow.com",
      urlLocal: "localhost:3003",
    },
    createdBy: "IndustrialTech Corp",
    createdAt: "2024-01-25T09:15:00Z",
    modifiedBy: "IndustrialTech Corp",
    modifiedAt: "2024-03-10T16:45:00Z",
  }
];

const mockSubscriptions = [
  {
    id: 101,
    productName: "Platform Pro",
    status: SubscriptionStatus.Active,
    billingCycle: BillingCycle.Monthly,
    productType: ProductType.Platform,
    price: 99.99,
    currency: "USD",
    nextPaymentDate: "2025-09-19",
    initiationDate: "2025-01-19",
  },
  {
    id: 102,
    productName: "Products Basic",
    status: SubscriptionStatus.Active,
    billingCycle: BillingCycle.Monthly,
    productType: ProductType.Products,
    price: 29.99,
    currency: "USD",
    nextPaymentDate: "2025-09-15",
    initiationDate: "2024-09-15",
  }
];

const mockOrganisations = [
  {
    id: 1,
    name: "TechCorp Solutions",
    organisationStatus: OrganisationState.Active,
    createdAt: "2024-01-15T10:00:00Z",
    modules: [mockModules[0], mockModules[2]],
    isOwner: true,
    userStatus: AccountStatus.Active,
    subscriptions: mockSubscriptions,
    hasActiveSubscription: true
  }
];

// Partner Dialog Component
const PartnerDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  const benefits = [
    {
      icon: HeadphonesIcon,
      title: "24/7 Priority Support",
      description: "Get dedicated support with faster response times"
    },
    {
      icon: Trophy,
      title: "Revenue Share Program", 
      description: "Earn revenue from successful client referrals"
    },
    {
      icon: Star,
      title: "Marketplace Access",
      description: "Get featured in our partner marketplace"
    },
    {
      icon: Users,
      title: "Success Team Access",
      description: "Work directly with our customer success experts"
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side: Content */}
          <div className="p-6 md:p-8 flex flex-col">
            <div className="text-left mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Join Our Partner Program
              </h2>
              <p className="text-base pt-3 text-gray-600 dark:text-gray-400">
                Unlock exclusive benefits designed for agencies and freelancers who want to grow with us.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4 my-6 flex-1">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.title} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Users className="h-4 w-4 mr-2" />
                Become a Partner
              </Button>
              <Button variant="outline" className="flex-1">
                <Star className="h-4 w-4 mr-2" />
                View All Benefits
              </Button>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-left">
                By joining, you accept our Partner Program Terms. Benefits vary by partner level and performance.
              </p>
            </div>
          </div>

          {/* Right Side: Visual */}
          <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 dark:from-blue-950 dark:via-purple-950 dark:to-indigo-950 p-8">
            <div className="relative w-full h-full max-w-sm">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm"></div>
              
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mb-6">
                  <Users className="h-10 w-10 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  Join 500+ Partners
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Trusted by agencies and freelancers worldwide to deliver exceptional results.
                </p>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">500+</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Partners</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">98%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Satisfaction</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

// Active Component
const ActiveComponent = () => {
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOrganisation] = useState(mockOrganisations[0]);
  const [showPartnerDialog, setShowPartnerDialog] = useState(false);

  useEffect(() => {
    const fetchModules = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setModules(mockModules);
      } catch (err) {
        setError("Failed to fetch modules");
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, []);

  const handleAddModule = async (module) => {
    console.log(`Adding module ${module.id} to organization`);
  };

  const handleOpenModule = (module) => {
    console.log(`Opening module: ${module.name}`);
  };

  const featuredModules = modules.slice(0, 3);

  const categories = [
    { name: "All Modules", count: modules.length, icon: Package },
    { name: "Analytics", count: modules.filter((m) => m.name.toLowerCase().includes("analytic")).length, icon: BarChart3 },
    { name: "Monitoring", count: modules.filter((m) => m.name.toLowerCase().includes("monitor")).length, icon: Shield },
    { name: "Integration", count: modules.filter((m) => m.name.toLowerCase().includes("integrat")).length, icon: Wifi },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading modules...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Error loading modules: {error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Organization Status */}
      {selectedOrganisation && (
        <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <Building2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            <div className="flex items-center justify-between">
              <div>
                <strong>{selectedOrganisation.name}</strong> is active with {selectedOrganisation.modules.length} modules installed.
              </div>
              <Badge className="bg-green-100 text-green-800 border-0">
                {selectedOrganisation.modules.length} Modules
              </Badge>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Partner Program Banner */}
      <Alert className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 dark:border-purple-700 dark:from-purple-950 dark:to-pink-950">
        <Trophy className="h-5 w-5 text-purple-600" />
        <div>
          <AlertTitle className="text-purple-800 dark:text-purple-200 text-lg font-semibold">
            🤝 Join Our Partner Program
          </AlertTitle>
          <AlertDescription className="text-purple-700 dark:text-purple-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
              <div>
                <p className="text-base mb-2">
                  Share your sensor modules, earn revenue, and get access to exclusive benefits including 24/7 priority support and marketplace features.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-purple-300 text-purple-700">
                    <HeadphonesIcon className="w-3 h-3 mr-1" />
                    Priority Support
                  </Badge>
                  <Badge variant="outline" className="border-purple-300 text-purple-700">
                    <Star className="w-3 h-3 mr-1" />
                    Revenue Share
                  </Badge>
                </div>
              </div>
              <Button 
                onClick={() => setShowPartnerDialog(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Users className="h-4 w-4 mr-2" />
                Join Now
              </Button>
            </div>
          </AlertDescription>
        </div>
      </Alert>

      {/* Categories Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.name}
                className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105 border border-gray-200 dark:border-gray-700"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{category.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {category.count} modules
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Featured Modules */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {featuredModules.length > 0 ? "Featured Modules" : "Available Modules"}
          </h2>
          {modules.length > 3 && (
            <Button variant="outline">
              View All ({modules.length})
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
        
        {featuredModules.length === 0 ? (
          <Card className="p-12 text-center border border-gray-200 dark:border-gray-700">
            <Package className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">No Modules Available</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Check back later for new modules to enhance your Smart Sensor Flow experience.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredModules.map((module) => {
              const isOwned = selectedOrganisation?.modules.some(
                (orgModule) => orgModule.id === module.id
              ) || false;

              return (
                <Card
                  key={module.id}
                  className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-200 dark:border-gray-700"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                          <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg leading-tight">
                            {module.name}
                          </CardTitle>
                          <Badge
                            className={
                              isOwned
                                ? "bg-green-100 text-green-800 hover:bg-green-200 mt-2 border-0"
                                : "mt-2 border border-gray-300"
                            }
                          >
                            {isOwned ? "✓ Installed" : "Available"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="mt-3 text-sm leading-relaxed">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Module Details */}
                      <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p>• Created by {module.createdBy}</p>
                        <p>• Released {new Date(module.createdAt).toLocaleDateString()}</p>
                        {module.attributes.urlLive && (
                          <p className="text-blue-600 dark:text-blue-400">• Live deployment ready</p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {isOwned ? (
                          <Button
                            onClick={() => handleOpenModule(module)}
                            className="flex-1"
                            disabled={!module.attributes.urlLive}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Launch Module
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleAddModule(module)}
                            className="flex-1"
                            disabled={!selectedOrganisation}
                          >
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Install Module
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Coming Soon Section */}
      <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-950 dark:via-pink-950 dark:to-indigo-950 border-purple-200 dark:border-purple-800">
        <CardHeader className="text-center pb-4">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl text-purple-800 dark:text-purple-200">
            More Modules Coming Soon!
          </CardTitle>
          <CardDescription className="text-purple-700 dark:text-purple-300 text-base max-w-2xl mx-auto">
            We're constantly expanding our module library with exciting new additions including 
            AI-powered analytics, advanced IoT integrations, and custom enterprise solutions.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-purple-300 text-purple-800 hover:bg-purple-100 dark:border-purple-700 dark:text-purple-200 dark:hover:bg-purple-900"
          >
            <Star className="h-4 w-4 mr-2" />
            Get Notified About New Modules
          </Button>
        </CardContent>
      </Card>

      <PartnerDialog 
        isOpen={showPartnerDialog} 
        onClose={() => setShowPartnerDialog(false)} 
      />
    </div>
  );
};

// Inactive Component
const InactiveComponent = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
  
  const selectedOrganisation = null; // Simulating no active subscription
  const organisations = [
    {
      id: 1,
      name: "TechCorp Solutions",
      hasActiveSubscription: false,
    }
  ];

  const showInactiveOrgUI = organisations.length > 0 && !selectedOrganisation;
  const orgToUpgrade = organisations[0];

  const handleCreateComplete = () => {
    setIsCreateDialogOpen(false);
    console.log("Organization created");
  };

  const handleUpgradeComplete = () => {
    setIsUpgradeDialogOpen(false);
    console.log("Organization upgraded");
  };

  const handleContinueSetup = () => {
    setIsUpgradeDialogOpen(true);
  };

  const handleCreateOrganization = () => {
    setIsCreateDialogOpen(true);
  };

  return (
    <div className="min-h-[60vh] w-full flex justify-center items-center p-6">
      <div className="w-full max-w-3xl space-y-6">
        {/* Show banner for inactive organizations */}
        {showInactiveOrgUI && orgToUpgrade && (
          <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800 dark:text-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <strong>{orgToUpgrade.name}</strong> is inactive. Subscribe to a plan to activate all features.
                </div>
                <Button 
                  onClick={handleContinueSetup}
                  size="sm" 
                  className="ml-4 bg-orange-600 hover:bg-orange-700 text-white"
                >
                  Activate Now
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Card className="border-2 border-dashed border-gray-200 dark:border-gray-700">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
              <Rocket className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-2xl font-bold">
              {showInactiveOrgUI
                ? "Activate Your Organization"
                : "Welcome to Smart Sensor Flow"}
            </CardTitle>
            <CardDescription className="text-base max-w-md mx-auto">
              {showInactiveOrgUI
                ? "Your organization is ready to go! Choose a subscription plan to unlock all features."
                : "Get started by creating your organization and choosing a plan that fits your needs."}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {showInactiveOrgUI ? "Your Organization" : "Create Organization"}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {showInactiveOrgUI
                      ? `${orgToUpgrade?.name} is ready for activation`
                      : "Set up your organization profile and preferences"}
                  </p>
                </div>
              </div>

              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Choose Your Plan</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Select a subscription plan that matches your requirements
                  </p>
                </div>
              </div>

              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Start Building</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Invite your team and start managing your IoT infrastructure
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {showInactiveOrgUI ? (
                <div className="space-y-3">
                  <Button
                    onClick={handleContinueSetup}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <Rocket className="h-4 w-4 mr-2" />
                    Activate {orgToUpgrade?.name}
                  </Button>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline">
                      View Pricing
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    onClick={handleCreateOrganization}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <Building2 className="h-4 w-4 mr-2" />
                    Create Your Organization
                  </Button>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline">
                      View Pricing Plans
                    </Button>
                  </div>
                </div>
              )}
              
              <p className="text-xs text-gray-500 dark:text-gray-400">
                🎉 Start with our free trial • No credit card required • Cancel anytime
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help getting started?{" "}
            <button className="text-blue-600 hover:underline font-medium">
              Visit our help center
            </button>{" "}
            or{" "}
            <button className="text-blue-600 hover:underline font-medium">
              contact support
            </button>
          </p>
        </div>

        {/* Mock Dialogs */}
        {isCreateDialogOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Create Organization</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Set up your new organization to get started.
              </p>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateComplete}>
                  Create
                </Button>
              </div>
            </div>
          </div>
        )}

        {isUpgradeDialogOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Upgrade Organization</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Choose a subscription plan to activate your organization.
              </p>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setIsUpgradeDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpgradeComplete}>
                  Continue to Payment
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Home Component
const SmartSensorHome = () => {
  const [organisations, setOrganisations] = useState([]);
  const [selectedOrganisation, setSelectedOrganisation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock store hook
  useEffect(() => {
    const loadOrganisations = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setOrganisations(mockOrganisations);
      setSelectedOrganisation(mockOrganisations[0]);
      setLoading(false);
    };

    loadOrganisations();
  }, []);

  // Check if the selected organization has an active subscription
  const hasActivePayingAccess = useMemo(() => {
    if (loading) {
      return false;
    }

    if (selectedOrganisation) {
      return selectedOrganisation.hasActiveSubscription;
    }

    return organisations.some((org) => org.hasActiveSubscription);
  }, [selectedOrganisation, organisations, loading]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading your organizations...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
   

      {/* Welcome Section */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Welcome <span className="text-blue-600">Carel Herbst</span>
            </h1>
          </div>
          
          {/* Module Marketplace Header */}
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Smart Sensor Module Marketplace
            </h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 max-w-4xl mb-4">
            Discover and integrate cutting-edge sensor modules to enhance your Smart Sensor Flow experience. From environmental monitoring to industrial automation, find the perfect modules for your needs.
          </p>
          
          {/* Feature Badges */}
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-0">
              <Zap className="w-3 h-3 mr-1" />
              Easy Integration
            </Badge>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-0">
              <Shield className="w-3 h-3 mr-1" />
              Enterprise Ready
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-0">
              <BarChart3 className="w-3 h-3 mr-1" />
              Real-time Analytics
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {hasActivePayingAccess ? <ActiveComponent /> : <InactiveComponent />}
      </div>
    </div>
  );
};

export default SmartSensorHome;