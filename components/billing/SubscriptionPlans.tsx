"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info, Star, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IPlan } from '@/interfaces/plan';
import { PLAN_API } from '@/api/endpoints/rest-api/plan/plan';


interface SupportInfo {
  name: string;
  hours: number;
  description: string;
}

interface PlanWithSupport extends IPlan {
  supportInfo?: SupportInfo;
}

export default function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [hoveredSupport, setHoveredSupport] = useState<string | null>(null);
  const [plans, setPlans] = useState<PlanWithSupport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await PLAN_API.GET_ALL_PLANS();
        
        if (response.data) {
          // Transform API data to include supportInfo
          const transformedPlans = response.data.map(plan => ({
            ...plan,
            supportInfo: plan.supportName ? {
              name: plan.supportName,
              hours: plan.supportHours || 0,
              description: plan.supportDescription || ''
            } : undefined
          }));
          
          setPlans(transformedPlans);
        } else {
          setError('Failed to fetch plans');
        }
      } catch (err) {
        setError('Error fetching plans');
        console.error('Error fetching plans:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handlePlanSelect = (planId: string) => {
    console.log(`Selected plan: ${planId}`);
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50 ">

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.planType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-white rounded-lg shadow-sm border-2 transition-all duration-300 ${
              plan.isPopular ? 'border-blue-500 shadow-lg scale-105' : 'border-gray-200 hover:border-gray-300'
            }`}
            onMouseEnter={() => setSelectedPlan(plan.planType)}
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
                              onMouseEnter={() => setHoveredSupport(plan.planType)}
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
                {hoveredSupport === plan.planType && (
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