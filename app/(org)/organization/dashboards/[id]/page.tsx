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
  MoreVertical,
  Maximize2,
  Download,
  Eye,
  Settings,
  ArrowLeft,
  Gauge,
  Droplets,
  Signal,
  Cpu,
  Clock,
  Shield,
  Heart,
  Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar } from 'recharts';
import { useRouter } from 'next/navigation';

// Comprehensive dialysis machine analytics data
const dialysisFlowRateData = [
  { time: '00:00', bloodFlow: 350, dialysateFlow: 500, ultrafiltration: 2.1 },
  { time: '01:00', bloodFlow: 355, dialysateFlow: 500, ultrafiltration: 2.3 },
  { time: '02:00', bloodFlow: 348, dialysateFlow: 500, ultrafiltration: 2.0 },
  { time: '03:00', bloodFlow: 352, dialysateFlow: 500, ultrafiltration: 2.2 },
  { time: '04:00', bloodFlow: 350, dialysateFlow: 500, ultrafiltration: 2.1 },
];

const pressureMonitoringData = [
  { time: '00:00', arterialPressure: -180, venousPressure: 150, transmembranePressure: 85 },
  { time: '01:00', arterialPressure: -175, venousPressure: 155, transmembranePressure: 88 },
  { time: '02:00', arterialPressure: -185, venousPressure: 148, transmembranePressure: 82 },
  { time: '03:00', arterialPressure: -178, venousPressure: 152, transmembranePressure: 86 },
  { time: '04:00', arterialPressure: -182, venousPressure: 150, transmembranePressure: 84 },
];

const clearanceEfficiencyData = [
  { session: 'Session 1', ureaReduction: 72, creatinine: 68, phosphorus: 45 },
  { session: 'Session 2', ureaReduction: 75, creatinine: 71, phosphorus: 48 },
  { session: 'Session 3', ureaReduction: 74, creatinine: 69, phosphorus: 46 },
  { session: 'Session 4', ureaReduction: 73, creatinine: 70, phosphorus: 47 },
  { session: 'Session 5', ureaReduction: 76, creatinine: 72, phosphorus: 49 },
];

const dialysisSessionData = [
  { day: 'Mon', sessions: 3, totalHours: 12, avgEfficiency: 73.5 },
  { day: 'Tue', sessions: 4, totalHours: 16, avgEfficiency: 74.2 },
  { day: 'Wed', sessions: 3, totalHours: 12, avgEfficiency: 75.1 },
  { day: 'Thu', sessions: 4, totalHours: 16, avgEfficiency: 72.8 },
  { day: 'Fri', sessions: 3, totalHours: 12, avgEfficiency: 74.6 },
  { day: 'Sat', sessions: 2, totalHours: 8, avgEfficiency: 73.9 },
  { day: 'Sun', sessions: 2, totalHours: 8, avgEfficiency: 74.3 },
];

const performanceMetrics = [
  { name: 'Kt/V Ratio', value: 1.4, target: 1.2, unit: '', color: 'bg-blue-600' },
  { name: 'URR', value: 74, target: 65, unit: '%', color: 'bg-green-600' },
  { name: 'Filter Efficiency', value: 92, target: 85, unit: '%', color: 'bg-purple-600' },
  { name: 'Fluid Removal', value: 2.1, target: 2.5, unit: 'L', color: 'bg-orange-600' },
];

const dialysisAlerts = [
  { id: 1, message: 'Transmembrane Pressure Alarm - TMP exceeded 300 mmHg during treatment', severity: 'critical', time: '45 min ago', type: 'pressure' },
  { id: 2, message: 'Blood Leak Detected - Optical sensor triggered in dialyzer', severity: 'critical', time: '2 hours ago', type: 'safety' },
  { id: 3, message: 'Air Detector Alarm - Microbubbles detected in venous line', severity: 'warning', time: '3 hours ago', type: 'safety' },
  { id: 4, message: 'Conductivity Out of Range - Dialysate conductivity 13.8 mS/cm', severity: 'warning', time: '5 hours ago', type: 'quality' },
  { id: 5, message: 'Filter Life Warning - Dialyzer approaching replacement time', severity: 'info', time: '1 day ago', type: 'maintenance' },
];

