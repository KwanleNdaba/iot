"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Shield, 
  Clock, 
  Users, 
  Star,
  Check,
  ChevronDown,
  Menu,
  X,
  Zap,
  Database,
  BarChart3,
  Settings,
  Globe,
  Eye,
  Lock,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Activity,
  Cpu,
  Gauge,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import SignInCard from '@/components/auth/SignInCard';
import SignUpCard from '@/components/auth/SignUpCard';
import ForgotPasswordCard from '@/components/auth/ForgotPasswordCard';


enum ProductType {
  Products = "Products",
  Platform = "Platform"
}

interface ProductAttributesProducts {
  features?: string[];
  gateways?: string;
  assets?: string;
  dataPoints?: string;
  support?: boolean;
  whiteLabel?: boolean;
}

interface ProductAttributesPlatform {
  userLimit?: number;
  supportChannels?: string[];
  responseSLA?: string;
  knowledgeBaseAccess?: boolean;
  proactiveMonitoring?: boolean;
  businessReviews?: boolean;
  onDemandTraining?: boolean;
  dedicatedAccountManager?: boolean;
}

interface ProductResponse {
  id: number;
  planID: string;
  name: string;
  price: string;
  type: ProductType;
  description: string;
  attributes: ProductAttributesPlatform | ProductAttributesProducts;
}

// Mock data for pricing
const mockProducts: ProductResponse[] = [
  {
    id: 1,
    planID: "maker-plan",
    name: "Maker",
    price: "Free",
    type: ProductType.Products,
    description: "Perfect for hobbyists and small projects getting started with IoT",
    attributes: {
      gateways: "1",
      assets: "5",
      dataPoints: "1,000",
      support: false,
      whiteLabel: false,
      features: ["Basic dashboards", "Community support", "Real-time monitoring"]
    }
  },
  {
    id: 2,
    planID: "prototype-plan",
    name: "Prototype",
    price: "$49/month",
    type: ProductType.Products,
    description: "Ideal for prototyping and small business deployments",
    attributes: {
      gateways: "5",
      assets: "25",
      dataPoints: "50,000",
      support: true,
      whiteLabel: false,
      features: ["Advanced dashboards", "Email support", "API access", "Custom alerts"]
    }
  },
  {
    id: 3,
    planID: "business-plan",
    name: "Business",
    price: "$199/month",
    type: ProductType.Platform,
    description: "Comprehensive solution for growing businesses and enterprises",
    attributes: {
      userLimit: 100,
      supportChannels: ["Email", "Phone", "Chat"],
      responseSLA: "4 hours",
      knowledgeBaseAccess: true,
      proactiveMonitoring: true,
      businessReviews: true,
      onDemandTraining: true,
      dedicatedAccountManager: true
    }
  }
];

const SmartSensorFlowLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAuthTab, setActiveAuthTab] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Load products
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
    if (priceString === "Free") return { amount: "Free", period: "" };
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

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  // Navigation Component
  const Navigation = () => (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 flex items-center justify-center">
              <img src="/images/iot-logo.jpeg" className="w-[55%] opacity-70" alt="Smart Sensor Flow Logo" />
            </div>
            <span className="text-xl font-bold text-gray-900">Smart Sensor Flow</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#marketplace" className="text-gray-600 hover:text-blue-600 transition-colors">Marketplace</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={() => { setActiveAuthTab('signin'); setIsAuthModalOpen(true); }}>
              Sign In
            </Button>
            <Button onClick={() => { setActiveAuthTab('signup'); setIsAuthModalOpen(true); }}>
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <div className="py-4 space-y-2">
                <a href="#features" className="block px-4 py-2 text-gray-600 hover:text-blue-600">Features</a>
                <a href="#pricing" className="block px-4 py-2 text-gray-600 hover:text-blue-600">Pricing</a>
                <a href="#marketplace" className="block px-4 py-2 text-gray-600 hover:text-blue-600">Marketplace</a>
                <a href="#contact" className="block px-4 py-2 text-gray-600 hover:text-blue-600">Contact</a>
                <div className="px-4 pt-4 border-t border-gray-200 space-y-2">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => { setActiveAuthTab('signin'); setIsAuthModalOpen(true); setIsMenuOpen(false); }}>
                    Sign In
                  </Button>
                  <Button className="w-full" onClick={() => { setActiveAuthTab('signup'); setIsAuthModalOpen(true); setIsMenuOpen(false); }}>
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );

  // Auth Modal Component
  const AuthModal = () => {
    const handleForgotPassword = () => {
      setActiveAuthTab('forgot');
    };

    const handleBackToSignIn = () => {
      setActiveAuthTab('signin');
    };

    const handleCloseModal = () => {
      setIsAuthModalOpen(false);
      // Reset to signin tab when modal is closed
      setTimeout(() => setActiveAuthTab('signin'), 200);
    };

    const handleAuthSuccess = () => {
      handleCloseModal();
      // You can add navigation logic here
      // router.push('/organization'); // Example navigation
      toast.success('Welcome to Smart Sensor Flow!');
    };

    const renderAuthContent = () => {
      switch (activeAuthTab) {
        case 'signin':
          return <SignInCard onForgotPassword={handleForgotPassword} />;
        case 'signup':
          return <SignUpCard />;
        case 'forgot':
          return <ForgotPasswordCard onBackToSignIn={handleBackToSignIn} />;
        default:
          return <SignInCard onForgotPassword={handleForgotPassword} />;
      }
    };

    const renderTabSwitcher = () => {
      if (activeAuthTab === 'forgot') return null;

      return (
        <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setActiveAuthTab('signin')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeAuthTab === 'signin' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setActiveAuthTab('signup')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeAuthTab === 'signup' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign Up
          </button>
        </div>
      );
    };

    const renderFooterSwitcher = () => {
      if (activeAuthTab === 'forgot') return null;

      return (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {activeAuthTab === 'signin' 
              ? "Don't have an account? " 
              : "Already have an account? "
            }
            <button
              type="button"
              onClick={() => setActiveAuthTab(activeAuthTab === 'signin' ? 'signup' : 'signin')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {activeAuthTab === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      );
    };

    return (
      <AnimatePresence>
        {isAuthModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img src="/images/iot-logo.jpeg" className="w-[55%] opacity-70" alt="Smart Sensor Flow Logo" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">Smart Sensor Flow</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Body */}
              <div className="p-6">
                {renderTabSwitcher()}
                {renderAuthContent()}
                {renderFooterSwitcher()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Hero Section
  const HeroSection = () => (
    <section className="pt-24 pb-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp} className="space-y-8">
            <Badge variant="secondary" className="px-4 py-2">
              🚀 Open Source AIoT Platform
            </Badge>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Connect, Monitor, and 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Optimize</span> 
              Your IoT Infrastructure
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Smart Sensor Flow is an enterprise-grade AIoT platform that connects any device, 
              processes data in real-time, and delivers actionable insights through powerful 
              dashboards and AI-driven analytics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8"
                onClick={() => { setActiveAuthTab('signup'); setIsAuthModalOpen(true); }}
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button variant="outline" size="lg" className="px-8">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span>Real-time Processing</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-blue-500" />
                <span>Multi-Protocol Support</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">System Overview</h3>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Active Devices</span>
                    <span className="font-bold text-green-600">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Data Points/Min</span>
                    <span className="font-bold text-blue-600">45.2K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">System Health</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">99.9%</Badge>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Activity className="w-4 h-4" />
                    <span>Real-time Analytics Active</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Cpu className="w-4 h-4" />
                    <span>AI Models: 3 Running</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Database className="w-4 h-4" />
                    <span>Data Processing: Normal</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );

  // Features Section
  const FeaturesSection = () => {
    const features = [
      {
        icon: Globe,
        title: "Device Agnostic",
        description: "Connect to virtually any sensor or device using standard protocols (HTTP, MQTT, HL7)",
        color: "text-blue-600"
      },
      {
        icon: BarChart3,
        title: "Data Visualization",
        description: "Intuitive dashboards with real-time charts and interactive analytics",
        color: "text-green-600"
      },
      {
        icon: Gauge,
        title: "SCADA Integration",
        description: "Robust monitoring and control for industrial processes and automation",
        color: "text-purple-600"
      },
      {
        icon: Settings,
        title: "Business Process Engine",
        description: "Visual no-code tool for creating automated workflows and alerts",
        color: "text-orange-600"
      },
      {
        icon: Cpu,
        title: "Multi-AI Modeling",
        description: "Text, image, and voice model integration with natural language queries",
        color: "text-indigo-600"
      },
      {
        icon: Shield,
        title: "Enterprise Security",
        description: "SOC 2 Type II certified with end-to-end encryption and role-based access",
        color: "text-red-600"
      }
    ];

    return (
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Platform Features</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Everything You Need for IoT Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From device connectivity to AI-powered analytics, Smart Sensor Flow provides 
              a complete platform for modern IoT deployments.
            </p>
          </motion.div>

          <motion.div variants={staggerChildren} {...fadeInUp} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-blue-200"
              >
                <div className={`w-12 h-12 ${feature.color} bg-opacity-10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  };

  // Pricing Section (Enhanced)
  const PricingSection = () => (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <motion.div {...fadeInUp} className="text-center max-w-4xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Simple, Transparent Pricing
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Choose the Perfect Plan for Your Business
          </h2>
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
        </motion.div>

        {isLoadingProducts ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-white rounded-xl shadow-sm animate-pulse"></div>
            ))}
          </div>
        ) : (
          <motion.div 
            variants={staggerChildren}
            {...fadeInUp}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16"
          >
            {products.map((product, index) => {
              const isPopular = product.name.toLowerCase() === "prototype";
              const { amount, period } = parsePrice(product.price);
              const features = renderFeatures(product);

              return (
                <motion.div
                  key={product.id}
                  variants={fadeInUp}
                  className={`relative transition-all duration-300 hover:shadow-xl ${
                    isPopular
                      ? "ring-2 ring-blue-500 shadow-2xl scale-105"
                      : "hover:shadow-lg"
                  }`}
                >
                  <Card className="h-full bg-white">
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
                          {amount === "Free" ? (
                            <span className="text-5xl font-bold text-gray-900">Free</span>
                          ) : (
                            <>
                              <span className="text-5xl font-bold text-gray-900">${amount}</span>
                              <span className="text-gray-500">/{period}</span>
                            </>
                          )}
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
                        onClick={() => { setActiveAuthTab('signup'); setIsAuthModalOpen(true); }}
                      >
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>

                      {isPopular && (
                        <p className="text-center text-sm text-blue-600 font-medium mt-3">
                          Perfect for growing businesses
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        <motion.div {...fadeInUp} className="text-center mt-16 space-y-6">
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
        </motion.div>
      </div>
    </section>
  );

  // Marketplace Section
  const MarketplaceSection = () => {
    const modules = [
      {
        name: "Asset Management",
        description: "Track and manage physical assets with real-time monitoring and lifecycle tracking",
        provider: "Industrial Solutions Inc.",
        icon: Database,
        color: "bg-blue-100 text-blue-600"
      },
      {
        name: "Smart Dialysis",
        description: "Monitor dialysis machines, track patient sessions, and analyze treatment effectiveness",
        provider: "HealthTech Partners",
        icon: Activity,
        color: "bg-green-100 text-green-600"
      },
      {
        name: "Cold Chain Monitor",
        description: "Ensure temperature-sensitive products maintain proper conditions throughout supply chain",
        provider: "LogiCool Systems",
        icon: Gauge,
        color: "bg-purple-100 text-purple-600"
      },
      {
        name: "Linen Management",
        description: "Track linens through washing, distribution, and usage cycles with RFID integration",
        provider: "Hospitality Solutions",
        icon: Settings,
        color: "bg-orange-100 text-orange-600"
      }
    ];

    return (
      <section id="marketplace" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Platform Marketplace</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Extend Your Platform with Smart Modules
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our marketplace of pre-built modules and industry-specific solutions. 
              Plug-and-play functionality without complex setup or coding.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerChildren}
            {...fadeInUp}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {modules.map((module, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-blue-200"
              >
                <div className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <module.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.name}</h3>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">{module.description}</p>
                <p className="text-xs text-gray-500">By {module.provider}</p>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  Learn More
                </Button>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeInUp} className="text-center">
            <Button size="lg" variant="outline" className="px-8">
              Browse All Modules
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    );
  };

  // CTA Section
  const CTASection = () => (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
      <div className="container mx-auto px-6 text-center">
        <motion.div {...fadeInUp} className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Ready to Transform Your IoT Infrastructure?
          </h2>
          <p className="text-xl text-blue-100 leading-relaxed">
            Join thousands of companies using Smart Sensor Flow to connect, monitor, 
            and optimize their IoT deployments. Start your free trial today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8"
              onClick={() => { setActiveAuthTab('signup'); setIsAuthModalOpen(true); }}
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
              Schedule Demo
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-blue-200 text-sm">
            <span>✓ No credit card required</span>
            <span>✓ 30-day free trial</span>
            <span>✓ Cancel anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );

  // Footer
  const Footer = () => (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/images/iot-logo.jpeg" className="w-[55%] opacity-70" alt="Smart Sensor Flow Logo" />
              </div>
              <span className="text-xl font-bold">Smart Sensor Flow</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              The leading open-source AIoT platform for connecting devices, processing data, 
              and delivering actionable insights.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
            </ul>
          </div>

          <div id="contact">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@smartsensorflow.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+27 (0)61 379 3603</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Dover, Delaware, USA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Smart Sensor Flow LLC. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      <AuthModal />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <MarketplaceSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default SmartSensorFlowLanding;