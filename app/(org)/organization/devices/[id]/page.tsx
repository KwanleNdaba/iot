"use client"
import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  Database,
  Wifi,
  WifiOff,
  Clock,
  Thermometer,
  Battery,
  Signal,
  MapPin,
  Settings,
  Eye,
  Edit3,
  Trash2,
  RefreshCw,
  Download,
  Upload,
  ArrowLeft,
  BarChart3,
  LineChart,
  Calendar,
  Wrench,
  History,
  AlertCircle,
  Zap,
  Shield,
  Gauge,
  Globe,
  HardDrive,
  Network,
  Cpu
} from 'lucide-react';

export default function DeviceDetailPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDevice] = useState('DEV-001'); // Simulating device selection

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock device data - in real app, this would come from API
  const device = {
    id: selectedDevice,
    name: 'Temperature Sensor 1A',
    type: 'Temperature Sensor',
    status: 'online',
    location: 'Building A, Floor 2',
    lastSeen: '2 min ago',
    uptime: 99.8,
    responseTime: 42,
    battery: 85,
    signal: -45,
    temperature: 24.5,
    humidity: 45,
    alerts: 2,
    firmware: 'v2.1.0',
    ipAddress: '192.168.1.101',
    macAddress: '00:1B:44:11:3A:B7',
    manufacturer: 'IoT Solutions Inc.',
    model: 'TS-2000',
    serialNumber: 'TS2000-001A-2024',
    installationDate: '2024-01-15',
    lastMaintenance: '2024-03-01',
    nextMaintenance: '2024-06-01',
    dataPoints: 1250000,
    lastAlert: 'Temperature exceeded threshold (28°C > 25°C)',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    description: 'High-precision temperature sensor with humidity monitoring capabilities',
    tags: ['Temperature', 'Humidity', 'Building A', 'Critical'],
    alertThresholds: {
      temperature: { min: 18, max: 25 },
      humidity: { min: 30, max: 60 }
    },
    maintenanceHistory: [
      { date: '2024-03-01', type: 'Calibration', technician: 'John Smith', notes: 'Routine calibration completed' },
      { date: '2024-01-15', type: 'Installation', technician: 'Mike Johnson', notes: 'Initial device installation' }
    ],
    recentAlerts: [
      { time: '2 min ago', message: 'Temperature exceeded threshold (28°C > 25°C)', severity: 'high' },
      { time: '1 hour ago', message: 'Humidity below threshold (25% < 30%)', severity: 'medium' }
    ]
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'online':
        return { color: 'bg-green-500', text: 'Online', icon: Wifi };
      case 'offline':
        return { color: 'bg-red-500', text: 'Offline', icon: WifiOff };
      case 'maintenance':
        return { color: 'bg-yellow-500', text: 'Maintenance', icon: Clock };
      default:
        return { color: 'bg-gray-500', text: 'Unknown', icon: AlertTriangle };
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 80) return 'text-green-600';
    if (battery > 50) return 'text-yellow-600';
    if (battery > 20) return 'text-orange-600';
    return 'text-red-600';
  };

  const getSignalColor = (signal: number) => {
    if (signal > -50) return 'text-green-600';
    if (signal > -60) return 'text-yellow-600';
    if (signal > -70) return 'text-orange-600';
    return 'text-red-600';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const statusInfo = getStatusInfo(device.status);
  const StatusIcon = statusInfo.icon;

  const handleBack = () => {
    // In a real app, this would navigate back to the devices list
    console.log('Navigate back to devices list');
  };

  return (
    <div className="w-full max-w-none bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleBack}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                <Activity className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {device.name}
                </h1>
                <div className="flex items-center space-x-3 text-sm text-gray-600 mt-0.5">
                  <span>ID: {device.id}</span>
                  <span>•</span>
                  <span>{device.location}</span>
                  <span>•</span>
                  <span>Last seen: {device.lastSeen}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${
                device.status === 'online' ? 'bg-green-100 text-green-800 border-green-200' :
                device.status === 'offline' ? 'bg-red-100 text-red-800 border-red-200' :
                'bg-yellow-100 text-yellow-800 border-yellow-200'
              }`}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {statusInfo.text}
              </span>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <nav className="flex space-x-6 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'monitoring', label: 'Monitoring', icon: Activity },
              { id: 'configuration', label: 'Configuration', icon: Settings },
              { id: 'maintenance', label: 'Maintenance', icon: Wrench },
              { id: 'alerts', label: 'Alerts', icon: AlertCircle }
            ].map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Uptime</p>
                    <p className="text-2xl font-semibold text-gray-900">{device.uptime}%</p>
                    <p className="text-xs text-blue-600 font-medium">Operational</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Gauge className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Response</p>
                    <p className="text-2xl font-semibold text-gray-900">{device.responseTime}ms</p>
                    <p className="text-xs text-green-600 font-medium">Optimal</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Database className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Data Points</p>
                    <p className="text-2xl font-semibold text-gray-900">{device.dataPoints.toLocaleString()}</p>
                    <p className="text-xs text-purple-600 font-medium">Collected</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Alerts</p>
                    <p className="text-2xl font-semibold text-gray-900">{device.alerts}</p>
                    <p className="text-xs text-orange-600 font-medium">Active</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Device Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Device Type', value: device.type },
                    { label: 'Location', value: device.location },
                    { label: 'Manufacturer', value: device.manufacturer },
                    { label: 'Model', value: device.model },
                    { label: 'Serial Number', value: device.serialNumber },
                    { label: 'Firmware Version', value: device.firmware }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-500">{item.label}:</span>
                      <span className="font-medium text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Network & Technical Details */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Network & Technical</h3>
                <div className="space-y-3">
                  {[
                    { label: 'IP Address', value: device.ipAddress },
                    { label: 'MAC Address', value: device.macAddress },
                    { label: 'Battery Level', value: `${device.battery}%` },
                    { label: 'Signal Strength', value: `${device.signal} dBm` },
                    { label: 'Last Seen', value: device.lastSeen },
                    { label: 'Installation Date', value: device.installationDate }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-500">{item.label}:</span>
                      <span className="font-medium text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Readings */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Current Readings</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500">Live data</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Thermometer className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{device.temperature}°C</p>
                  <p className="text-sm font-medium text-gray-600">Temperature</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Range: {device.alertThresholds.temperature.min}°C - {device.alertThresholds.temperature.max}°C
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Database className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{device.humidity}%</p>
                  <p className="text-sm font-medium text-gray-600">Humidity</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Range: {device.alertThresholds.humidity.min}% - {device.alertThresholds.humidity.max}%
                  </p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Signal className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{device.signal} dBm</p>
                  <p className="text-sm font-medium text-gray-600">Signal Strength</p>
                  <p className={`text-xs mt-1 ${getSignalColor(device.signal)}`}>
                    {device.signal > -50 ? 'Excellent' : device.signal > -60 ? 'Good' : device.signal > -70 ? 'Fair' : 'Poor'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="text-lg font-semibold text-gray-900">Real-time Data Monitoring</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Last updated: {currentTime.toLocaleTimeString()}</span>
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Real-time Monitoring</h4>
                <p className="text-gray-600 mb-4">Live charts and data visualization would be displayed here</p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Live data streaming</span>
                  </div>
                  <span>•</span>
                  <span>Auto-refresh every 5s</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'configuration' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Device Configuration</h3>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Save Changes
              </button>
            </div>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Configuration Panel</h4>
                <p className="text-gray-600 mb-4">Device settings, thresholds, and operational parameters</p>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Thermometer className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>Temperature Settings</span>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <AlertTriangle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Alert Thresholds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="space-y-6">
            {/* Maintenance Schedule */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Maintenance Schedule</h3>
                <button className="px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 transition-colors">
                  Schedule Maintenance
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Next Maintenance</h4>
                      <p className="text-sm text-gray-600">Scheduled Date</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-2">{device.nextMaintenance}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>In 3 months</span>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Last Maintenance</h4>
                      <p className="text-sm text-gray-600">Completed</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-2">{device.lastMaintenance}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Successfully completed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Maintenance History */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Maintenance History</h3>
                <button className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
                  Export History
                </button>
              </div>
              <div className="space-y-4">
                {device.maintenanceHistory.map((maintenance, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Wrench className="w-4 h-4 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">{maintenance.type}</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Technician:</span> {maintenance.technician}
                      </div>
                      <div>
                        <span className="font-medium">Date:</span> {maintenance.date}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 p-3 bg-white rounded-lg border border-gray-200">
                      {maintenance.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-6">
            {/* Recent Alerts */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                    {device.recentAlerts.length} active
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                    Acknowledge All
                  </button>
                  <button className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
                    View All Alerts
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {device.recentAlerts.map((alert, index) => (
                  <div key={index} className={`p-4 rounded-lg border transition-all duration-200 ${
                    alert.severity === 'high' 
                      ? 'bg-red-50 border-red-200' 
                      : alert.severity === 'medium'
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`p-2 rounded-lg ${
                            alert.severity === 'high' ? 'bg-red-100 text-red-600' :
                            alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            <AlertTriangle className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{alert.message}</h4>
                            <p className="text-sm text-gray-600">{alert.time}</p>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                        alert.severity === 'high' ? 'text-red-600 bg-red-100 border-red-200' :
                        alert.severity === 'medium' ? 'text-yellow-600 bg-yellow-100 border-yellow-200' :
                        'text-blue-600 bg-blue-100 border-blue-200'
                      }`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alert Thresholds */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Alert Thresholds</h3>
                <button className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors">
                  Edit Thresholds
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Thermometer className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Temperature Thresholds</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-white rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-600 font-medium">Minimum</p>
                      <p className="text-xl font-bold text-gray-900">{device.alertThresholds.temperature.min}°C</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-600 font-medium">Maximum</p>
                      <p className="text-xl font-bold text-gray-900">{device.alertThresholds.temperature.max}°C</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Database className="w-5 h-5 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Humidity Thresholds</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-white rounded-lg border border-green-200">
                      <p className="text-sm text-green-600 font-medium">Minimum</p>
                      <p className="text-xl font-bold text-gray-900">{device.alertThresholds.humidity.min}%</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-green-200">
                      <p className="text-sm text-green-600 font-medium">Maximum</p>
                      <p className="text-xl font-bold text-gray-900">{device.alertThresholds.humidity.max}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}