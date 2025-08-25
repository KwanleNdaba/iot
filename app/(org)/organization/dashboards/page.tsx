"use client"
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Thermometer,
  Battery,
  ExternalLink,
  RefreshCw,
  Calendar,
  Filter,
  Layout,
  MoreVertical,
  Maximize2,
  Download,
  Eye,
  Settings
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { useRouter } from 'next/navigation';

// Sample data for charts with multiple medical devices
const temperatureData = [
  { time: '00:00', 'Dialysis-01': 22.1, 'Ventilator-01': 23.2, 'Monitor-01': 22.5, threshold: 25 },
  { time: '04:00', 'Dialysis-01': 21.8, 'Ventilator-01': 22.9, 'Monitor-01': 22.1, threshold: 25 },
  { time: '08:00', 'Dialysis-01': 24.2, 'Ventilator-01': 24.8, 'Monitor-01': 23.5, threshold: 25 },
  { time: '12:00', 'Dialysis-01': 26.1, 'Ventilator-01': 25.9, 'Monitor-01': 24.7, threshold: 25 },
  { time: '16:00', 'Dialysis-01': 25.8, 'Ventilator-01': 26.2, 'Monitor-01': 25.1, threshold: 25 },
  { time: '20:00', 'Dialysis-01': 23.9, 'Ventilator-01': 24.5, 'Monitor-01': 23.2, threshold: 25 },
  { time: '24:00', 'Dialysis-01': 22.1, 'Ventilator-01': 22.8, 'Monitor-01': 21.5, threshold: 25 },
];

const deviceStatusData = [
  { name: 'Online', value: 6, color: '#10B981', devices: ['Dialysis-01', 'Ventilator-01', 'Monitor-01', 'Infusion-01', 'Defibrillator-01', 'MRI-01'] },
  { name: 'Offline', value: 1, color: '#EF4444', devices: ['X-Ray-01'] },
  { name: 'Maintenance', value: 1, color: '#F59E0B', devices: ['Dialysis-02'] },
  { name: 'Warning', value: 0, color: '#F97316', devices: [] }
];

const energyConsumptionData = [
  { 
    month: 'Jan', 
    'ICU': 1800, 
    'Dialysis Unit': 1400, 
    'Radiology': 1000,
    efficiency: 85 
  },
  { 
    month: 'Feb', 
    'ICU': 1600, 
    'Dialysis Unit': 1300, 
    'Radiology': 900,
    efficiency: 88 
  },
  { 
    month: 'Mar', 
    'ICU': 1750, 
    'Dialysis Unit': 1450, 
    'Radiology': 900,
    efficiency: 86 
  },
  { 
    month: 'Apr', 
    'ICU': 1650, 
    'Dialysis Unit': 1350, 
    'Radiology': 900,
    efficiency: 90 
  },
  { 
    month: 'May', 
    'ICU': 1900, 
    'Dialysis Unit': 1500, 
    'Radiology': 900,
    efficiency: 84 
  },
  { 
    month: 'Jun', 
    'ICU': 2000, 
    'Dialysis Unit': 1600, 
    'Radiology': 900,
    efficiency: 82 
  }
];

const alertsData = [
  { id: 1, device: 'Dialysis-02', message: 'Maintenance required - Filter replacement due', severity: 'warning', time: '15 min ago', type: 'maintenance' },
  { id: 2, device: 'X-Ray-01', message: 'System calibration required - Image quality below standard', severity: 'critical', time: '2 hours ago', type: 'calibration' },
  { id: 3, device: 'Ventilator-01', message: 'Connection restored', severity: 'info', time: '1 hour ago', type: 'connectivity' },
  { id: 4, device: 'Monitor-01', message: 'Battery level below 20%', severity: 'high', time: '3 hours ago', type: 'battery' }
];

interface KPIWidgetProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ComponentType<any>;
  color: string;
  subtitle?: string;
}

