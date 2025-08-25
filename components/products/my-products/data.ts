import { Organisation, SubscriptionResponse } from "@/interfaces/product";


// Mock data for development and testing
export const mockSelectedOrganisation: Organisation = {
  id: 1,
  name: "Smart Restaurants Co",
  modules: [
    {
      id: "1",
      name: "IoT Dashboard",
      description: "Real-time IoT monitoring and analytics",
      attributes: {
        urlLive: "iot-dashboard.smartrestaurants.com",
        urlLocal: "localhost:3001",
      },
    },
    {
      id: "2",
      name: "Data Analytics Pro",
      description: "Advanced data analytics platform",
      attributes: {
        urlLive: "analytics.smartrestaurants.com",
        urlLocal: "localhost:3002",
      },
    },
    {
      id: "3",
      name: "Device Manager",
      description: "Comprehensive device management system",
      attributes: {
        urlLive: "devices.smartrestaurants.com",
        urlLocal: "localhost:3003",
      },
    },
    {
      id: "4",
      name: "Alert System",
      description: "Real-time alerting and notifications",
      attributes: {
        urlLive: "alerts.smartrestaurants.com",
        urlLocal: "localhost:3004",
      },
    },
  ],
};

export const mockSubscriptions: SubscriptionResponse[] = [
  {
    id: 1,
    productName: "IoT Dashboard",
    status: "Active",
    price: 29.99,
    currency: "USD",
    nextPaymentDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    initiationDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    productType: 0,
  },
  {
    id: 2,
    productName: "Data Analytics Pro",
    status: "Active",
    price: 49.99,
    currency: "USD",
    nextPaymentDate: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000).toISOString(),
    initiationDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    productType: 0,
  },
  {
    id: 3,
    productName: "Device Manager",
    status: "NonRenewing",
    price: 19.99,
    currency: "USD",
    nextPaymentDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    initiationDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    cancellationDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    productType: 0,
  },
  {
    id: 4,
    productName: "Alert System",
    status: "Active",
    price: 15.99,
    currency: "USD",
    nextPaymentDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
    initiationDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    productType: 0,
  },
];