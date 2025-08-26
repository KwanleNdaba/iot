// components/AnimatedCharts.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const AnimatedLineChart = () => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const generatePath = (points: number[], phase: number) => {
    const width = 280;
    const height = 100;
    const padding = 20;

    const adjustedPoints = points.map((point, index) => {
      const oscillation = Math.sin((index + phase * 2) * 0.5) * 5;
      return point + oscillation;
    });

    let path = `M ${padding} ${height - (adjustedPoints[0] / 100) * (height - 2 * padding) - padding}`;

    for (let i = 1; i < adjustedPoints.length; i++) {
      const x = padding + (i / (adjustedPoints.length - 1)) * (width - 2 * padding);
      const y = height - (adjustedPoints[i] / 100) * (height - 2 * padding) - padding;
      path += ` L ${x} ${y}`;
    }

    return path;
  };

  const dataPoints = [20, 35, 45, 30, 55, 65, 75, 60, 80, 70, 85];

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-700">Device Performance</h4>
        <div className="flex items-center space-x-1">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span className="text-xs text-green-600 font-medium">+12.5%</span>
        </div>
      </div>
      <svg width="280" height="100" className="overflow-visible">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <motion.path
          d={generatePath(dataPoints, animationPhase)}
          stroke="url(#lineGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        {dataPoints.map((point, index) => (
          <motion.circle
            key={index}
            cx={20 + (index / (dataPoints.length - 1)) * 240}
            cy={100 - (point / 100) * 60 - 20}
            r="3"
            fill="#3B82F6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          />
        ))}
      </svg>
    </div>
  );
};

export const AnimatedBarChart = () => {
  const [bars, setBars] = useState([65, 80, 45, 90, 70, 55]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(prev => prev.map(bar => Math.max(20, Math.min(95, bar + (Math.random() - 0.5) * 20))));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-700">Data Throughput</h4>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">Real-time</Badge>
      </div>
      <div className="flex items-end space-x-2 h-20">
        {bars.map((height, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm flex-1"
            animate={{ height: `${height}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <span key={day}>{day}</span>
        ))}
      </div>
    </div>
  );
};

export const AnimatedDonutChart = () => {
  const [percentage, setPercentage] = useState(85);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage(prev => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(75, Math.min(98, prev + change));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-700">System Health</h4>
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
      </div>
      <div className="flex items-center justify-center relative">
        <svg width="80" height="80" className="transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#E5E7EB"
            strokeWidth="6"
            fill="none"
          />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            stroke="#10B981"
            strokeWidth="6"
            fill="none"
            strokeDasharray={strokeDasharray}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-lg font-bold text-gray-800"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {Math.round(percentage)}%
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export const MetricsCard = ({ title, value, trend, icon: Icon, color }: {
  title: string;
  value: string;
  trend: number;
  icon: any;
  color: string;
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
    const interval = setInterval(() => {
      setAnimatedValue(prev => {
        const change = (Math.random() - 0.5) * (numericValue * 0.1);
        return Math.max(0, prev + change);
      });
    }, 1000);

    // Initial animation
    const timer = setTimeout(() => {
      setAnimatedValue(numericValue);
    }, 100);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [value]);

  return (
    <div className="bg-white rounded-lg p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 ${color} bg-opacity-10 rounded-lg flex items-center justify-center`}>
            <Icon className={`w-4 h-4 ${color.replace('bg-', 'text-').replace('-100', '-600')}`} />
          </div>
          <div>
            <p className="text-xs text-gray-600">{title}</p>
            <motion.p
              className="text-sm font-bold text-gray-900"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {title.includes('Device') ? Math.round(animatedValue).toLocaleString() : value}
            </motion.p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 text-xs ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{Math.abs(trend)}%</span>
        </div>
      </div>
    </div>
  );
};