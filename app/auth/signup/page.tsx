"use client";

import React, { useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, Star, Info, ArrowRight } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";
import SmartLogo from "@/public/images/smartLogo.jpg";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { toast } from "sonner";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  isPopular?: boolean;
  features: string[];
  supportInfo?: {
    name: string;
    hours: number;
    description: string;
  };
}

const plans: Plan[] = [
  {
    id: 'maker',
    name: 'Maker',
    description: 'Start exploring features',
    price: 29,
    features: [
      'Up to 2 Gateways',
      'Up to 4 Sensors',
      '500K data points/month',
      'Device Manager',
      'Community/Resource Support'
    ]
  },
  {
    id: 'prototype',
    name: 'Prototype',
    description: 'For PoCs and MVPs',
    price: 194,
    isPopular: true,
    features: [
      'Up to 5 Gateways',
      'Up to 10 Sensors',
      '1 Million data points/month',
      'Device Manager',
      'Standard Support',
      'White-Labeling'
    ],
    supportInfo: {
      name: 'Standard Support',
      hours: 3,
      description: 'Our standard support package provides customers with up to 3 hours of professional assistance each month. This support is accessible through multiple channels, including phone, video call, and email, ensuring you receive timely help in the format most convenient for you. Note: Support Hours are not transferable to the next month. All support hours not used will be lost.'
    }
  },
  {
    id: 'startup',
    name: 'Startup',
    description: 'For upcoming IoT Unicorns',
    price: 519,
    features: [
      'Up to 10 Gateways',
      'Up to 30 Sensors',
      '1.5 Million data points/month',
      'Device Manager',
      'Professional Support',
      'White-Labeling'
    ],
    supportInfo: {
      name: 'Professional Support',
      hours: 5,
      description: 'Our professional support package provides customers with up to 5 hours of professional assistance each month. This support is accessible through multiple channels, including phone, video call, and email, ensuring you receive timely help in the format most convenient for you. Note: Support Hours are not transferable to the next month. All support hours not used will be lost.'
    }
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Defined long term projects',
    price: 974,
    features: [
      'Up to 30 Gateways',
      'Up to 300 Sensors',
      '2 Million data points/month',
      'Device Manager',
      'Enterprise Support',
      'White-Labeling'
    ],
    supportInfo: {
      name: 'Enterprise Support',
      hours: 10,
      description: 'Our Enterprise support package provides customers with up to 10 hours of professional assistance each month. This support is accessible through multiple channels, including phone, video call, and email, ensuring you receive timely help in the format most convenient for you. Note: Support Hours are not transferable to the next month. All support hours not used will be lost.'
    }
  },
  {
    id: 'business-plus',
    name: 'Business+',
    description: 'Built for scalable IoT growth',
    price: 1429,
    features: [
      'Up to 100 Gateways',
      'Up to 1000 Sensors',
      '4 Million data points/month',
      'Device Manager',
      'Premier Support',
      'White-Labeling'
    ],
    supportInfo: {
      name: 'Premier Support',
      hours: 20,
      description: 'Our Premier support package provides customers with up to 20 hours of professional assistance each month. This support is accessible through multiple channels, including phone, video call, and email, ensuring you receive timely help in the format most convenient for you. Note: Support Hours are not transferable to the next month. All support hours not used will be lost.'
    }
  }
];

