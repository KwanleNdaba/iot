"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, Star, Info, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// API imports
import { PLAN_API } from '@/api/endpoints/rest-api/plan/plan';
import { ORGANIZATION_API } from '@/api/endpoints/rest-api/organization/organization';

// Paystack configuration
const PAYSTACK_PUBLIC_KEY = "pk_test_d19530e7c057ec4eb7142ce000fc198d8349be56";

interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  planType: string;
  isPopular: boolean;
  features: string[];
  supportName?: string;
  supportHours?: number;
  supportDescription?: string;
  supportInfo?: {
    name: string;
    hours: number;
    description: string;
  };
}

interface OrganizationFormData {
  organizationName: string;
  organizationType: string;
  industry: string;
  companySize: string;
  website: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function OrganizationSignupPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [plansLoading, setPlansLoading] = useState(true);
  const router = useRouter();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [PaystackHook, setPaystackHook] = useState<any>(null);
  const [formData, setFormData] = useState<OrganizationFormData>({
    organizationName: '',
    organizationType: '',
    industry: '',
    companySize: '',
    website: '',
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Set client-side flag and load Paystack
  useEffect(() => {
    setIsClient(true);
    
    // Dynamically import Paystack only on client side
    if (typeof window !== 'undefined') {
      import('react-paystack').then((module) => {
        setPaystackHook(() => module.usePaystackPayment);
      });
    }
  }, []);

  // Fetch plans from API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setPlansLoading(true);
        const response = await PLAN_API.GET_ALL_PLANS();
        
        if (response.data && response.data.length > 0) {
          // Transform API data to include supportInfo and set default plan index
          const transformedPlans: Plan[] = response.data.map((plan: any) => ({
            ...plan,
            supportInfo: plan.supportName ? {
              name: plan.supportName,
              hours: plan.supportHours || 0,
              description: plan.supportDescription || ''
            } : undefined
          }));
          
          setPlans(transformedPlans);
          
          // Find the popular plan or default to first plan
          const popularPlanIndex = transformedPlans.findIndex(plan => plan.isPopular);
          setCurrentPlanIndex(popularPlanIndex !== -1 ? popularPlanIndex : 0);
        } else {
          alert("Failed to load plans");
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        alert("Error loading plans. Please refresh the page.");
      } finally {
        setPlansLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const currentPlan = plans[currentPlanIndex];

  // Initialize Paystack payment
  const initializePayment = PaystackHook ? PaystackHook({
    reference: new Date().getTime().toString(),
    email: formData.email,
    amount: currentPlan ? currentPlan.price * 100 : 0, 
    publicKey: PAYSTACK_PUBLIC_KEY,
    currency: "ZAR",
    firstname: formData.firstName,
    lastname: formData.lastName,
    phone: formData.phoneNumber,
    metadata: {
      custom_fields: [
        {
          display_name: "Organization Name",
          variable_name: "organization_name",
          value: formData.organizationName
        },
        {
          display_name: "Plan",
          variable_name: "plan",
          value: currentPlan ? currentPlan.name : ""
        }
      ]
    }
  }) : () => {};

  const handlePreviousPlan = () => {
    setCurrentPlanIndex((prev) => (prev > 0 ? prev - 1 : plans.length - 1));
  };

  const handleNextPlan = () => {
    setCurrentPlanIndex((prev) => (prev < plans.length - 1 ? prev + 1 : 0));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    // Required field validations
    if (!formData.organizationName || formData.organizationName.length < 2) {
      newErrors.organizationName = 'Organization name must be at least 2 characters';
    }
    if (!formData.organizationType) {
      newErrors.organizationType = 'Please select an organization type';
    }
    if (!formData.industry) {
      newErrors.industry = 'Please select an industry';
    }
    if (!formData.companySize) {
      newErrors.companySize = 'Please select company size';
    }
    if (!formData.firstName || formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }
    if (!formData.lastName || formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }
    if (!formData.jobTitle || formData.jobTitle.length < 2) {
      newErrors.jobTitle = 'Job title must be at least 2 characters';
    }
    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Must be a valid email address';
    }
    if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = 'Phone number must be at least 10 characters';
    }
    if (!formData.address || formData.address.length < 5) {
      newErrors.address = 'Address must be at least 5 characters';
    }
    if (!formData.city || formData.city.length < 2) {
      newErrors.city = 'City must be at least 2 characters';
    }
    if (!formData.state || formData.state.length < 2) {
      newErrors.state = 'State must be at least 2 characters';
    }
    if (!formData.zipCode || formData.zipCode.length < 5) {
      newErrors.zipCode = 'ZIP code must be at least 5 characters';
    }
    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.confirmPassword || formData.confirmPassword.length < 8) {
      newErrors.confirmPassword = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    return newErrors;
  };

  // Function to create organization after successful payment
  const createOrganization = async () => {
    try {
      // Prepare organization data with the selected plan ID
      const organizationData = {
        organizationName: formData.organizationName,
        organizationType: formData.organizationType,
        industry: formData.industry,
        companySize: formData.companySize,
        website: formData.website || undefined,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        planId: currentPlan.id, // Use the actual plan ID from API
        firstName: formData.firstName,
        lastName: formData.lastName,
        jobTitle: formData.jobTitle,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        role: 'admin' // Default role for organization creator
      };
      
      // Call API to create organization
      const response: any = await ORGANIZATION_API.CREATE_ORGANIZATION(organizationData);
      
      if (response.data.id) {
        setFormData({
          organizationName: '',
          organizationType: '',
          industry: '',
          companySize: '',
          website: '',
          firstName: '',
          lastName: '',
          jobTitle: '',
          email: '',
          phoneNumber: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
          password: '',
          confirmPassword: ''
        });
        setAgreeToTerms(false);
        setErrors({});
        setPaymentCompleted(false);
        router.push("/auth/signin");
      } else {
        alert(response.message || "Failed to create organization");
      }
    } catch (error: any) {
      console.error("Organization creation error:", error);
      alert(error.response?.data?.message || "An error occurred while creating organization");
    } finally {
      setLoading(false);
    }
  };

  // Handle Paystack payment success
  const onSuccess = () => {
    setPaymentCompleted(true);
    // Create organization after successful payment
    createOrganization();
  };

  // Handle Paystack payment close
  const onClose = () => {
    alert("Payment was closed. Please try again.");
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }
    
    if (!currentPlan) {
      alert("Please select a plan");
      return;
    }
    
    setLoading(true);
    
    try {
      // Initialize Paystack payment
      initializePayment({
        onSuccess: (reference: any) => onSuccess(),
        onClose: onClose
      });
    } catch (error) {
      console.error("Payment initialization error:", error);
      alert("An error occurred while initializing payment");
      setLoading(false);
    }
  };

