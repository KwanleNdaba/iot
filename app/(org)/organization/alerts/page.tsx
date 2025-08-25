'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Filter, 
  Search, 
  Download, 
  RefreshCw, 
  Eye, 
  Settings, 
  X,
  Activity,
  Shield,
  Zap,
  Wrench,
  Battery,
  Wifi,
  Heart,
  ChevronDown,
  ChevronUp,
  Calendar,
  ArrowLeft,
  Gauge
} from 'lucide-react';

// Mock alerts data for all medical devices
const allDeviceAlerts = [
  {
    id: 1,
    deviceId: 'dialysis-01',
    deviceName: 'Fresenius 5008S Dialysis Machine',
    deviceType: 'Dialysis Machine',
    location: 'Dialysis Unit, Floor 2',
    message: 'Transmembrane Pressure Alarm - TMP exceeded 300 mmHg during treatment',
    description: 'The transmembrane pressure has exceeded the safe operating threshold. This could indicate filter clogging or excessive fluid removal rate.',
    severity: 'critical',
    type: 'pressure',
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    acknowledged: false,
    resolvedAt: null,
    actions: ['Stop Treatment', 'Check Filter', 'Adjust UF Rate'],
    parameters: { pressure: '320 mmHg', threshold: '300 mmHg' }
  },
  {
    id: 2,
    deviceId: 'dialysis-01',
    deviceName: 'Fresenius 5008S Dialysis Machine',
    deviceType: 'Dialysis Machine',
    location: 'Dialysis Unit, Floor 2',
    message: 'Blood Leak Detected - Optical sensor triggered in dialyzer',
    description: 'Blood leak detection system has identified potential blood in the dialysate. Treatment must be stopped immediately.',
    severity: 'critical',
    type: 'safety',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    acknowledged: true,
    resolvedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
    actions: ['Emergency Stop', 'Replace Dialyzer', 'Check Connections'],
    parameters: { optical_reading: '0.85', threshold: '0.3' }
  },
  {
    id: 3,
    deviceId: 'dialysis-02',
    deviceName: 'Baxter AK 98 Dialysis System',
    deviceType: 'Dialysis Machine',
    location: 'Dialysis Unit, Floor 2',
    message: 'Maintenance Required - Filter replacement due',
    description: 'Scheduled maintenance window has arrived. Filter should be replaced before next treatment session.',
    severity: 'warning',
    type: 'maintenance',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    acknowledged: false,
    resolvedAt: null,
    actions: ['Schedule Maintenance', 'Replace Filter', 'Update Records'],
    parameters: { filter_hours: '240', max_hours: '240' }
  },
  {
    id: 4,
    deviceId: 'ventilator-01',
    deviceName: 'Philips Respironics V680 Ventilator',
    deviceType: 'Ventilator',
    location: 'ICU, Floor 3',
    message: 'High Pressure Alarm - Airway resistance increased',
    description: 'Peak inspiratory pressure has exceeded set limits. Check for airway obstruction or patient-ventilator asynchrony.',
    severity: 'critical',
    type: 'pressure',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    acknowledged: false,
    resolvedAt: null,
    actions: ['Check Airways', 'Adjust Settings', 'Call Respiratory Therapist'],
    parameters: { peak_pressure: '45 cmH2O', limit: '35 cmH2O' }
  },
  {
    id: 5,
    deviceId: 'monitor-01',
    deviceName: 'GE CARESCAPE B650 Patient Monitor',
    deviceType: 'Patient Monitor',
    location: 'ICU, Floor 3',
    message: 'Battery Level Critical - 15% remaining',
    description: 'Patient monitor battery is critically low. Connect to AC power immediately to prevent data loss.',
    severity: 'warning',
    type: 'power',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    acknowledged: false,
    resolvedAt: null,
    actions: ['Connect AC Power', 'Replace Battery', 'Check Power Cable'],
    parameters: { battery_level: '15%', critical_threshold: '20%' }
  },
  {
    id: 6,
    deviceId: 'xray-01',
    deviceName: 'Siemens Ysio Max X-Ray System',
    deviceType: 'X-Ray System',
    location: 'Radiology, Floor 1',
    message: 'System Calibration Required - Image quality below standard',
    description: 'Image quality parameters have degraded below acceptable standards. System calibration is required.',
    severity: 'critical',
    type: 'calibration',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    acknowledged: true,
    resolvedAt: null,
    actions: ['Run Calibration', 'Contact Service', 'Postpone Non-Critical Scans'],
    parameters: { image_quality: '72%', minimum_threshold: '85%' }
  },
  {
    id: 7,
    deviceId: 'infusion-01',
    deviceName: 'B. Braun Infusomat Space Infusion Pump',
    deviceType: 'Infusion Pump',
    location: 'Medical Ward, Floor 1',
    message: 'Occlusion Detected - Downstream pressure high',
    description: 'High pressure detected in infusion line. Check for kinked tubing or IV site infiltration.',
    severity: 'warning',
    type: 'occlusion',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    acknowledged: true,
    resolvedAt: new Date(Date.now() - 45 * 60 * 1000),
    actions: ['Check IV Site', 'Replace Tubing', 'Adjust Position'],
    parameters: { pressure: '890 mmHg', threshold: '800 mmHg' }
  },
  {
    id: 8,
    deviceId: 'defibrillator-01',
    deviceName: 'Philips HeartStart FRx Defibrillator',
    deviceType: 'Defibrillator',
    location: 'Emergency Department, Floor 1',
    message: 'Self-Test Failed - Electrode pads expired',
    description: 'Daily self-test has failed. Electrode pads have expired and need immediate replacement.',
    severity: 'critical',
    type: 'maintenance',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    acknowledged: false,
    resolvedAt: null,
    actions: ['Replace Electrode Pads', 'Run Self-Test', 'Update Maintenance Log'],
    parameters: { expiry_date: '2024-03-15', current_date: '2024-03-20' }
  }
];

