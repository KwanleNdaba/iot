'use client';

import { ArrowRight, Users, Code, ShoppingCart, CheckCircle, TrendingUp, BarChart3, AlertTriangle } from 'lucide-react';

export default function UserFlowDiagram() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete User Flow</h2>
        <p className="text-xl text-gray-600">
          Understanding how Organizations and Partners interact through the Smart Sensor Flow platform
        </p>
      </div>

      {/* Main Flow Diagram */}
      <div className="bg-white rounded-2xl shadow-lg border p-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Partner Flow */}
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Code className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Partner Developers</h3>
              <p className="text-gray-600">Create and monetize modules</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Develop Module</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Submit for Review</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Publish to Marketplace</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">4</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Earn Revenue</span>
              </div>
            </div>
          </div>

          {/* Platform Center */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center">Smart Sensor Flow Platform</h3>
            <p className="text-sm text-gray-600 text-center">AIoT Platform & Module Marketplace</p>
            
            {/* Connection Lines */}
            <div className="hidden lg:block">
              <div className="w-32 h-0.5 bg-gray-300 transform rotate-90"></div>
            </div>
          </div>

          {/* Organization Flow */}
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Organizations</h3>
              <p className="text-gray-600">Deploy IoT devices & use modules</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Deploy IoT Devices</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Browse Marketplace</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Install Modules</span>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">4</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Enhanced Functionality</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Flow Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Partner Journey */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Code className="w-5 h-5 text-green-600 mr-2" />
            Partner Development Journey
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Module Development</h4>
                <p className="text-sm text-gray-600">Create specialized IoT modules using platform APIs and development tools</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Testing & Validation</h4>
                <p className="text-sm text-gray-600">Test modules in development environment and validate functionality</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Marketplace Submission</h4>
                <p className="text-sm text-gray-600">Submit modules for review with documentation and pricing</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs font-bold">4</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Revenue Generation</h4>
                <p className="text-sm text-gray-600">Earn revenue from module subscriptions and usage</p>
              </div>
            </div>
          </div>
        </div>

        {/* Organization Journey */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 text-blue-600 mr-2" />
            Organization Implementation Journey
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">IoT Infrastructure</h4>
                <p className="text-sm text-gray-600">Deploy sensors and devices with Smart Sensor Flow platform</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Module Discovery</h4>
                <p className="text-sm text-gray-600">Browse marketplace for modules that enhance platform capabilities</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Installation & Integration</h4>
                <p className="text-sm text-gray-600">Install modules and integrate them into existing workflows</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-xs font-bold">4</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Enhanced Operations</h4>
                <p className="text-sm text-gray-600">Leverage new capabilities for improved monitoring and automation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-200">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Platform Benefits</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Scalable Growth</h4>
            <p className="text-gray-600">Partners can scale their business while organizations expand their IoT capabilities</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Quality Assurance</h4>
            <p className="text-gray-600">All modules undergo rigorous review and testing before marketplace availability</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <ShoppingCart className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Seamless Integration</h4>
            <p className="text-gray-600">Modules integrate seamlessly into existing workflows without disruption</p>
          </div>
        </div>
      </div>
    </div>
  );
}
