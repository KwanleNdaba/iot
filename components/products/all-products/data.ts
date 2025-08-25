import { ModuleResponse, Organisation, ProductResponse } from "@/interfaces/product";

// Mock data for development and testing
export const mockModules: ModuleResponse[] = [
  {
    id: "1",
    name: "IoT Dashboard",
    description: "Real-time IoT monitoring and analytics platform with advanced visualizations and alert system",
    createdBy: "Smart Sensor Flow",
    createdAt: "2024-01-15T10:00:00Z",
    attributes: {
      urlLive: "iot-dashboard.smartsensorflow.com",
      urlLocal: "localhost:3001",
    },
  },
  {
    id: "2",
    name: "Data Analytics Pro",
    description: "Advanced data analytics and machine learning platform for comprehensive business insights",
    createdBy: "Smart Sensor Flow",
    createdAt: "2024-02-20T14:30:00Z",
    attributes: {
      urlLive: "analytics.smartsensorflow.com",
      urlLocal: "localhost:3002",
    },
  },
  {
    id: "3",
    name: "Device Manager",
    description: "Comprehensive device management system for monitoring and controlling IoT devices at scale",
    createdBy: "Smart Sensor Flow",
    createdAt: "2024-03-10T09:15:00Z",
    attributes: {
      urlLive: "devices.smartsensorflow.com",
      urlLocal: "localhost:3003",
    },
  },
  {
    id: "4",
    name: "Alert System",
    description: "Real-time alerting and notification system with custom triggers and multi-channel delivery",
    createdBy: "Smart Sensor Flow",
    createdAt: "2024-04-05T16:45:00Z",
    attributes: {
      urlLive: "alerts.smartsensorflow.com",
      urlLocal: "localhost:3004",
    },
  },
];

export const mockProductsByModule: Record<string, ProductResponse[]> = {
  "1": [ // IoT Dashboard products
    {
      id: 101,
      planID: "iot-basic",
      name: "Basic",
      price: "$29/month",
      type: "Products",
      description: "Perfect for small teams getting started with IoT monitoring",
      attributes: {
        features: [
          "Up to 10 devices",
          "Real-time monitoring",
          "Basic alerts",
          "7-day data retention",
          "Email support"
        ]
      }
    },
    {
      id: 102,
      planID: "iot-pro",
      name: "Professional",
      price: "$79/month",
      type: "Products", 
      description: "Ideal for growing businesses with advanced monitoring needs",
      attributes: {
        features: [
          "Up to 100 devices",
          "Advanced analytics",
          "Custom dashboards",
          "30-day data retention",
          "Priority support",
          "API access"
        ]
      }
    },
    {
      id: 103,
      planID: "iot-enterprise",
      name: "Enterprise",
      price: "$199/month",
      type: "Products",
      description: "Complete solution for large organizations with unlimited scale",
      attributes: {
        features: [
          "Unlimited devices",
          "Machine learning insights",
          "White-label options",
          "1-year data retention",
          "24/7 dedicated support",
          "Custom integrations"
        ]
      }
    }
  ],
  "2": [ // Data Analytics Pro products
    {
      id: 201,
      planID: "analytics-starter",
      name: "Starter",
      price: "$49/month",
      type: "Products",
      description: "Essential analytics for data-driven decision making",
      attributes: {
        features: [
          "Basic data processing",
          "Standard reports",
          "5GB data storage",
          "Monthly insights",
          "Email support"
        ]
      }
    },
    {
      id: 202,
      planID: "analytics-business",
      name: "Business",
      price: "$149/month",
      type: "Products",
      description: "Advanced analytics with AI-powered insights",
      attributes: {
        features: [
          "Advanced ML algorithms",
          "Custom reports",
          "50GB data storage", 
          "Real-time insights",
          "Priority support",
          "API integrations"
        ]
      }
    }
  ],
  "3": [ // Device Manager products
    {
      id: 301,
      planID: "device-basic",
      name: "Essential",
      price: "$39/month",
      type: "Products",
      description: "Basic device management for small deployments",
      attributes: {
        features: [
          "Up to 50 devices",
          "Remote monitoring",
          "Basic controls",
          "Status alerts",
          "Standard support"
        ]
      }
    }
  ],
  "4": [ // Alert System products
    {
      id: 401,
      planID: "alerts-basic",
      name: "Basic Alerts",
      price: "$19/month",
      type: "Products",
      description: "Simple alerting system for critical notifications",
      attributes: {
        features: [
          "Email notifications",
          "Basic triggers",
          "Up to 100 alerts/month",
          "Standard templates",
          "Email support"
        ]
      }
    },
    {
      id: 402,
      planID: "alerts-advanced",
      name: "Advanced Alerts",
      price: "$59/month",
      type: "Products",
      description: "Comprehensive alerting with multi-channel delivery",
      attributes: {
        features: [
          "SMS & Email notifications",
          "Custom triggers",
          "Unlimited alerts",
          "Custom templates",
          "Webhook integrations",
          "Priority support"
        ]
      }
    }
  ]
};

export const mockSelectedOrganisation: Organisation = {
  id: 1,
  name: "Smart Restaurants Co",
  modules: [
    mockModules[0], // IoT Dashboard - owned
    mockModules[3], // Alert System - owned
  ],
};