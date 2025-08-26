// components/HeroSection.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DashboardPreview from './DashboardPreview';

const HeroSection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
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
              >
                <a href="#pricing" className="text-white transition-colors">Get Started</a>
                <ArrowRight className="w-5 h-5 ml-2" />
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
            <DashboardPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;