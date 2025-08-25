'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  Eye, 
  ShoppingCart,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  Code,
  Shield
} from 'lucide-react';

interface Module {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  rating: number;
  downloads: number;
  developer: string;
  version: string;
  lastUpdated: string;
  features: string[];
  status: 'available' | 'purchased' | 'installing';
}

export default function ModuleMarketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'monitoring', label: 'Monitoring & Analytics' },
    { id: 'maintenance', label: 'Predictive Maintenance' },
    { id: 'security', label: 'Security & Compliance' },
    { id: 'automation', label: 'Automation & Control' },
    { id: 'integration', label: 'Third-party Integration' }
  ];

  const modules: Module[] = [
    {
      id: '1',
      name: 'Smart Dialysis Monitor',
      description: 'Advanced monitoring system for dialysis machines with real-time alerts and predictive maintenance capabilities.',
      category: 'monitoring',
      price: '$299/month',
      rating: 4.8,
      downloads: 1247,
      developer: 'MedTech Solutions',
      version: '2.1.0',
      lastUpdated: '2 days ago',
      features: ['Real-time monitoring', 'Predictive alerts', 'Compliance reporting', 'Mobile app support'],
      status: 'available'
    },
    {
      id: '2',
      name: 'Cold Chain Tracker',
      description: 'Comprehensive temperature and humidity monitoring for pharmaceutical and food supply chains.',
      category: 'monitoring',
      price: '$199/month',
      rating: 4.6,
      downloads: 892,
      developer: 'ColdChain Pro',
      version: '1.8.2',
      lastUpdated: '1 week ago',
      features: ['Temperature monitoring', 'Humidity tracking', 'Alert system', 'Compliance logs'],
      status: 'purchased'
    },
    {
      id: '3',
      name: 'Predictive Maintenance',
      description: 'AI-powered maintenance prediction system that reduces downtime and extends equipment lifespan.',
      category: 'maintenance',
      price: '$399/month',
      rating: 4.9,
      downloads: 567,
      developer: 'AIoT Systems',
      version: '1.0.0',
      lastUpdated: '3 days ago',
      features: ['AI predictions', 'Maintenance scheduling', 'Cost optimization', 'Performance analytics'],
      status: 'available'
    },
    {
      id: '4',
      name: 'Asset Management',
      description: 'Complete asset lifecycle management with tracking, maintenance, and depreciation monitoring.',
      category: 'monitoring',
      price: '$249/month',
      rating: 4.7,
      downloads: 734,
      developer: 'AssetFlow',
      version: '1.2.1',
      lastUpdated: '5 days ago',
      features: ['Asset tracking', 'Maintenance history', 'Depreciation calculation', 'Reporting tools'],
      status: 'installing'
    },
    {
      id: '5',
      name: 'Environmental Monitor',
      description: 'Environmental compliance monitoring for industrial facilities with regulatory reporting.',
      category: 'monitoring',
      price: '$179/month',
      rating: 4.5,
      downloads: 456,
      developer: 'EcoSense',
      version: '1.5.3',
      lastUpdated: '2 weeks ago',
      features: ['Air quality monitoring', 'Noise level tracking', 'Regulatory compliance', 'Alert system'],
      status: 'available'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'purchased':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Installed
        </span>;
      case 'installing':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Clock className="w-3 h-3 mr-1" />
          Installing
        </span>;
      default:
        return null;
    }
  };

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || module.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedModules = [...filteredModules].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.downloads - a.downloads;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Module Marketplace</h1>
        <p className="text-gray-600">
          Discover and install modules to extend your Smart Sensor Flow platform functionality
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="lg:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="lg:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedModules.map((module) => (
          <div key={module.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            {/* Module Header */}
            <div className="p-6 border-b">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{module.name}</h3>
                {getStatusBadge(module.status)}
              </div>
              <p className="text-gray-600 text-sm mb-4">{module.description}</p>
              
              {/* Features */}
              <div className="space-y-2">
                {module.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {feature}
                  </div>
                ))}
                {module.features.length > 3 && (
                  <p className="text-xs text-gray-500">+{module.features.length - 3} more features</p>
                )}
              </div>
            </div>

            {/* Module Footer */}
            <div className="p-6">
              {/* Stats */}
              <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  {module.rating}
                </div>
                <div className="flex items-center">
                  <Download className="w-4 h-4 mr-1" />
                  {module.downloads.toLocaleString()}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {module.developer}
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{module.price}</p>
                  <p className="text-xs text-gray-500">v{module.version} • Updated {module.lastUpdated}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  
                  {module.status === 'available' && (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      <ShoppingCart className="w-4 h-4 inline mr-1" />
                      Install
                    </button>
                  )}
                  
                  {module.status === 'purchased' && (
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                      Manage
                    </button>
                  )}
                  
                  {module.status === 'installing' && (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg opacity-75 cursor-not-allowed text-sm">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Installing...
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Integration Info */}
      <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Code className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Seamless Integration</h3>
            <p className="text-blue-800 mb-3">
              Once installed, modules become fully integrated into your Smart Sensor Flow platform. 
              They appear as new navigation items, dashboard widgets, and enhanced functionality 
              within your existing interface.
            </p>
            <div className="flex items-center space-x-4 text-sm text-blue-700">
              <span className="flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                Secure & Tested
              </span>
              <span className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                Performance Optimized
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Enterprise Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