  // Show loading spinner while plans are being fetched or component is not ready
  if (plansLoading || !isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading plans...</p>
        </div>
      </div>
    );
  }

  // Show error if no plans loaded
  if (!plans.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load subscription plans</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Plan Selection */}
      <div className="w-1/2 bg-gradient-to-br from-gray-50 to-white border-r border-gray-200 p-8 flex flex-col">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Plan</h1>
          <p className="text-gray-600 text-lg mb-4">Select the perfect plan for your organization's needs</p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>30-day money-back guarantee</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full mx-2"></div>
            <span>Cancel anytime</span>
          </div>
        </div>

        {/* Plan Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePreviousPlan}
              className="p-3 rounded-lg border border-gray-300 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
            </button>
            
            <div className="flex flex-col items-center gap-3">
              <div className="flex space-x-3">
                {plans.map((plan, index) => (
                  <button
                    key={plan.id}
                    onClick={() => setCurrentPlanIndex(index)}
                    className={`relative transition-all duration-200 ${
                      index === currentPlanIndex 
                        ? 'scale-110' 
                        : 'hover:scale-105'
                    }`}
                    title={plan.name}
                  >
                    <div className={`w-4 h-4 rounded-full transition-colors ${
                      index === currentPlanIndex ? 'bg-blue-500 shadow-lg' : 'bg-gray-300 hover:bg-gray-400'
                    }`} />
                    {index === currentPlanIndex && (
                      <div className="absolute -inset-1 rounded-full border-2 border-blue-200 animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Plan {currentPlanIndex + 1} of {plans.length}</p>
                <p className="text-sm font-medium text-gray-700">{currentPlan?.name}</p>
              </div>
            </div>
            
            <button
              onClick={handleNextPlan}
              className="p-3 rounded-lg border border-gray-300 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
            </button>
          </div>
        </div>

        {/* Current Plan Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPlanIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            {/* Plan Card */}
            {currentPlan && (
              <div className={`relative bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl border-2 transition-all duration-300 ${
                currentPlan.isPopular ? 'border-blue-500 shadow-blue-100' : 'border-gray-200'
              } mb-6`}>
                {currentPlan.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                      <Star className="w-3 h-3 fill-current" />
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">{currentPlan.name}</h3>
                    <p className="text-gray-600 text-lg mb-6">{currentPlan.description}</p>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold text-gray-900">${currentPlan.price}</span>
                      <span className="text-gray-600 text-lg">/month</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Billed monthly</p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">What's included:</h4>
                    {currentPlan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-gray-700 text-base leading-relaxed">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Support Information Card */}
            {currentPlan?.supportInfo ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-blue-50 border border-blue-200 rounded-xl p-6"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Info className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 text-lg mb-1">{currentPlan.supportInfo.name}</h4>
                    <p className="text-blue-700 text-sm font-medium">{currentPlan.supportInfo.hours} hours/month included</p>
                  </div>
                </div>
                <p className="text-blue-800 text-sm leading-relaxed mb-4">
                  {currentPlan.supportInfo.description}
                </p>
                <div className="border-t border-blue-200 pt-4">
                  <h5 className="font-semibold text-blue-900 text-sm mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    White-Labeling Available
                  </h5>
                  <p className="text-blue-700 text-sm">
                    Full white-labeling functionality is included with this plan, allowing you to customize the platform with your brand.
                  </p>
                </div>
              </motion.div>
            ) : (
              currentPlan && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-6"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Info className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900 text-lg mb-1">Community Support</h4>
                      <p className="text-green-700 text-sm font-medium">Access to community forums and resources</p>
                    </div>
                  </div>
                  <p className="text-green-800 text-sm leading-relaxed mb-4">
                    Get help from our active community of developers and access comprehensive documentation, tutorials, and community-driven support channels.
                  </p>
                  <div className="border-t border-green-200 pt-4">
                    <h5 className="font-semibold text-green-900 text-sm mb-2 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      Perfect for Getting Started
                    </h5>
                    <p className="text-green-700 text-sm">
                      Ideal for individual developers and small teams looking to explore IoT capabilities without enterprise-level support needs.
                    </p>
                  </div>
                </motion.div>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-1/2 p-8 flex flex-col justify-start min-h-screen overflow-y-auto">
        <div className="max-w-md mx-auto w-full pt-8">
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg bg-transparent">
              <Image
                src="/images/icon.jpg"
                alt="Smart Sensor Flow Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Create Organization
            </h2>
            <p className="text-gray-600">
              Get started with your {currentPlan?.name} plan
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Organization Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Organization Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization Name *
                </label>
                <input
                  type="text"
                  name="organizationName"
                  placeholder="Acme Corporation"
                  className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  required
                />
                {errors.organizationName && (
                  <p className="text-xs text-red-600 mt-1">{errors.organizationName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization Type *
                </label>
                <select
                  name="organizationType"
                  className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none bg-white"
                  value={formData.organizationType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select organization type</option>
                  <option value="startup">Startup</option>
                  <option value="enterprise">Enterprise</option>
                  <option value="government">Government</option>
                  <option value="educational">Educational</option>
                  <option value="nonprofit">Non-profit</option>
                  <option value="individual">Individual</option>
                </select>
                {errors.organizationType && (
                  <p className="text-xs text-red-600 mt-1">{errors.organizationType}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry *
                  </label>
                  <select
                    name="industry"
                    className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none bg-white"
                    value={formData.industry}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select industry</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="agriculture">Agriculture</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="logistics">Logistics</option>
                    <option value="energy">Energy</option>
                    <option value="automotive">Automotive</option>
                    <option value="retail">Retail</option>
                    <option value="smart-cities">Smart Cities</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.industry && (
                    <p className="text-xs text-red-600 mt-1">{errors.industry}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Size *
                  </label>
                  <select
                    name="companySize"
                    className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none bg-white"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-1000">201-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                  {errors.companySize && (
                    <p className="text-xs text-red-600 mt-1">{errors.companySize}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Website
                </label>
                <input
                  type="url"
                  name="website"
                  placeholder="https://www.example.com"
                  className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Primary Contact Information
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title *
                  </label>
                <input
                  type="text"
                  name="jobTitle"
                  placeholder="CEO, CTO, Engineering Manager, etc."
                  className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  required
                />
                {errors.jobTitle && (
                  <p className="text-xs text-red-600 mt-1">{errors.jobTitle}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email@company.com"
                  className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="+1 (555) 123-4567"
                  className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-red-600 mt-1">{errors.phoneNumber}</p>
                )}
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Billing Address
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="123 Main Street"
                  className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
                {errors.address && (
                  <p className="text-xs text-red-600 mt-1">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="San Francisco"
                    className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.city && (
                    <p className="text-xs text-red-600 mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    name="state"
                    placeholder="CA"
                    className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.state && (
                    <p className="text-xs text-red-600 mt-1">{errors.state}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP/Postal Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="94105"
                    className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.zipCode && (
                    <p className="text-xs text-red-600 mt-1">{errors.zipCode}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <select
                    name="country"
                    className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none bg-white"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="AU">Australia</option>
                    <option value="JP">Japan</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.country && (
                    <p className="text-xs text-red-600 mt-1">{errors.country}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Account Security
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 8 characters with uppercase, lowercase, number, and special character
                </p>
                {errors.password && (
                  <p className="text-xs text-red-600 mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start pt-4">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700 leading-tight">
                I agree to the{" "}
                <a href="/organization/terms-conditions" className="text-blue-600 hover:text-blue-800 underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="/organization/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !agreeToTerms || !PaystackHook}
              className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing payment...
                </div>
              ) : paymentCompleted ? (
                "Creating organization..."
              ) : (
                <>
                  Pay ${currentPlan?.price} - Continue to Payment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 text-center pb-8">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/auth/signin"
                className="text-blue-600 cursor-pointer hover:text-blue-800 font-medium underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}