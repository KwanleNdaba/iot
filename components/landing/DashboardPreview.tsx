// components/DashboardPreview.tsx
"use client";
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AnimatedLineChart, AnimatedBarChart, AnimatedDonutChart, MetricsCard } from './AnimatedCharts';
import { Database, Activity, Cpu, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardPreview = () => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 shadow-2xl">
      <div className="space-y-4">
        {/* Header with live indicators */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg">Live Analytics Dashboard</h3>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Top row metrics */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <MetricsCard
            title="Active Devices"
            value="1,247"
            trend={8.5}
            icon={Database}
            color="bg-blue-100"
          />
          <MetricsCard
            title="Data Points/Min"
            value="45.2K"
            trend={12.3}
            icon={Activity}
            color="bg-green-100"
          />
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 gap-4">
          <AnimatedLineChart />
          <div className="grid grid-cols-2 gap-3">
            <AnimatedBarChart />
            <AnimatedDonutChart />
          </div>
        </div>

        {/* Bottom status indicators */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between text-white/90 text-sm">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Analytics Engine</span>
            </div>
            <motion.div
              className="flex items-center space-x-1"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs">Running</span>
            </motion.div>
          </div>
          <div className="flex items-center justify-between text-white/90 text-sm">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4" />
              <span>AI Models</span>
            </div>
            <motion.span
              className="text-xs"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              3 Active
            </motion.span>
          </div>
          <div className="flex items-center justify-between text-white/90 text-sm">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Processing Rate</span>
            </div>
            <span className="text-xs">99.8%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;