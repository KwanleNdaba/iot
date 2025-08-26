// components/PricingSection.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import SubscriptionPlans from '@/components/billing/SubscriptionPlans';

const PricingSection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
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

        <SubscriptionPlans />
        
        <motion.div {...fadeInUp} className="text-center">
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
};

export default PricingSection;