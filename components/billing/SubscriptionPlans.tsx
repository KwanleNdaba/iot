"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info, Star, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

const regions = [
  { id: 'emia', label: 'EMIA - Europe, Middle East, and Africa', active: true },
  { id: 'north-america', label: 'North America', active: true }
];

export default function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [hoveredSupport, setHoveredSupport] = useState<string | null>(null);
  const router = useRouter();

  const handlePlanSelect = (planId: string) => {
    console.log(`Selected plan: ${planId}`);
  };

  const getSupportFeatureIndex = (features: string[]) => {
    return features.findIndex(feature => 
      feature.includes('Support') && !feature.includes('Community')
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50 ">


      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-white rounded-lg shadow-sm border-2 transition-all duration-300 ${
              plan.isPopular ? 'border-blue-500 shadow-lg scale-105' : 'border-gray-200 hover:border-gray-300'
            }`}
            onMouseEnter={() => setSelectedPlan(plan.id)}
            onMouseLeave={() => setSelectedPlan(null)}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  POPULAR
                </div>
              </div>
            )}

            <div className="p-6">
              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/auth/signup')}
                className={`w-full py-3 cursor-pointer px-4 rounded-lg font-semibold transition-all duration-200 mb-6 ${
                  plan.isPopular
                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300'
                }`}
              >
                Choose Plan
                <ArrowRight className="w-4 h-4 inline-block ml-2" />
              </motion.button>

              {/* Features List */}
              <div className="space-y-3">
                {plan.features.map((feature, featureIndex) => {
                  const isSupportFeature = feature.includes('Support') && !feature.includes('Community') && plan.supportInfo;
                  
                  return (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.1) + (featureIndex * 0.05) }}
                      className="flex items-start gap-3 relative"
                    >
                      <Check className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-sm text-gray-700">{feature}</span>
                        {isSupportFeature && (
                          <div className="relative">
                            <button
                              onMouseEnter={() => setHoveredSupport(plan.id)}
                              onMouseLeave={() => setHoveredSupport(null)}
                              className="text-gray-400 hover:text-blue-500 transition-colors"
                            >
                              <Info className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Support Tooltip */}
            {plan.supportInfo && (
              <AnimatePresence>
                {hoveredSupport === plan.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-80"
                    style={{
                      top: '100%',
                      left: index < 3 ? '0' : 'auto',
                      right: index >= 3 ? '0' : 'auto',
                      marginTop: '0.5rem'
                    }}
                  >
                    {/* Arrow */}
                    <div 
                      className="absolute w-3 h-3 bg-white border-l border-t border-gray-200 rotate-45 -top-1.5"
                      style={{
                        left: index < 3 ? '2rem' : 'auto',
                        right: index >= 3 ? '2rem' : 'auto'
                      }}
                    />
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 text-sm">{plan.supportInfo.name}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {plan.supportInfo.description}
                      </p>
                      
                      <div className="pt-3 border-t border-gray-100">
                        <h5 className="font-semibold text-gray-900 text-xs mb-1">White-Labeling</h5>
                        <p className="text-xs text-gray-600">
                          Full White labelling functionality is available starting from the Prototype subscription
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <p className="text-gray-600 text-sm">
          Need a custom solution? <button className="text-blue-500 hover:text-blue-600 font-medium">Contact our sales team</button>
        </p>
      </motion.div>
    </div>
  );
}