const KPIWidget: React.FC<KPIWidgetProps> = ({ title, value, change, icon: Icon, color, subtitle }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className={`flex items-center ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
        <span className="text-sm font-medium">{Math.abs(change)}%</span>
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-sm text-gray-600 mt-1">{title}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  </div>
);

interface ChartWidgetProps {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  deviceInfo?: string;
  selectedDevices?: string[];
}

const ChartWidget: React.FC<ChartWidgetProps> = ({ title, children, actions, deviceInfo, selectedDevices }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {deviceInfo && <p className="text-sm text-gray-500 mt-1">{deviceInfo}</p>}
        {selectedDevices && (
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-xs text-gray-500">Devices:</span>
            <div className="flex flex-wrap gap-1">
              {selectedDevices.slice(0, 3).map((device) => (
                <span key={device} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {device}
                </span>
              ))}
              {selectedDevices.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  +{selectedDevices.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {actions}
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
    <div className="h-64">
      {children}
    </div>
  </div>
);

const DashboardHeader: React.FC<{ onRefresh: () => void }> = ({ onRefresh }) => {
  const router = useRouter();
  
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Device Analytics Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Monitor and analyze your medical device ecosystem in real-time</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onRefresh}
              className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
            <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Calendar className="w-4 h-4 mr-2" />
              Last 24h
            </button>
            <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button 
              onClick={() => router.push('/devices')}
              className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View All Devices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DeviceDashboard() {
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const router = useRouter();

  const handleRefresh = () => {
    setLastRefresh(new Date());
  };

  const handleDeviceClick = (deviceId: string) => {
    router.push(`/devices/${deviceId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader onRefresh={handleRefresh} />
      
      <div className="p-6">
        {/* KPI Section */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPIWidget
              title="Total Medical Devices"
              value="8"
              change={0}
              icon={Activity}
              color="bg-blue-600"
              subtitle="All departments covered"
            />
            <KPIWidget
              title="Online Devices"
              value="6"
              change={-1}
              icon={CheckCircle}
              color="bg-green-600"
              subtitle="75% operational"
            />
            <KPIWidget
              title="Pending Alerts"
              value="2"
              change={-1}
              icon={AlertTriangle}
              color="bg-red-600"
              subtitle="1 critical"
            />
            <KPIWidget
              title="Devices in Maintenance"
              value="1"
              change={0}
              icon={Activity}
              color="bg-yellow-600"
              subtitle="Scheduled maintenance"
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartWidget
            title="Medical Device Temperature Monitoring"
            deviceInfo="Hospital Departments - Dialysis, ICU, Patient Monitoring"
            selectedDevices={['Dialysis-01', 'Ventilator-01', 'Monitor-01']}
            actions={
              <>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="Download Data">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="Expand Chart">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </>
            }
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  labelFormatter={(label) => `Time: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="Dialysis-01" 
                  stroke="#3B82F6" 
                  strokeWidth={2} 
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }} 
                  name="Dialysis-01 (Dialysis Unit)"
                />
                <Line 
                  type="monotone" 
                  dataKey="Ventilator-01" 
                  stroke="#10B981" 
                  strokeWidth={2} 
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} 
                  name="Ventilator-01 (ICU)"
                />
                <Line 
                  type="monotone" 
                  dataKey="Monitor-01" 
                  stroke="#F59E0B" 
                  strokeWidth={2} 
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }} 
                  name="Monitor-01 (ICU)"
                />
                <Line 
                  type="monotone" 
                  dataKey="threshold" 
                  stroke="#EF4444" 
                  strokeDasharray="5 5" 
                  strokeWidth={1} 
                  dot={false} 
                  name="Threshold"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartWidget>

          <ChartWidget
            title="Medical Device Status Distribution"
            deviceInfo="All Connected Medical Devices (8 total)"
            actions={
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="View Details">
                <Eye className="w-4 h-4" />
              </button>
            }
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value, name, props) => [
                    `${value} devices`,
                    `${name} (${props.payload.devices?.slice(0, 2).join(', ')}${props.payload.devices?.length > 2 ? '...' : ''})`
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartWidget>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Energy Consumption Chart */}
          <div className="lg:col-span-2">
            <ChartWidget
              title="Energy Consumption by Department"
              deviceInfo="Power meters across hospital departments"
              selectedDevices={['PWR-ICU-MAIN', 'PWR-DIALYSIS-MAIN', 'PWR-RADIOLOGY-MAIN']}
              actions={
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="Settings">
                  <Settings className="w-4 h-4" />
                </button>
              }
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={energyConsumptionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: 'white',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    labelFormatter={(label) => `Month: ${label}`}
                    formatter={(value, name) => [`${value} kWh`, name]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="ICU" 
                    stackId="1"
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.6} 
                    strokeWidth={2} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="Dialysis Unit" 
                    stackId="1"
                    stroke="#10B981" 
                    fill="#10B981" 
                    fillOpacity={0.6} 
                    strokeWidth={2} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="Radiology" 
                    stackId="1"
                    stroke="#F59E0B" 
                    fill="#F59E0B" 
                    fillOpacity={0.6} 
                    strokeWidth={2} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartWidget>
          </div>

          {/* Alerts Panel */}
          <div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
                <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {alertsData.map((alert) => (
                  <div 
                    key={alert.id} 
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => handleDeviceClick(alert.device.toLowerCase().replace(' ', '-'))}
                  >
                    <div className={`p-2 rounded-lg ${
                      alert.severity === 'critical' ? 'bg-red-100 text-red-600' :
                      alert.severity === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      alert.severity === 'high' ? 'bg-orange-100 text-orange-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{alert.device}</p>
                      <p className="text-xs text-gray-500 truncate">{alert.message}</p>
                    </div>
                    <div className="text-xs text-gray-400">{alert.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Data Feed */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Real-time Device Data</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Live</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    Updated: {lastRefresh.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { id: 'dialysis-01', name: 'Dialysis-01', type: 'Temperature', value: '22.1°C', status: 'normal', time: '2s ago', icon: Thermometer, color: 'text-blue-600' },
                    { id: 'ventilator-01', name: 'Ventilator-01', type: 'Temperature', value: '23.2°C', status: 'normal', time: '5s ago', icon: Thermometer, color: 'text-cyan-600' },
                    { id: 'monitor-01', name: 'Monitor-01', type: 'Battery', value: '96%', status: 'normal', time: '8s ago', icon: Battery, color: 'text-green-600' },
                    { id: 'xray-01', name: 'X-Ray-01', type: 'Status', value: 'Offline', status: 'critical', time: '2h ago', icon: AlertTriangle, color: 'text-red-600' },
                    { id: 'infusion-01', name: 'Infusion-01', type: 'Flow Rate', value: '15.3 mL/hr', status: 'normal', time: '12s ago', icon: Activity, color: 'text-green-600' }
                  ].map((device, index) => (
                    <tr 
                      key={device.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleDeviceClick(device.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <device.icon className={`w-5 h-5 mr-3 ${device.color}`} />
                          <span className="text-sm font-medium text-gray-900">{device.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{device.value}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          device.status === 'normal' ? 'bg-green-100 text-green-800' :
                          device.status === 'high' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {device.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}