const dialysisVitals = [
  { name: 'Blood Flow Rate', value: '350 mL/min', status: 'normal', icon: Activity, range: '300-400 mL/min' },
  { name: 'Dialysate Flow Rate', value: '500 mL/min', status: 'normal', icon: Droplets, range: '500-800 mL/min' },
  { name: 'Transmembrane Pressure', value: '85 mmHg', status: 'normal', icon: Gauge, range: '50-300 mmHg' },
  { name: 'Arterial Pressure', value: '-180 mmHg', status: 'normal', icon: Activity, range: '-250 to -150 mmHg' },
  { name: 'Venous Pressure', value: '150 mmHg', status: 'normal', icon: Activity, range: '80-250 mmHg' },
  { name: 'Ultrafiltration Rate', value: '2.1 L/hr', status: 'normal', icon: Droplets, range: '0-4 L/hr' },
];

const deviceStatus = [
  { name: 'Dialyzer Status', value: 'FX80 High-Flux - 8 hours used', status: 'online', icon: Settings },
  { name: 'Vascular Access', value: 'AV Fistula - Left Arm', status: 'online', icon: Activity },
  { name: 'Water Quality', value: 'AAMI Standards Met', status: 'online', icon: Droplets },
  { name: 'System Disinfection', value: 'Completed 6 hours ago', status: 'online', icon: Shield },
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
}

