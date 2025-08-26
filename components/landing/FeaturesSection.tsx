// components/FeaturesSection.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  BarChart3,
  Gauge,
  Settings,
  Cpu,
  Shield
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const FeaturesSection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

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

export default FeaturesSection;