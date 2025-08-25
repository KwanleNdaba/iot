'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  Save,
  X,
  Plus,
  Trash2,
  Upload,
  Download,
  Settings,
  Activity,
  MapPin,
  Wifi,
  Database,
  AlertTriangle,
  CheckCircle,
  Thermometer,
  Battery,
  Signal
} from 'lucide-react';

interface AlertThreshold {
  min: number;
  max?: number;
  enabled: boolean;
}

interface AlertThresholds {
  [key: string]: AlertThreshold;
}

export default function AddDevicePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    type: '',
    description: '',
    location: '',
    tags: [] as string[],
    
    // Technical Details
    manufacturer: '',
    model: '',
    serialNumber: '',
    firmware: '',
    
    // Network Configuration
    ipAddress: '',
    macAddress: '',
    networkProtocol: 'wifi',
    port: '',
    
    // Monitoring Configuration
    monitoringInterval: 60,
    alertThresholds: {
      temperature: { min: 18, max: 25, enabled: true },
      humidity: { min: 30, max: 60, enabled: true },
      battery: { min: 20, enabled: true },
      signal: { min: -70, enabled: true }
    } as AlertThresholds,
    
    // Maintenance
    maintenanceInterval: 90,
    nextMaintenance: '',
    
    // Advanced Settings
    dataRetention: 365,
    autoRestart: false,
    powerSaving: false
  });

  const deviceTypes = [
    'Temperature Sensor',
    'Humidity Sensor',
    'Air Quality Monitor',
    'Motion Sensor',
    'Light Sensor',
    'Pressure Sensor',
    'Flow Meter',
    'Level Sensor',
    'Custom'
  ];

  const networkProtocols = [
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'ethernet', label: 'Ethernet', icon: Activity },
    { id: 'cellular', label: 'Cellular', icon: Signal },
    { id: 'bluetooth', label: 'Bluetooth', icon: Activity },
    { id: 'zigbee', label: 'Zigbee', icon: Activity }
  ];

  const locations = [
    'Building A, Floor 1',
    'Building A, Floor 2',
    'Building A, Floor 3',
    'Building B, Floor 1',
    'Building B, Floor 2',
    'Building C, Floor 1',
    'Warehouse',
    'Outdoor',
    'Custom'
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child, subchild] = field.split('.');
      if (subchild) {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent as keyof typeof prev] as any,
            [child]: {
              ...(prev[parent as keyof typeof prev] as any)[child],
              [subchild]: value
            }
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent as keyof typeof prev] as any,
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleTagChange = (tags: string) => {
    const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({ ...prev, tags: tagArray }));
  };

  const addThreshold = (type: string) => {
    const newThreshold: AlertThreshold = { min: 0, max: 100, enabled: true };
    setFormData(prev => ({
      ...prev,
      alertThresholds: {
        ...prev.alertThresholds,
        [type]: newThreshold
      }
    }));
  };

  const removeThreshold = (type: string) => {
    const newThresholds = { ...formData.alertThresholds };
    delete newThresholds[type];
    setFormData(prev => ({
      ...prev,
      alertThresholds: newThresholds
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    router.push('/organization/devices');
  };

  const nextStep = () => setActiveStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setActiveStep(prev => Math.max(prev - 1, 1));

  const steps = [
    { id: 1, title: 'Basic Information', icon: Activity },
    { id: 2, title: 'Technical Details', icon: Settings },
    { id: 3, title: 'Monitoring Setup', icon: Database },
    { id: 4, title: 'Review & Save', icon: CheckCircle }
  ];

  return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => router.back()}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Add New Device</h1>
              <p className="text-gray-600 mt-1">Configure and add a new IoT device to your network</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  activeStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {activeStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  activeStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    activeStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Basic Information */}
          {activeStep === 1 && (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Device Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Temperature Sensor 1A"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Device Type *
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select device type</option>
                    {deviceTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the device and its purpose..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <select
                    required
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select location</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    value={formData.tags.join(', ')}
                    onChange={(e) => handleTagChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Temperature, Critical, Building A"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Technical Details */}
          {activeStep === 2 && (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Technical Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Manufacturer
                  </label>
                  <input
                    type="text"
                    value={formData.manufacturer}
                    onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., IoT Solutions Inc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model
                  </label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., TS-2000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Serial Number
                  </label>
                  <input
                    type="text"
                    value={formData.serialNumber}
                    onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., TS2000-001A-2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Firmware Version
                  </label>
                  <input
                    type="text"
                    value={formData.firmware}
                    onChange={(e) => handleInputChange('firmware', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., v2.1.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IP Address
                  </label>
                  <input
                    type="text"
                    value={formData.ipAddress}
                    onChange={(e) => handleInputChange('ipAddress', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 192.168.1.101"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    MAC Address
                  </label>
                  <input
                    type="text"
                    value={formData.macAddress}
                    onChange={(e) => handleInputChange('macAddress', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 00:1B:44:11:3A:B7"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Network Protocol
                  </label>
                  <select
                    value={formData.networkProtocol}
                    onChange={(e) => handleInputChange('networkProtocol', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {networkProtocols.map((protocol) => (
                      <option key={protocol.id} value={protocol.id}>{protocol.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Port
                  </label>
                  <input
                    type="text"
                    value={formData.port}
                    onChange={(e) => handleInputChange('port', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 8080"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Monitoring Setup */}
          {activeStep === 3 && (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Monitoring Setup</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monitoring Interval (seconds)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="3600"
                    value={formData.monitoringInterval}
                    onChange={(e) => handleInputChange('monitoringInterval', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">How often to collect data from the device</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alert Thresholds
                  </label>
                  <div className="space-y-4">
                    {Object.entries(formData.alertThresholds).map(([type, threshold]) => (
                      <div key={type} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900 capitalize">{type}</h4>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={threshold.enabled}
                              onChange={(e) => handleInputChange(`alertThresholds.${type}.enabled`, e.target.checked)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => removeThreshold(type)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        {threshold.enabled && (
                          <div className="grid grid-cols-2 gap-4">
                            {type === 'battery' || type === 'signal' ? (
                              <div>
                                <label className="block text-xs text-gray-600 mb-1">Minimum</label>
                                <input
                                  type="number"
                                  value={threshold.min}
                                  onChange={(e) => handleInputChange(`alertThresholds.${type}.min`, parseFloat(e.target.value))}
                                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                            ) : (
                              <>
                                <div>
                                  <label className="block text-xs text-gray-600 mb-1">Minimum</label>
                                  <input
                                    type="number"
                                    value={threshold.min}
                                    onChange={(e) => handleInputChange(`alertThresholds.${type}.min`, parseFloat(e.target.value))}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-600 mb-1">Maximum</label>
                                  <input
                                    type="number"
                                    value={threshold.max || 0}
                                    onChange={(e) => handleInputChange(`alertThresholds.${type}.max`, parseFloat(e.target.value))}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => addThreshold('custom')}
                    className="mt-3 flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Custom Threshold</span>
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maintenance Interval (days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={formData.maintenanceInterval}
                    onChange={(e) => handleInputChange('maintenanceInterval', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Next Maintenance Date
                  </label>
                  <input
                    type="date"
                    value={formData.nextMaintenance}
                    onChange={(e) => handleInputChange('nextMaintenance', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Save */}
          {activeStep === 4 && (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Review & Save</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Basic Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{formData.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">{formData.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tags:</span>
                        <span className="font-medium">{formData.tags.join(', ') || 'None'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Technical Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Manufacturer:</span>
                        <span className="font-medium">{formData.manufacturer || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Model:</span>
                        <span className="font-medium">{formData.model || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">IP Address:</span>
                        <span className="font-medium">{formData.ipAddress || 'Auto-assign'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Protocol:</span>
                        <span className="font-medium capitalize">{formData.networkProtocol}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Monitoring Configuration</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monitoring Interval:</span>
                      <span className="font-medium">{formData.monitoringInterval} seconds</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maintenance Interval:</span>
                      <span className="font-medium">{formData.maintenanceInterval} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Thresholds:</span>
                      <span className="font-medium">
                        {Object.values(formData.alertThresholds).filter(t => t.enabled).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t">
            <button
              type="button"
              onClick={prevStep}
              disabled={activeStep === 1}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => router.push('/organization/devices')}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>

              {activeStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Device</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
  );
}
