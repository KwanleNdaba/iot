'use client';

import { useState, useEffect } from 'react';
import { 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  Database,
  Wifi,
  WifiOff,
  TrendingUp,
  TrendingDown,
  Clock,
  Thermometer,
  Battery,
  Signal,
  MapPin,
  BarChart3,
  Settings,
  Layers,
  Filter,
  Eye,
  Building,
  Zap,
  Plus,
  ArrowUpRight,
  Star,
  Bell,
  Shield,
  Globe,
  Gauge,
  Cpu,
  HardDrive
} from 'lucide-react';

export default function OrganizationDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedDeviceType, setSelectedDeviceType] = useState('all');

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock organization and location data
  const locations = [
    { id: 'all', name: 'All Locations', deviceCount: 247 },
    { id: 'building-a', name: 'Building A', deviceCount: 89 },
    { id: 'building-b', name: 'Building B', deviceCount: 76 },
    { id: 'building-c', name: 'Building C', deviceCount: 82 }
  ];

  const deviceTypes = [
    { id: 'all', name: 'All Device Types', count: 247 },
    { id: 'temperature', name: 'Temperature Sensors', count: 95 },
    { id: 'humidity', name: 'Humidity Sensors', count: 78 },
    { id: 'motion', name: 'Motion Detectors', count: 45 },
    { id: 'air-quality', name: 'Air Quality Monitors', count: 29 }
  ];

  // Enhanced KPI data with device attribution
  const kpiData = {
    totalDevices: 247,
    activeDevices: 234,
    pendingAlerts: 12,
    dataPointsToday: '2.4M',
    uptime: '99.7%',
    avgResponseTime: '45ms',
    locationsMonitored: 3,
    sensorsTypes: 4
  };

  const deviceStatusData = [
    { status: 'Online', count: 234, color: 'bg-emerald-500', icon: Wifi, percentage: 94.7 },
    { status: 'Offline', count: 8, color: 'bg-red-500', icon: WifiOff, percentage: 3.2 },
    { status: 'Maintenance', count: 5, color: 'bg-amber-500', icon: Clock, percentage: 2.1 }
  ];

  // Enhanced temperature data with device sources
  const temperatureData = [
    { time: '00:00', avgTemp: 22.5, avgHumidity: 45, trend: 'stable' },
    { time: '04:00', avgTemp: 21.8, avgHumidity: 48, trend: 'down' },
    { time: '08:00', avgTemp: 23.2, avgHumidity: 42, trend: 'up' },
    { time: '12:00', avgTemp: 25.1, avgHumidity: 38, trend: 'up' },
    { time: '16:00', avgTemp: 24.7, avgHumidity: 40, trend: 'down' },
    { time: '20:00', avgTemp: 23.9, avgHumidity: 43, trend: 'stable' }
  ];

  const topPerformingDevices = [
    { name: 'TEMP-A-001', type: 'Temperature', location: 'Building A, Floor 2', uptime: 99.8, responseTime: 42, status: 'excellent' },
    { name: 'HUM-B-003', type: 'Humidity', location: 'Building B, Floor 1', uptime: 99.6, responseTime: 38, status: 'excellent' },
    { name: 'MOTION-C-007', type: 'Motion', location: 'Building C, Floor 3', uptime: 99.2, responseTime: 45, status: 'good' },
    { name: 'AIR-A-012', type: 'Air Quality', location: 'Building A, Floor 1', uptime: 98.9, responseTime: 51, status: 'good' }
  ];

  const recentAlerts = [
    { 
      time: '2 min ago', 
      device: 'TEMP-A-001', 
      deviceType: 'Temperature Sensor',
      message: 'Temperature exceeded threshold (28°C > 25°C)', 
      severity: 'high',
      location: 'Building A, Floor 2',
      status: 'active'
    },
    { 
      time: '5 min ago', 
      device: 'HUM-B-003', 
      deviceType: 'Humidity Sensor',
      message: 'Device offline - No response for 15 minutes', 
      severity: 'medium',
      location: 'Building B, Floor 1',
      status: 'acknowledged'
    },
    { 
      time: '12 min ago', 
      device: 'TEMP-C-015', 
      deviceType: 'Temperature Sensor',
      message: 'Battery low - 15% remaining', 
      severity: 'low',
      location: 'Building C, Floor 3',
      status: 'resolved'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-500';
      case 'acknowledged': return 'bg-amber-500';
      case 'resolved': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  const getDeviceTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'temperature': return Thermometer;
      case 'humidity': return Database;
      case 'motion': return Activity;
      case 'air quality': return Zap;
      default: return Activity;
    }
  };

  const getPerformanceColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'fair': return 'text-amber-600 bg-amber-50 border-amber-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Page Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Organization Dashboard</h1>
                    <p className="text-gray-600 mt-1">
                      Monitor your complete IoT ecosystem across {kpiData.locationsMonitored} locations with {kpiData.totalDevices} devices
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span>Live • Updated {currentTime.toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                    <span className="text-gray-600">{kpiData.sensorsTypes} sensor types active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">{kpiData.uptime} system uptime</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl group">
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  <span className="font-medium">Add Device</span>
                </button>
                <button className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center space-x-2 shadow-sm">
                  <Filter className="w-5 h-5" />
                  <span className="font-medium">Filter View</span>
                </button>
              </div>
            </div>

            {/* Enhanced Filters */}
            <div className="mt-8 flex items-center space-x-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-700 block">Location</span>
                  <select 
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="text-sm border-0 bg-transparent font-medium text-gray-900 focus:ring-0 p-0"
                  >
                    {locations.map(location => (
                      <option key={location.id} value={location.id}>
                        {location.name} ({location.deviceCount})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="w-px h-8 bg-gray-300"></div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Layers className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-700 block">Device Type</span>
                  <select 
                    value={selectedDeviceType}
                    onChange={(e) => setSelectedDeviceType(e.target.value)}
                    className="text-sm border-0 bg-transparent font-medium text-gray-900 focus:ring-0 p-0"
                  >
                    {deviceTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name} ({type.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-transparent transition-all duration-300"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors shadow-sm">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-600">+5.2%</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Devices</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">{kpiData.totalDevices}</p>
                <p className="text-xs text-gray-500">Across {kpiData.locationsMonitored} locations</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 to-emerald-600/0 group-hover:from-emerald-600/5 group-hover:to-transparent transition-all duration-300"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors shadow-sm">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-600">+2.1%</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Devices</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">{kpiData.activeDevices}</p>
                <p className="text-xs text-emerald-600 font-medium">{((kpiData.activeDevices / kpiData.totalDevices) * 100).toFixed(1)}% operational</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 to-red-600/0 group-hover:from-red-600/5 group-hover:to-transparent transition-all duration-300"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200 transition-colors shadow-sm">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-red-600">-1.3%</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Alerts</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">{kpiData.pendingAlerts}</p>
                <p className="text-xs text-red-600 font-medium">Needs attention</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-purple-600/0 group-hover:from-purple-600/5 group-hover:to-transparent transition-all duration-300"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors shadow-sm">
                  <Database className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-600">+12.5%</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Data Points Today</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">{kpiData.dataPointsToday}</p>
                <p className="text-xs text-purple-600 font-medium">From all sensors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Temperature Trends Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-all duration-300 group overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Temperature & Humidity Trends</h3>
                <p className="text-sm text-gray-600">
                  Real-time monitoring across 95 temperature sensors and 78 humidity sensors
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"></div>
                  <span className="text-sm font-medium text-gray-700">Temperature</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full shadow-sm"></div>
                  <span className="text-sm font-medium text-gray-700">Humidity</span>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="h-80 flex items-end justify-between space-x-4 bg-gradient-to-t from-gray-50/50 to-transparent rounded-xl p-4">
                {temperatureData.map((point, index) => {
                  const tempHeight = (point.avgTemp / 30) * 200;
                  const humidityHeight = (point.avgHumidity / 100) * 200;
                  
                  return (
                    <div key={index} className="flex flex-col items-center space-y-4 group/bar">
                      <div className="flex flex-col items-center space-y-2">
                        <div 
                          className="w-8 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 cursor-pointer shadow-lg group-hover/bar:shadow-xl relative"
                          style={{ height: `${tempHeight}px` }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                            {point.avgTemp}°C
                          </div>
                        </div>
                        <div 
                          className="w-8 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg hover:from-emerald-600 hover:to-emerald-500 transition-all duration-300 cursor-pointer shadow-lg group-hover/bar:shadow-xl relative"
                          style={{ height: `${humidityHeight}px` }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                            {point.avgHumidity}%
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="text-xs font-medium text-gray-700 block">{point.time}</span>
                        <div className="flex items-center justify-center mt-1">
                          <span className="text-xs font-bold text-gray-900">{point.avgTemp}°C</span>
                          <span className="text-xs text-gray-500 ml-2">{point.avgHumidity}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Enhanced Device Status Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Device Status</h3>
                <p className="text-sm text-gray-600">Real-time operational overview</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Gauge className="w-6 h-6 text-gray-600" />
              </div>
            </div>
            
            <div className="space-y-6">
              {deviceStatusData.map((status, index) => {
                const Icon = status.icon;
                
                return (
                  <div key={index} className="group/status">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${status.color.replace('bg-', 'bg-').replace('-500', '-100')} group-hover/status:shadow-lg transition-all duration-300`}>
                          <Icon className={`w-5 h-5 ${status.color.replace('bg-', 'text-')}`} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{status.status}</p>
                          <p className="text-xs text-gray-500">{status.percentage.toFixed(1)}% of total</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">{status.count}</p>
                        <p className="text-xs text-gray-500">devices</p>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-3 ${status.color} rounded-full transition-all duration-500 shadow-sm`}
                        style={{ width: `${status.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
              <div className="flex items-center space-x-2 mb-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-gray-900">Network Health</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-600">Avg Response:</span>
                  <span className="font-semibold text-gray-900 ml-1">{kpiData.avgResponseTime}</span>
                </div>
                <div>
                  <span className="text-gray-600">Uptime:</span>
                  <span className="font-semibold text-emerald-600 ml-1">{kpiData.uptime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Device Performance & Alerts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Top Performing Devices */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Top Performing Devices</h3>
                <p className="text-sm text-gray-600">Highest uptime and best response times</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center space-x-1 group">
                <span>View All</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
            
            <div className="space-y-4">
              {topPerformingDevices.map((device, index) => {
                const DeviceIcon = getDeviceTypeIcon(device.type);
                return (
                  <div key={index} className="group/device p-4 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 border border-transparent hover:border-blue-100 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover/device:bg-blue-200 transition-colors shadow-sm">
                          <DeviceIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h4 className="font-semibold text-gray-900">{device.name}</h4>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPerformanceColor(device.status)}`}>
                              {device.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{device.type} Sensor</p>
                          <p className="text-xs text-gray-500 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {device.location}
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <p className="text-xs text-gray-600 font-medium">Uptime</p>
                            <p className="text-lg font-bold text-emerald-600">{device.uptime}%</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-600 font-medium">Response</p>
                            <p className="text-lg font-bold text-blue-600">{device.responseTime}ms</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced Recent Alerts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Recent Alerts</h3>
                <p className="text-sm text-gray-600">Latest issues requiring attention</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-red-600" />
                </div>
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center space-x-1 group">
                  <span>View All ({recentAlerts.length})</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {recentAlerts.map((alert, index) => {
                const DeviceIcon = getDeviceTypeIcon(alert.deviceType.split(' ')[0]);
                return (
                  <div key={index} className="group/alert border border-gray-200 rounded-xl p-5 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:border-blue-200 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover/alert:bg-blue-100 transition-colors">
                          <DeviceIcon className="w-5 h-5 text-gray-600 group-hover/alert:text-blue-600" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusIndicator(alert.status)}`}></div>
                          <span className="text-xs font-medium text-gray-500">{alert.time}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                            {alert.severity.toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-gray-900 text-sm">{alert.device}</h4>
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded border">
                              {alert.deviceType}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{alert.message}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <MapPin className="w-3 h-3" />
                            <span>{alert.location}</span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-800 font-medium text-xs flex items-center space-x-1 group/button">
                            <span>View Details</span>
                            <ArrowUpRight className="w-3 h-3 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-semibold text-amber-900">Alert Summary</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="text-center">
                  <div className="text-red-600 font-bold text-lg">{recentAlerts.filter(a => a.severity === 'high').length}</div>
                  <div className="text-gray-600">High Priority</div>
                </div>
                <div className="text-center">
                  <div className="text-amber-600 font-bold text-lg">{recentAlerts.filter(a => a.severity === 'medium').length}</div>
                  <div className="text-gray-600">Medium Priority</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 font-bold text-lg">{recentAlerts.filter(a => a.severity === 'low').length}</div>
                  <div className="text-gray-600">Low Priority</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions Panel */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Quick Actions</h3>
              <p className="text-blue-700">Streamline your workflow with one-click actions</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="group bg-white p-6 rounded-xl border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-left">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <Plus className="w-6 h-6 text-blue-600 group-hover:rotate-90 transition-transform duration-300" />
              </div>
              <h4 className="font-semibold text-blue-900 mb-2">Add New Device</h4>
              <p className="text-sm text-blue-700">Register and configure new IoT devices</p>
            </button>
            
            <button className="group bg-white p-6 rounded-xl border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-left">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="font-semibold text-blue-900 mb-2">Create Dashboard</h4>
              <p className="text-sm text-blue-700">Build custom monitoring views</p>
            </button>
            
            <button className="group bg-white p-6 rounded-xl border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-left">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <Layers className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-blue-900 mb-2">Browse Modules</h4>
              <p className="text-sm text-blue-700">Explore additional functionality</p>
            </button>
            
            <button className="group bg-white p-6 rounded-xl border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-left">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <Settings className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-blue-900 mb-2">Configure Alerts</h4>
              <p className="text-sm text-blue-700">Set up monitoring thresholds</p>
            </button>
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2 text-blue-700">
              <Cpu className="w-4 h-4" />
              <span>System Status: Optimal</span>
            </div>
            <div className="w-px h-4 bg-blue-300"></div>
            <div className="flex items-center space-x-2 text-blue-700">
              <HardDrive className="w-4 h-4" />
              <span>Storage: 78% Available</span>
            </div>
            <div className="w-px h-4 bg-blue-300"></div>
            <div className="flex items-center space-x-2 text-blue-700">
              <Signal className="w-4 h-4" />
              <span>Network: Stable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}