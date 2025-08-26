// components/MarketplaceSection.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Database, Activity, Gauge, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const MarketplaceSection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

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

export default MarketplaceSection;