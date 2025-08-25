"use client"
import React, { useState } from 'react';
import { 
  Upload, 
  FileCode, 
  Settings, 
  Eye, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  FileText,
  Code,
  Globe,
  DollarSign,
  Users,
  Star,
  Save,
  Send,
  Package,
  Zap,
  BarChart3,
  ShoppingCart,
  Tag,
  Info
} from 'lucide-react';

interface Plan {
  name: string;
  price: number;
  features: string[];
}

interface ModuleData {
  name: string;
  description: string;
  category: string;
  icon: string;
  version: string;
  pricingModel: string;
  plans: Plan[];
  frontendBundle: File | null;
  backendEndpoints: string[];
  apiDocumentation: string;
  screenshots: File[];
  keyFeatures: string[];
  tags: string[];
  submissionNotes: string;
}

const PartnerModuleUploadFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [moduleData, setModuleData] = useState<ModuleData>({
    // Basic Info
    name: '',
    description: '',
    category: '',
    icon: '',
    version: '1.0.0',
    
    // Pricing
    pricingModel: 'subscription',
    plans: [
      { name: 'Basic', price: 19, features: ['Real-time monitoring', 'Basic dashboards'] },
      { name: 'Professional', price: 49, features: ['Advanced analytics', 'Custom dashboards', 'API access'] },
      { name: 'Enterprise', price: 99, features: ['Unlimited features', 'Priority support', 'Custom integrations'] }
    ],
    
    // Technical
    frontendBundle: null,
    backendEndpoints: [],
    apiDocumentation: '',
    
    // Marketplace
    screenshots: [],
    keyFeatures: [],
    tags: [],
    
    // Submission
    submissionNotes: ''
  });

  const steps = [
    { number: 1, title: 'Basic Information', icon: FileText },
    { number: 2, title: 'Technical Setup', icon: Code },
    { number: 3, title: 'Pricing & Plans', icon: DollarSign },
    { number: 4, title: 'Marketplace Assets', icon: ShoppingCart },
    { number: 5, title: 'Review & Submit', icon: Send }
  ];

  const categories = [
    { value: 'analytics', label: 'Analytics & Insights', icon: BarChart3 },
    { value: 'device-management', label: 'Device Management', icon: Settings },
    { value: 'monitoring', label: 'IoT Monitoring', icon: Package },
    { value: 'alerts', label: 'Alerting & Notifications', icon: Zap }
  ];

  const iconOptions = [
    { value: 'BarChart3', label: 'Analytics', icon: BarChart3 },
    { value: 'Settings', label: 'Settings', icon: Settings },
    { value: 'Package', label: 'Package', icon: Package },
    { value: 'Zap', label: 'Alerts', icon: Zap }
  ];

  const handleInputChange = (field: keyof ModuleData, value: any) => {
    setModuleData(prev => ({ ...prev, [field]: value }));
  };

  const addPlan = () => {
    setModuleData(prev => ({
      ...prev,
      plans: [...prev.plans, { name: '', price: 0, features: [''] }]
    }));
  };

  const updatePlan = (index: number, field: keyof Plan, value: any) => {
    setModuleData(prev => ({
      ...prev,
      plans: prev.plans.map((plan, i) => 
        i === index ? { ...plan, [field]: value } : plan
      )
    }));
  };

  const addFeatureToPlan = (planIndex: number) => {
    setModuleData(prev => ({
      ...prev,
      plans: prev.plans.map((plan, i) => 
        i === planIndex ? { ...plan, features: [...plan.features, ''] } : plan
      )
    }));
  };

  const updatePlanFeature = (planIndex: number, featureIndex: number, value: string) => {
    setModuleData(prev => ({
      ...prev,
      plans: prev.plans.map((plan, i) => 
        i === planIndex ? {
          ...plan,
          features: plan.features.map((feature, j) => 
            j === featureIndex ? value : feature
          )
        } : plan
      )
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          
          return (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                isCompleted 
                  ? 'bg-green-600 border-green-600 text-white' 
                  : isActive 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-gray-100 border-gray-300 text-gray-500'
              }`}>
                {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                  Step {step.number}
                </p>
                <p className={`text-xs ${isActive || isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${isCompleted ? 'bg-green-600' : 'bg-gray-300'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-900">Module Basics</h3>
            <p className="text-sm text-blue-800 mt-1">
              Provide essential information about your module that will be displayed to organizations in the marketplace.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Module Name *
            </label>
            <input
              type="text"
              value={moduleData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Smart Dialysis Monitor"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={moduleData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe what your module does and its key benefits..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              This description will appear on the module card in the marketplace.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.value}
                    onClick={() => handleInputChange('category', category.value)}
                    className={`p-3 border rounded-lg text-left transition-colors ${
                      moduleData.category === category.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{category.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Version
            </label>
            <input
              type="text"
              value={moduleData.version}
              onChange={(e) => handleInputChange('version', e.target.value)}
              placeholder="1.0.0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Module Icon
            </label>
            <div className="grid grid-cols-2 gap-3">
              {iconOptions.map((icon) => {
                const Icon = icon.icon;
                return (
                  <button
                    key={icon.value}
                    onClick={() => handleInputChange('icon', icon.value)}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      moduleData.icon === icon.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-1" />
                    <span className="text-xs">{icon.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Preview</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                  {moduleData.icon && iconOptions.find(i => i.value === moduleData.icon) ? (
                    React.createElement(iconOptions.find(i => i.value === moduleData.icon)!.icon, {
                      className: "w-5 h-5 text-blue-600"
                    })
                  ) : (
                    <Package className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {moduleData.name || 'Module Name'}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {moduleData.category ? categories.find(c => c.value === moduleData.category)?.label : 'Category'}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    {moduleData.description || 'Module description will appear here...'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Code className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-amber-900">Technical Configuration</h3>
            <p className="text-sm text-amber-800 mt-1">
              Upload your module's code and configure its technical requirements. See our documentation for detailed integration guidelines.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frontend Bundle *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">
                Drop your React bundle here or click to browse
              </p>
              <p className="text-xs text-gray-500">
                Supported: .js, .jsx, .zip (Max 50MB)
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Backend Endpoints (Optional)
            </label>
            <textarea
              placeholder="List your module's API endpoints, one per line..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              If your module requires backend services, list the endpoints here.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Documentation
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">
                Upload API documentation
              </p>
              <p className="text-xs text-gray-500">
                Supported: .md, .pdf, .json (OpenAPI/Swagger)
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Integration Requirements</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" defaultChecked />
                <span className="text-sm text-gray-700">React 18+ compatible</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" defaultChecked />
                <span className="text-sm text-gray-700">Uses Tailwind CSS classes only</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <span className="text-sm text-gray-700">Requires external APIs</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <span className="text-sm text-gray-700">Uses localStorage/sessionStorage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <DollarSign className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-green-900">Pricing Strategy</h3>
            <p className="text-sm text-green-800 mt-1">
              Set up your pricing plans. Partners receive 70% of the profits from marketplace sales and recurring revenue share.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pricing Model
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['subscription', 'one-time', 'usage-based'].map((model) => (
              <button
                key={model}
                onClick={() => handleInputChange('pricingModel', model)}
                className={`p-3 border rounded-lg text-center transition-colors ${
                  moduleData.pricingModel === model
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <span className="text-sm font-medium capitalize">{model.replace('-', ' ')}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Pricing Plans</h3>
            <button
              onClick={addPlan}
              className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add Plan</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {moduleData.plans.map((plan, planIndex) => (
              <div key={planIndex} className="border border-gray-300 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Plan {planIndex + 1}</h4>
                  <button
                    onClick={() => {
                      setModuleData(prev => ({
                        ...prev,
                        plans: prev.plans.filter((_, i) => i !== planIndex)
                      }));
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                  <input
                    type="text"
                    value={plan.name}
                    onChange={(e) => updatePlan(planIndex, 'name', e.target.value)}
                    placeholder="e.g., Basic, Professional"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (${moduleData.pricingModel === 'subscription' ? '/month' : ''})
                  </label>
                  <input
                    type="number"
                    value={plan.price}
                    onChange={(e) => updatePlan(planIndex, 'price', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Features</label>
                    <button
                      onClick={() => addFeatureToPlan(planIndex)}
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      <Plus className="w-3 h-3 inline mr-1" />
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <input
                        key={featureIndex}
                        type="text"
                        value={feature}
                        onChange={(e) => updatePlanFeature(planIndex, featureIndex, e.target.value)}
                        placeholder="Feature description"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <ImageIcon className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-purple-900">Marketplace Presentation</h3>
            <p className="text-sm text-purple-800 mt-1">
              Add visual assets and key information that will help organizations discover and understand your module.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Screenshots & Media
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">
                Upload screenshots of your module
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG up to 5MB each. Recommended: 1920x1080
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Features
            </label>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="e.g., Real-time monitoring"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="e.g., Advanced analytics"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="e.g., Custom dashboards"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center">
                <Plus className="w-3 h-3 mr-1" />
                Add Feature
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags & Keywords
            </label>
            <input
              type="text"
              placeholder="e.g., iot, analytics, monitoring (comma-separated)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Help organizations find your module with relevant keywords.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Marketplace Preview</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
                  {moduleData.icon && iconOptions.find(i => i.value === moduleData.icon) ? (
                    React.createElement(iconOptions.find(i => i.value === moduleData.icon)!.icon, {
                      className: "w-6 h-6 text-blue-600"
                    })
                  ) : (
                    <Package className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      {moduleData.name || 'Module Name'}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-amber-500 fill-current" />
                      <span className="text-xs font-medium text-gray-700">4.8</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded px-2 py-0.5">
                      {moduleData.category ? categories.find(c => c.value === moduleData.category)?.label : 'Category'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    {moduleData.description || 'Module description will appear here...'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Starting at</span>
                    <span className="text-lg font-bold text-gray-900">
                      ${moduleData.plans.length > 0 ? Math.min(...moduleData.plans.map(p => p.price)) : 19}/month
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Send className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-900">Review & Submit</h3>
            <p className="text-sm text-blue-800 mt-1">
              Review your module details and submit for approval. Our team will review your submission within 3-5 business days.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Module Summary */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Module Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Name:</span>
                <span className="text-sm font-medium">{moduleData.name || 'Not set'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Category:</span>
                <span className="text-sm font-medium">
                  {moduleData.category ? categories.find(c => c.value === moduleData.category)?.label : 'Not set'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Version:</span>
                <span className="text-sm font-medium">{moduleData.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Pricing Plans:</span>
                <span className="text-sm font-medium">{moduleData.plans.length} plans</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Price Range:</span>
                <span className="text-sm font-medium">
                  ${moduleData.plans.length > 0 ? Math.min(...moduleData.plans.map(p => p.price)) : 0} - 
                  ${moduleData.plans.length > 0 ? Math.max(...moduleData.plans.map(p => p.price)) : 0}
                  {moduleData.pricingModel === 'subscription' ? '/month' : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Submission Notes */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Notes</h3>
            <textarea
              value={moduleData.submissionNotes}
              onChange={(e) => handleInputChange('submissionNotes', e.target.value)}
              placeholder="Add any notes for the review team (optional)..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-6">
          {/* Checklist */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Checklist</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">Basic information complete</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">Frontend bundle uploaded</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">Pricing plans configured</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-amber-600" />
                <span className="text-sm text-gray-700">Screenshots (optional)</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">Terms accepted</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">What happens next?</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">1</div>
                <span>Technical review (1-2 days)</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">2</div>
                <span>Security audit (2-3 days)</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">3</div>
                <span>Marketplace approval</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">✓</div>
                <span>Live in marketplace!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Upload New Module</h1>
            <p className="text-gray-600 mt-2">
              Create and submit your module for the Smart Sensor Flow marketplace
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save Draft</span>
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              Documentation
            </button>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            currentStep === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center space-x-4">
          {currentStep === steps.length ? (
            <div className="flex items-center space-x-3">
              <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                Save as Draft
              </button>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2">
                <Send className="w-4 h-4" />
                <span>Submit for Review</span>
              </button>
            </div>
          ) : (
            <button
              onClick={nextStep}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
            <Info className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Development Guide</h4>
                <p className="text-gray-600">Learn how to build modules for our platform</p>
                <a href="#" className="text-blue-600 hover:underline mt-1 inline-block">Read Documentation →</a>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">API Reference</h4>
                <p className="text-gray-600">Explore available APIs and endpoints</p>
                <a href="#" className="text-blue-600 hover:underline mt-1 inline-block">View API Docs →</a>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Partner Support</h4>
                <p className="text-gray-600">Get help from our technical team</p>
                <a href="#" className="text-blue-600 hover:underline mt-1 inline-block">Contact Support →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerModuleUploadFlow;