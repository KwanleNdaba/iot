'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Code, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Activity,
  Database,
  Shield,
  Zap,
  Globe,
  Smartphone
} from 'lucide-react';
import UserFlowDiagram from '@/components/UserFlowDiagram';

export default function DashboardOverview() {
  const [activeSection, setActiveSection] = useState('overview');

  const platformFeatures = [
    {
      icon: Activity,
      title: 'Real-time Monitoring',
      description: 'Live IoT device monitoring with instant alerts and notifications',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Database,
      title: 'Data Analytics',
      description: 'Advanced analytics and insights from your IoT ecosystem',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security with role-based access control',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Zap,
      title: 'Scalable Architecture',
      description: 'Built to handle millions of devices and data points',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: Globe,
      title: 'Global Deployment',
      description: 'Multi-region support with local compliance',
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      icon: Smartphone,
      title: 'Mobile Ready',
      description: 'Responsive design that works on all devices',
      color: 'bg-pink-100 text-pink-600'
    }
  ];

  const useCases = [
    {
      title: 'Healthcare',
      description: 'Medical device monitoring, patient safety, compliance tracking',
      icon: '🏥',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Manufacturing',
      description: 'Predictive maintenance, quality control, supply chain optimization',
      icon: '🏭',
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Agriculture',
      description: 'Crop monitoring, livestock tracking, environmental control',
      icon: '🌾',
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      title: 'Smart Cities',
      description: 'Traffic management, utility monitoring, public safety',
      icon: '🏙️',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Retail',
      description: 'Inventory management, customer analytics, security systems',
      icon: '🛍️',
      color: 'bg-pink-50 border-pink-200'
    },
    {
      title: 'Energy',
      description: 'Grid monitoring, renewable energy, consumption optimization',
      icon: '⚡',
      color: 'bg-orange-50 border-orange-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Smart Sensor Flow Platform</h1>
              <p className="text-gray-600">Complete IoT Platform & Partner Ecosystem Overview</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/organization" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Organization Dashboard
              </Link>
              <Link href="/partner" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Partner Program
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Platform Overview' },
              { id: 'architecture', label: 'Architecture' },
              { id: 'usecases', label: 'Use Cases' },
              { id: 'flow', label: 'User Flow' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeSection === item.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'overview' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                The Complete IoT Platform for Enterprise
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Smart Sensor Flow combines powerful IoT device management with a thriving partner ecosystem, 
                enabling organizations to deploy, monitor, and extend their IoT capabilities seamlessly.
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/organization" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Start Managing IoT</span>
                </Link>
                <Link href="/partner" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                  <Code className="w-5 h-5" />
                  <span>Become a Partner</span>
                </Link>
              </div>
            </div>

            {/* Platform Features */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Platform Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {platformFeatures.map((feature, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Benefits */}
            <div className="bg-white rounded-2xl shadow-lg border p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Smart Sensor Flow?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Scalable Growth</h4>
                  <p className="text-gray-600">Start small and scale to millions of devices without platform limitations</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Partner Ecosystem</h4>
                  <p className="text-gray-600">Access specialized modules and expertise from our partner network</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Enterprise Ready</h4>
                  <p className="text-gray-600">Built for enterprise with security, compliance, and reliability</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'architecture' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Architecture</h2>
              <p className="text-xl text-gray-600">
                Built with modern technologies for scalability, security, and performance
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Frontend Architecture</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Next.js 15 with React 19</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">TypeScript for type safety</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Tailwind CSS for styling</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Responsive design system</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Backend Architecture</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Microservices architecture</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Real-time data processing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Secure API endpoints</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Scalable database design</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-900 mb-4 text-center">Integration Capabilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="font-medium text-blue-900 mb-2">Device Protocols</h4>
                  <p className="text-sm text-blue-700">MQTT, HTTP, CoAP, Modbus, and more</p>
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-blue-900 mb-2">Cloud Platforms</h4>
                  <p className="text-sm text-blue-700">AWS, Azure, Google Cloud integration</p>
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-blue-900 mb-2">Third-party APIs</h4>
                  <p className="text-sm text-blue-700">RESTful APIs for external systems</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'usecases' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Industry Use Cases</h2>
              <p className="text-xl text-gray-600">
                Smart Sensor Flow powers IoT solutions across diverse industries
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((useCase, index) => (
                <div key={index} className={`bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow ${useCase.color}`}>
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                  <p className="text-gray-600 text-sm">{useCase.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6">
                Join thousands of organizations already using Smart Sensor Flow to transform their IoT operations
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/organization" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Start Free Trial
                </Link>
                <Link href="/partner" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                  Become a Partner
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'flow' && (
          <div>
            <UserFlowDiagram />
          </div>
        )}
      </div>
    </div>
  );
}
