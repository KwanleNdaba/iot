'use client';

import { useState, useEffect } from 'react';
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
  Search,
  Filter,
  Plus,
  Settings,
  Eye,
  Edit3,
  Trash2,
  RefreshCw,
  Download,
  Upload,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Zap,
  Shield,
  Gauge,
  Package
} from 'lucide-react';

export default function DevicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [expandedDevices, setExpandedDevices] = useState<Set<string>>(new Set());
  const [selectedDevices, setSelectedDevices] = useState<Set<string>>(new Set());
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data for hospital/healthcare demonstration
  const devices = [
    {
      id: 'dialysis-01',
      name: 'Fresenius 5008S Dialysis Machine',
      type: 'Dialysis Machine',
      status: 'online',
      location: 'Dialysis Unit, Floor 2',
      lastSeen: '1 min ago',
      uptime: 99.9,
      responseTime: 28,
      battery: 95,
      signal: -42,
      temperature: 22.1,
      humidity: 48,
      alerts: 0,
      firmware: 'v3.2.1',
      ipAddress: '192.168.1.101',
      macAddress: '00:1B:44:11:3A:B7',
      manufacturer: 'Fresenius Medical Care',
      model: '5008S',
      serialNumber: 'FMC5008S-001-2024',
      installationDate: '2024-01-15',
      lastMaintenance: '2024-03-01',
      nextMaintenance: '2024-06-01',
      dataPoints: 2150000,
      lastAlert: null,
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 'dialysis-02',
      name: 'Baxter AK 98 Dialysis System',
      type: 'Dialysis Machine',
      status: 'maintenance',
      location: 'Dialysis Unit, Floor 2',
      lastSeen: '45 min ago',
      uptime: 98.2,
      responseTime: 35,
      battery: 88,
      signal: -48,
      temperature: 21.8,
      humidity: 45,
      alerts: 1,
      firmware: 'v2.8.4',
      ipAddress: '192.168.1.102',
      macAddress: '00:1B:44:11:3A:B8',
      manufacturer: 'Baxter International',
      model: 'AK 98',
      serialNumber: 'BAXAK98-002-2024',
      installationDate: '2024-01-20',
      lastMaintenance: '2024-02-15',
      nextMaintenance: '2024-05-15',
      dataPoints: 1890000,
      lastAlert: 'Maintenance required - Filter replacement due',
      coordinates: { lat: 40.7129, lng: -74.0061 }
    },
    {
      id: 'ventilator-01',
      name: 'Philips Respironics V680 Ventilator',
      type: 'Ventilator',
      status: 'online',
      location: 'ICU, Floor 3',
      lastSeen: '30 sec ago',
      uptime: 99.7,
      responseTime: 22,
      battery: 92,
      signal: -38,
      temperature: 23.2,
      humidity: 42,
      alerts: 0,
      firmware: 'v4.1.2',
      ipAddress: '192.168.1.103',
      macAddress: '00:1B:44:11:3A:B9',
      manufacturer: 'Philips Healthcare',
      model: 'V680',
      serialNumber: 'PHV680-003-2024',
      installationDate: '2024-02-01',
      lastMaintenance: '2024-03-15',
      nextMaintenance: '2024-06-15',
      dataPoints: 3100000,
      lastAlert: null,
      coordinates: { lat: 40.7127, lng: -74.0059 }
    },
    {
      id: 'monitor-01',
      name: 'GE CARESCAPE B650 Patient Monitor',
      type: 'Patient Monitor',
      status: 'online',
      location: 'ICU, Floor 3',
      lastSeen: '15 sec ago',
      uptime: 99.8,
      responseTime: 18,
      battery: 96,
      signal: -35,
      temperature: 22.5,
      humidity: 44,
      alerts: 0,
      firmware: 'v5.2.0',
      ipAddress: '192.168.1.104',
      macAddress: '00:1B:44:11:3A:BA',
      manufacturer: 'GE Healthcare',
      model: 'CARESCAPE B650',
      serialNumber: 'GEB650-004-2024',
      installationDate: '2024-01-10',
      lastMaintenance: '2024-02-20',
      nextMaintenance: '2024-05-20',
      dataPoints: 4250000,
      lastAlert: null,
      coordinates: { lat: 40.7130, lng: -74.0062 }
    },
    {
      id: 'xray-01',
      name: 'Siemens Ysio Max X-Ray System',
      type: 'X-Ray System',
      status: 'offline',
      location: 'Radiology, Floor 1',
      lastSeen: '2 hours ago',
      uptime: 97.1,
      responseTime: 45,
      battery: 78,
      signal: -58,
      temperature: 23.5,
      humidity: 41,
      alerts: 2,
      firmware: 'v6.1.3',
      ipAddress: '192.168.1.107',
      macAddress: '00:1B:44:11:3A:BD',
      manufacturer: 'Siemens Healthineers',
      model: 'Ysio Max',
      serialNumber: 'SHYM-007-2024',
      installationDate: '2024-01-05',
      lastMaintenance: '2024-02-10',
      nextMaintenance: '2024-05-10',
      dataPoints: 5200000,
      lastAlert: 'System calibration required - Image quality below standard',
      coordinates: { lat: 40.7124, lng: -74.0056 }
    }
  ];

  const deviceTypes = [
    { id: 'all', label: 'All Types', count: devices.length },
    { id: 'Dialysis Machine', label: 'Dialysis Machines', count: devices.filter(d => d.type === 'Dialysis Machine').length },
    { id: 'Ventilator', label: 'Ventilators', count: devices.filter(d => d.type === 'Ventilator').length },
    { id: 'Patient Monitor', label: 'Patient Monitors', count: devices.filter(d => d.type === 'Patient Monitor').length },
    { id: 'X-Ray System', label: 'X-Ray Systems', count: devices.filter(d => d.type === 'X-Ray System').length }
  ];

  const locations = [
    { id: 'all', label: 'All Locations', count: devices.length },
    { id: 'Dialysis Unit, Floor 2', label: 'Dialysis Unit, Floor 2', count: devices.filter(d => d.location === 'Dialysis Unit, Floor 2').length },
    { id: 'ICU, Floor 3', label: 'ICU, Floor 3', count: devices.filter(d => d.location === 'ICU, Floor 3').length },
    { id: 'Radiology, Floor 1', label: 'Radiology, Floor 1', count: devices.filter(d => d.location === 'Radiology, Floor 1').length }
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'online':
        return { 
          badge: 'bg-green-100 text-green-800 border-green-200', 
          text: 'Online', 
          icon: CheckCircle,
          iconColor: 'text-green-600'
        };
      case 'offline':
        return { 
          badge: 'bg-red-100 text-red-800 border-red-200', 
          text: 'Offline', 
          icon: WifiOff,
          iconColor: 'text-red-600'
        };
      case 'maintenance':
        return { 
          badge: 'bg-amber-100 text-amber-800 border-amber-200', 
          text: 'Maintenance', 
          icon: Clock,
          iconColor: 'text-amber-600'
        };
      default:
        return { 
          badge: 'bg-gray-100 text-gray-800 border-gray-200', 
          text: 'Unknown', 
          icon: AlertTriangle,
          iconColor: 'text-gray-600'
        };
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 80) return 'text-green-600';
    if (battery > 50) return 'text-amber-600';
    if (battery > 20) return 'text-orange-600';
    return 'text-red-600';
  };

  const getSignalColor = (signal: number) => {
    if (signal > -50) return 'text-green-600';
    if (signal > -60) return 'text-amber-600';
    if (signal > -70) return 'text-orange-600';
    return 'text-red-600';
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'Dialysis Machine':
        return Activity;
      case 'Ventilator':
        return Zap;
      case 'Patient Monitor':
        return Shield;
      case 'X-Ray System':
        return Package;
      default:
        return Activity;
    }
  };

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || device.status === selectedStatus;
    const matchesType = selectedType === 'all' || device.type === selectedType;
    const matchesLocation = selectedLocation === 'all' || device.location === selectedLocation;
    
    return matchesSearch && matchesStatus && matchesType && matchesLocation;
  });

  const sortedDevices = [...filteredDevices].sort((a, b) => {
    let aValue: any = a[sortBy as keyof typeof a];
    let bValue: any = b[sortBy as keyof typeof b];
    
    if (sortBy === 'lastSeen') {
      aValue = parseInt(a.lastSeen.split(' ')[0]);
      bValue = parseInt(b.lastSeen.split(' ')[0]);
    }
    
    if (typeof aValue === 'string') aValue = aValue.toLowerCase();
    if (typeof bValue === 'string') bValue = bValue.toLowerCase();
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const toggleDeviceExpansion = (deviceId: string) => {
    const newExpanded = new Set(expandedDevices);
    if (newExpanded.has(deviceId)) {
      newExpanded.delete(deviceId);
    } else {
      newExpanded.add(deviceId);
    }
    setExpandedDevices(newExpanded);
  };

  const toggleDeviceSelection = (deviceId: string) => {
    const newSelected = new Set(selectedDevices);
    if (newSelected.has(deviceId)) {
      newSelected.delete(deviceId);
    } else {
      newSelected.add(deviceId);
    }
    setSelectedDevices(newSelected);
  };

  const selectAllDevices = () => {
    if (selectedDevices.size === filteredDevices.length) {
      setSelectedDevices(new Set());
    } else {
      setSelectedDevices(new Set(filteredDevices.map(d => d.id)));
    }
  };

  const totalDevices = devices.length;
  const onlineDevices = devices.filter(d => d.status === 'online').length;
  const offlineDevices = devices.filter(d => d.status === 'offline').length;
  const maintenanceDevices = devices.filter(d => d.status === 'maintenance').length;

  return (
    <div className="w-full max-w-none bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                <Activity className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Medical Device Management
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  {filteredDevices.length} of {totalDevices} devices • Last updated: {currentTime.toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add Device</span>
              </button>
              <button className="bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 border border-gray-200 font-medium flex items-center space-x-2 transition-colors">
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Devices</p>
                <p className="text-2xl font-semibold text-gray-900">{totalDevices}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Online</p>
                <p className="text-2xl font-semibold text-gray-900">{onlineDevices}</p>
                <p className="text-xs text-green-600 font-medium">
                  {((onlineDevices / totalDevices) * 100).toFixed(0)}% operational
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <WifiOff className="w-5 h-5 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Offline</p>
                <p className="text-2xl font-semibold text-gray-900">{offlineDevices}</p>
                <p className="text-xs text-red-600 font-medium">Requires attention</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Maintenance</p>
                <p className="text-2xl font-semibold text-gray-900">{maintenanceDevices}</p>
                <p className="text-xs text-amber-600 font-medium">Scheduled service</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors text-sm"
              />
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors text-sm"
            >
              <option value="all">All Status</option>
              <option value="online">🟢 Online</option>
              <option value="offline">🔴 Offline</option>
              <option value="maintenance">🟡 Maintenance</option>
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors text-sm"
            >
              <option value="all">All Types</option>
              {deviceTypes.slice(1).map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label} ({type.count})
                </option>
              ))}
            </select>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors text-sm"
            >
              <option value="all">All Locations</option>
              {locations.slice(1).map((location) => (
                <option key={location.id} value={location.id}>
                  {location.label} ({location.count})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Devices List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedDevices.size === filteredDevices.length && filteredDevices.length > 0}
                  onChange={selectAllDevices}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  {selectedDevices.size} selected
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="name">Name</option>
                  <option value="status">Status</option>
                  <option value="type">Type</option>
                  <option value="location">Location</option>
                  <option value="uptime">Uptime</option>
                </select>
                
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Device Cards */}
          <div className="divide-y divide-gray-200">
            {sortedDevices.map((device) => {
              const statusConfig = getStatusConfig(device.status);
              const StatusIcon = statusConfig.icon;
              const DeviceIcon = getDeviceIcon(device.type);
              const isExpanded = expandedDevices.has(device.id);
              const isSelected = selectedDevices.has(device.id);

              return (
                <div key={device.id} className="hover:bg-gray-50 transition-colors">
                  {/* Main Device Row */}
                  <div className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleDeviceSelection(device.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />

                      {/* Device Icon */}
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <DeviceIcon className="w-5 h-5 text-blue-600" />
                      </div>

                      {/* Device Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="text-base font-medium text-gray-900 truncate">
                            {device.name}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig.badge}`}>
                            <StatusIcon className={`w-3 h-3 mr-1 ${statusConfig.iconColor}`} />
                            {statusConfig.text}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{device.type}</span>
                          <span>•</span>
                          <span>{device.location}</span>
                          <span>•</span>
                          <span>Last seen: {device.lastSeen}</span>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="hidden lg:flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Uptime</div>
                          <div className="font-medium text-green-600">{device.uptime}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Battery</div>
                          <div className={`font-medium ${getBatteryColor(device.battery)}`}>
                            {device.battery}%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Signal</div>
                          <div className={`font-medium ${getSignalColor(device.signal)}`}>
                            {device.signal}dBm
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => toggleDeviceExpansion(device.id)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Device Information */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-3">Device Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Manufacturer:</span>
                              <span className="font-medium text-gray-900">{device.manufacturer}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Model:</span>
                              <span className="font-medium text-gray-900">{device.model}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Serial Number:</span>
                              <span className="font-medium text-gray-900">{device.serialNumber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">IP Address:</span>
                              <span className="font-medium text-gray-900">{device.ipAddress}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Firmware:</span>
                              <span className="font-medium text-gray-900">{device.firmware}</span>
                            </div>
                          </div>
                        </div>

                        {/* Maintenance Schedule */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-3">Maintenance Schedule</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Installation Date:</span>
                              <span className="font-medium text-gray-900">{device.installationDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Last Maintenance:</span>
                              <span className="font-medium text-gray-900">{device.lastMaintenance}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Next Maintenance:</span>
                              <span className="font-medium text-gray-900">{device.nextMaintenance}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Data Points:</span>
                              <span className="font-medium text-gray-900">{device.dataPoints.toLocaleString()}</span>
                            </div>
                            {device.lastAlert && (
                              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-start space-x-2">
                                  <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <div className="text-xs font-medium text-red-900">Last Alert</div>
                                    <div className="text-xs text-red-700 mt-1">{device.lastAlert}</div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-3">
                          <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
                            <RefreshCw className="w-4 h-4" />
                            <span>Restart</span>
                          </button>
                          <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg border border-green-200 hover:border-green-300 transition-colors">
                            <Download className="w-4 h-4" />
                            <span>Update</span>
                          </button>
                          <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                            <Settings className="w-4 h-4" />
                            <span>Configure</span>
                          </button>
                          <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg border border-red-200 hover:border-red-300 transition-colors">
                            <Trash2 className="w-4 h-4" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {sortedDevices.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No devices found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Try adjusting your search criteria or filters to find the devices you're looking for.
              </p>
              <div className="flex items-center justify-center space-x-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Device</span>
                </button>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedStatus('all');
                    setSelectedType('all');
                    setSelectedLocation('all');
                  }}
                  className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 font-medium transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedDevices.size > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                {selectedDevices.size} device{selectedDevices.size !== 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors flex items-center space-x-1">
                  <RefreshCw className="w-4 h-4" />
                  <span>Restart</span>
                </button>
                <button className="px-3 py-1.5 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg border border-green-200 hover:border-green-300 transition-colors flex items-center space-x-1">
                  <Download className="w-4 h-4" />
                  <span>Update</span>
                </button>
                <button className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg border border-red-200 hover:border-red-300 transition-colors flex items-center space-x-1">
                  <Trash2 className="w-4 h-4" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}