const FormSchema = z.object({
    organizationName: z.string().min(2, {
        message: "Organization name must be at least 2 characters.",
    }),
    organizationType: z.string().min(1, {
        message: "Please select an organization type.",
    }),
    industry: z.string().min(1, {
        message: "Please select an industry.",
    }),
    companySize: z.string().min(1, {
        message: "Please select company size.",
    }),
    website: z.string().optional(),
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    jobTitle: z.string().min(2, {
        message: "Job title must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Must be a valid email.",
    }),
    phoneNumber: z.string().min(10, {
        message: "Phone number must be at least 10 characters.",
    }),
    address: z.string().min(5, {
        message: "Address must be at least 5 characters.",
    }),
    city: z.string().min(2, {
        message: "City must be at least 2 characters.",
    }),
    state: z.string().min(2, {
        message: "State must be at least 2 characters.",
    }),
    zipCode: z.string().min(5, {
        message: "ZIP code must be at least 5 characters.",
    }),
    country: z.string().min(1, {
        message: "Please select a country.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export default function OrganizationSignupPage() {
  const [currentPlanIndex, setCurrentPlanIndex] = useState(1); // Start with Prototype (popular)
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      organizationName: "",
      organizationType: "",
      industry: "",
      companySize: "",
      website: "",
      firstName: "",
      lastName: "",
      jobTitle: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      password: "",
      confirmPassword: "",
    },
  });

  const currentPlan = plans[currentPlanIndex];

  const handlePreviousPlan = () => {
    setCurrentPlanIndex((prev) => (prev > 0 ? prev - 1 : plans.length - 1));
  };

  const handleNextPlan = () => {
    setCurrentPlanIndex((prev) => (prev < plans.length - 1 ? prev + 1 : 0));
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success(`Organization created successfully with ${currentPlan.name} plan!`);
      router.push("/organization");
    }, 2000);
  };

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
                    key={index}
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
                <p className="text-sm font-medium text-gray-700">{currentPlan.name}</p>
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

            {/* Support Information Card */}
            {currentPlan.supportInfo ? (
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
            )}

            {/* Value Proposition & Additional Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 space-y-4"
            >
              {/* Perfect For Section */}
              <div className="bg-gray-100 rounded-xl p-6 text-center">
                <h4 className="font-semibold text-gray-900 mb-3">Perfect for:</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {currentPlan.id === 'maker' && 'Individual developers and small teams getting started with IoT development and exploration'}
                  {currentPlan.id === 'prototype' && 'Teams building proof of concepts, MVPs, and testing IoT solutions before full deployment'}
                  {currentPlan.id === 'startup' && 'Growing startups scaling their IoT solutions and needing professional support'}
                  {currentPlan.id === 'business' && 'Established companies with large-scale IoT deployments and enterprise requirements'}
                  {currentPlan.id === 'business-plus' && 'Enterprise organizations requiring maximum scale, dedicated support, and advanced features'}
                </p>
              </div>

              {/* Key Benefits */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4 text-center">Key Benefits</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Real-time monitoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Scalable infrastructure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Advanced analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">API integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Data security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">99.9% uptime SLA</span>
                  </div>
                </div>
              </div>

              {/* Billing Info */}
     
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-1/2 p-8 flex flex-col justify-start min-h-screen overflow-y-auto">
        <div className="max-w-md mx-auto w-full pt-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white bg-white">
              <Image
                src={SmartLogo}
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
              Get started with your {currentPlan.name} plan
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Organization Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Organization Information
                </h3>
                
                <FormField
                  control={form.control}
                  name="organizationName"
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Organization Name *
                      </label>
                      <FormControl>
                        <Input
                          placeholder="Acme Corporation"
                          className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="organizationType"
                    render={({ field }) => (
                      <FormItem>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Organization Type *
                        </label>
                        <FormControl>
                          <select
                            className="h-10 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
                            {...field}
                          >
                            <option value="">Select organization type</option>
                            <option value="startup">Startup</option>
                            <option value="enterprise">Enterprise</option>
                            <option value="government">Government</option>
                            <option value="educational">Educational</option>
                            <option value="nonprofit">Non-profit</option>
                            <option value="individual">Individual</option>
                          </select>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Industry *
                        </label>
                        <FormControl>
                          <select
                            className="h-10 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
                            {...field}
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
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companySize"
                    render={({ field }) => (
                      <FormItem>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Size *
                        </label>
                        <FormControl>
                          <select
                            className="h-10 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
                            {...field}
                          >
                            <option value="">Select size</option>
                            <option value="1-10">1-10 employees</option>
                            <option value="11-50">11-50 employees</option>
                            <option value="51-200">51-200 employees</option>
                            <option value="201-1000">201-1000 employees</option>
                            <option value="1000+">1000+ employees</option>
                          </select>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Website
                      </label>
                      <FormControl>
                        <Input
                          placeholder="https://www.example.com"
                          className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Primary Contact Information
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <FormControl>
                          <Input
                            placeholder="John"
                            className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Title *
                      </label>
                      <FormControl>
                        <Input
                          placeholder="CEO, CTO, Engineering Manager, etc."
                          className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Business Email Address *
                      </label>
                      <FormControl>
                        <Input
                          placeholder="email@company.com"
                          className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <FormControl>
                        <Input
                          placeholder="+1 (555) 123-4567"
                          className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Address Information */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Billing Address
                </h3>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address *
                      </label>
                      <FormControl>
                        <Input
                          placeholder="123 Main Street"
                          className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <FormControl>
                          <Input
                            placeholder="San Francisco"
                            className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State/Province *
                        </label>
                        <FormControl>
                          <Input
                            placeholder="CA"
                            className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP/Postal Code *
                        </label>
                        <FormControl>
                          <Input
                            placeholder="94105"
                            className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country *
                        </label>
                        <FormControl>
                          <select
                            className="h-10 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
                            {...field}
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
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Security */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Account Security
                </h3>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password *
                      </label>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-xs text-gray-500 mt-1">
                        Minimum 8 characters with uppercase, lowercase, number, and special character
                      </p>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password *
                      </label>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
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
                  <Link href="/organization/terms-conditions" className="text-blue-600 hover:text-blue-800 underline">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/organization/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                disabled={loading || !agreeToTerms}
                className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? (
                  <Loader text="Creating organization..." size="sm" />
                ) : (
                  <>
                    Create Organization - ${currentPlan.price}/month
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </Form>

          {/* Footer Link */}
          <div className="mt-6 text-center pb-8">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-blue-600 hover:text-blue-800 font-medium underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