const alertTypeFilters = [
  { id: 'all', label: 'All Types', count: allDeviceAlerts.length },
  { id: 'pressure', label: 'Pressure Alarms', count: allDeviceAlerts.filter(a => a.type === 'pressure').length },
  { id: 'safety', label: 'Safety Alerts', count: allDeviceAlerts.filter(a => a.type === 'safety').length },
  { id: 'maintenance', label: 'Maintenance', count: allDeviceAlerts.filter(a => a.type === 'maintenance').length },
  { id: 'power', label: 'Power Issues', count: allDeviceAlerts.filter(a => a.type === 'power').length },
  { id: 'calibration', label: 'Calibration', count: allDeviceAlerts.filter(a => a.type === 'calibration').length },
  { id: 'occlusion', label: 'Occlusion', count: allDeviceAlerts.filter(a => a.type === 'occlusion').length }
];

const severityFilters = [
  { id: 'all', label: 'All Severities', count: allDeviceAlerts.length },
  { id: 'critical', label: 'Critical', count: allDeviceAlerts.filter(a => a.severity === 'critical').length },
  { id: 'warning', label: 'Warning', count: allDeviceAlerts.filter(a => a.severity === 'warning').length },
  { id: 'info', label: 'Info', count: allDeviceAlerts.filter(a => a.severity === 'info').length }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'bg-red-100 text-red-800 border-red-200';
    case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'pressure': return Gauge;
    case 'safety': return Shield;
    case 'maintenance': return Wrench;
    case 'power': return Battery;
    case 'calibration': return Settings;
    case 'occlusion': return AlertTriangle;
    default: return Activity;
  }
};