const ChartWidget: React.FC<ChartWidgetProps> = ({ title, children, actions, deviceInfo }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {deviceInfo && <p className="text-sm text-gray-500 mt-1">{deviceInfo}</p>}
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

const PerformanceMetric: React.FC<{ name: string; value: number; color: string }> = ({ name, value, color }) => (
  <div className="text-center">
    <div className="inline-flex items-center justify-center relative">
      <svg className="w-32 h-32" viewBox="0 0 36 36">
        <path
          d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#eee"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={color === 'bg-blue-600' ? '#3B82F6' : color === 'bg-green-600' ? '#10B981' : '#F59E0B'}
          strokeWidth="3"
          strokeDasharray={`${value}, 100`}
        />
        <text x="18" y="20.5" textAnchor="middle" fill={color === 'bg-blue-600' ? '#3B82F6' : color === 'bg-green-600' ? '#10B981' : '#F59E0B'} fontSize="8" fontWeight="bold">
          {value}%
        </text>
      </svg>
    </div>
    <h4 className="text-md font-medium text-gray-900 mt-2">{name}</h4>
    <p className="text-sm text-gray-500">
      {name === 'Efficiency' ? 'Treatment efficiency rating' : 
       name === 'Uptime' ? 'System availability' : 'Treatment delivery accuracy'}
    </p>
  </div>
);

export default function DialysisDevicePage() {
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const router = useRouter();

  const handleRefresh = () => {
    setLastRefresh(new Date());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Device Analytics</h1>
                <p className="text-sm text-gray-600 mt-1">Detailed metrics for Dialysis-01</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
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
            </div>
          </div>
        </div>
      </div>

      {/* Device Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-xl text-white p-6 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center">
                <span className="bg-white bg-opacity-25 rounded-full px-4 py-1 text-sm font-medium mr-4">
                  <Activity className="w-4 h-4 inline mr-2" />
                  Dialysis Machine
                </span>
                <span className="bg-green-500 rounded-full px-3 py-1 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Online
                </span>
              </div>
              <h2 className="text-3xl font-bold mt-4">Fresenius 5008S - Dialysis-01</h2>
              <p className="mt-2 opacity-90"><Clock className="w-4 h-4 inline mr-2" /> Last data update: {lastRefresh.toLocaleTimeString()}</p>
              <p className="mt-1 opacity-90">Dialysis Unit, Floor 2, Room 204</p>
            </div>
            <div className="text-right">
              <div className="mt-4 flex justify-end space-x-3">
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  <Gauge className="w-4 h-4 inline mr-2" />
                  Performance
                </button>
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  <Settings className="w-4 h-4 inline mr-2" />
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pb-12">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPIWidget
            title="Blood Flow Rate"
            value="350 mL/min"
            change={2.3}
            icon={Heart}
            color="bg-red-600"
            subtitle="Within target range"
          />
          <KPIWidget
            title="Kt/V Ratio"
            value="1.4"
            change={3.5}
            icon={Activity}
            color="bg-blue-600"
            subtitle="Above target (1.2)"
          />
          <KPIWidget
            title="Urea Reduction"
            value="74%"
            change={1.8}
            icon={Droplets}
            color="bg-green-600"
            subtitle="Excellent clearance"
          />
          <KPIWidget
            title="Fluid Removal"
            value="2.1L"
            change={-2.1}
            icon={Gauge}
            color="bg-purple-600"
            subtitle="Target: 2.5L"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartWidget
            title="Flow Rate Monitoring"
            deviceInfo="Real-time blood and dialysate flow rates"
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
              <LineChart data={dialysisFlowRateData as any}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#888" fontSize={12} />
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
                  dataKey="bloodFlow" 
                  stroke="#EF4444" 
                  strokeWidth={2} 
                  dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }} 
                  name="Blood Flow (mL/min)"
                />
                <Line 
                  type="monotone" 
                  dataKey="dialysateFlow" 
                  stroke="#3B82F6" 
                  strokeWidth={2} 
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }} 
                  name="Dialysate Flow (mL/min)"
                />
                <Line 
                  type="monotone" 
                  dataKey="ultrafiltration" 
                  stroke="#10B981" 
                  strokeWidth={2} 
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} 
                  name="Ultrafiltration (L/hr)"
                  yAxisId="right"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartWidget>

          <ChartWidget
            title="Pressure Monitoring"
            deviceInfo="Arterial, venous, and transmembrane pressures"
            actions={
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="View Details">
                <Eye className="w-4 h-4" />
              </button>
            }
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pressureMonitoringData}>
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
                  formatter={(value) => [`${value} mmHg`, '']}
                />
                <Line 
                  type="monotone" 
                  dataKey="arterialPressure" 
                  stroke="#EF4444" 
                  strokeWidth={2} 
                  dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }} 
                  name="Arterial Pressure"
                />
                <Line 
                  type="monotone" 
                  dataKey="venousPressure" 
                  stroke="#3B82F6" 
                  strokeWidth={2} 
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }} 
                  name="Venous Pressure"
                />
                <Line 
                  type="monotone" 
                  dataKey="transmembranePressure" 
                  stroke="#F59E0B" 
                  strokeWidth={2} 
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }} 
                  name="Transmembrane Pressure"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartWidget>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Device Status */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Status</h3>
            <div className="space-y-4">
              {deviceStatus.map((status, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${
                      status.status === 'online' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                    } mr-3`}>
                      <status.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{status.name}</p>
                      <p className="text-xs text-gray-500">{status.value}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    status.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {status.status === 'online' ? 'Online' : 'Scheduled'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
              <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {dialysisAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    alert.severity === 'critical' ? 'bg-red-50' : 
                    alert.severity === 'warning' ? 'bg-yellow-50' : 'bg-blue-50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    alert.severity === 'critical' ? 'bg-red-100 text-red-600' : 
                    alert.severity === 'warning' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  </div>
                  <div className="text-xs text-gray-400">{alert.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {performanceMetrics.map((metric, index) => (
              <PerformanceMetric 
                key={index}
                name={metric.name}
                value={metric.value}
                color={metric.color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}