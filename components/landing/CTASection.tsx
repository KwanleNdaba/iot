// components/CTASection.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CTASection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
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
            <Link href="/auth/signin">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
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
};

export default CTASection;