export default function AlertsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');
  const [expandedAlert, setExpandedAlert] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const handleBack = () => {
    router.back();
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const filteredAlerts = allDeviceAlerts.filter(alert => {
    const matchesSearch = alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const matchesType = selectedType === 'all' || alert.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' && !alert.resolvedAt) ||
                         (selectedStatus === 'resolved' && alert.resolvedAt);
    
    return matchesSearch && matchesSeverity && matchesType && matchesStatus;
  });

  const sortedAlerts = [...filteredAlerts].sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortBy) {
      case 'timestamp':
        aValue = a.timestamp.getTime();
        bValue = b.timestamp.getTime();
        break;
      case 'severity':
        const severityOrder = { 'critical': 3, 'warning': 2, 'info': 1 };
        aValue = severityOrder[a.severity as keyof typeof severityOrder];
        bValue = severityOrder[b.severity as keyof typeof severityOrder];
        break;
      case 'device':
        aValue = a.deviceName.toLowerCase();
        bValue = b.deviceName.toLowerCase();
        break;
      default:
        aValue = a.message.toLowerCase();
        bValue = b.message.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const acknowledgeAlert = (alertId: number) => {
    // In real implementation, this would make an API call
    console.log('Acknowledging alert:', alertId);
  };

  const resolveAlert = (alertId: number) => {
    // In real implementation, this would make an API call
    console.log('Resolving alert:', alertId);
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
              <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Device Alerts & Notifications
                </h1>
                <div className="flex items-center space-x-3 text-sm text-gray-600 mt-0.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span>Live Alert Feed</span>
                  </div>
                  <span>•</span>
                  <span>Last updated: {currentTime.toLocaleTimeString()}</span>
                  <span>•</span>
                  <span>Total Alerts: {allDeviceAlerts.length}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Alert Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Critical Alerts</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {allDeviceAlerts.filter(a => a.severity === 'critical' && !a.resolvedAt).length}
                </p>
                <p className="text-xs text-red-600 font-medium">Requires immediate attention</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Active Alerts</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {allDeviceAlerts.filter(a => !a.resolvedAt).length}
                </p>
                <p className="text-xs text-yellow-600 font-medium">Unresolved issues</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Resolved Today</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {allDeviceAlerts.filter(a => a.resolvedAt).length}
                </p>
                <p className="text-xs text-green-600 font-medium">Issues addressed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Devices Affected</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {new Set(allDeviceAlerts.map(a => a.deviceId)).size}
                </p>
                <p className="text-xs text-purple-600 font-medium">Equipment with alerts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filter & Search Alerts</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>{filteredAlerts.length} of {allDeviceAlerts.length} alerts</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Alerts</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by message, device, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                />
              </div>
            </div>

            {/* Severity Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
              >
                {severityFilters.map((filter) => (
                  <option key={filter.id} value={filter.id}>
                    {filter.label} ({filter.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alert Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
              >
                {alertTypeFilters.map((filter) => (
                  <option key={filter.id} value={filter.id}>
                    {filter.label} ({filter.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">🔴 Active</option>
                <option value="resolved">🟢 Resolved</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
              >
                <option value="timestamp">Time</option>
                <option value="severity">Severity</option>
                <option value="device">Device</option>
                <option value="message">Message</option>
              </select>
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Alert List</h3>
                <p className="text-sm text-gray-600 mt-0.5">Click on any alert to view detailed information</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {sortedAlerts.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No alerts found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  No alerts match your current filters. Try adjusting your search criteria.
                </p>
              </div>
            ) : (
              sortedAlerts.map((alert) => {
                const TypeIcon = getTypeIcon(alert.type);
                const isExpanded = expandedAlert === alert.id;
                
                return (
                  <div key={alert.id} className="hover:bg-gray-50 transition-colors">
                    <div className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        {/* Alert Type Icon */}
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          alert.severity === 'critical' ? 'bg-red-100' : 
                          alert.severity === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                        }`}>
                          <TypeIcon className={`w-5 h-5 ${
                            alert.severity === 'critical' ? 'text-red-600' : 
                            alert.severity === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                          }`} />
                        </div>

                        {/* Alert Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="text-base font-semibold text-gray-900 truncate">
                              {alert.message}
                            </h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold border ${getSeverityColor(alert.severity)}`}>
                              {alert.severity.toUpperCase()}
                            </span>
                            {alert.resolvedAt && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                RESOLVED
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Activity className="w-3 h-3" />
                              <span className="font-medium">{alert.deviceName}</span>
                            </div>
                            <span className="text-gray-400">•</span>
                            <span>{alert.location}</span>
                            <span className="text-gray-400">•</span>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{formatTimestamp(alert.timestamp)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                          {!alert.acknowledged && (
                            <button 
                              onClick={() => acknowledgeAlert(alert.id)}
                              className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 border border-blue-200 hover:border-blue-300"
                            >
                              Acknowledge
                            </button>
                          )}
                          {!alert.resolvedAt && (
                            <button 
                              onClick={() => resolveAlert(alert.id)}
                              className="px-3 py-1.5 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 border border-green-200 hover:border-green-300"
                            >
                              Resolve
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Alert Details */}
                            <div>
                              <h4 className="text-base font-semibold text-gray-900 mb-3">Alert Details</h4>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
                                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg border border-gray-200">{alert.description}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                  <div>
                                    <p className="font-medium text-gray-500 mb-1">Alert Type</p>
                                    <p className="text-gray-900 capitalize">{alert.type}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-500 mb-1">Device Type</p>
                                    <p className="text-gray-900">{alert.deviceType}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-500 mb-1">Timestamp</p>
                                    <p className="text-gray-900">{alert.timestamp.toLocaleString()}</p>
                                  </div>
                                  {alert.resolvedAt && (
                                    <div>
                                      <p className="font-medium text-gray-500 mb-1">Resolved At</p>
                                      <p className="text-gray-900">{alert.resolvedAt.toLocaleString()}</p>
                                    </div>
                                  )}
                                </div>
                                {alert.parameters && (
                                  <div>
                                    <p className="text-sm font-medium text-gray-500 mb-2">Parameters</p>
                                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                      {Object.entries(alert.parameters).map(([key, value]) => (
                                        <div key={key} className="flex justify-between text-sm">
                                          <span className="font-medium text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                                          <span className="text-gray-900">{value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Recommended Actions */}
                            <div>
                              <h4 className="text-base font-semibold text-gray-900 mb-3">Recommended Actions</h4>
                              <div className="space-y-2">
                                {alert.actions.map((action, index) => (
                                  <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                      {index + 1}
                                    </div>
                                    <span className="text-sm text-gray-900 font-medium">{action}</span>
                                  </div>
                                ))}
                              </div>
                              
                              <div className="mt-4 flex space-x-2">
                                <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                                  View Device Details
                                </button>
                                <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm">
                                  Contact Support
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}