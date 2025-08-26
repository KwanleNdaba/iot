// data/mockProducts.ts

import { ProductResponse, ProductType } from "@/interfaces/landing";


export const mockProducts: ProductResponse[] = [
  {
    id: 1,
    planID: "maker-plan",
    name: "Maker",
    price: "Free",
    type: ProductType.Products,
    description: "Perfect for hobbyists and small projects getting started with IoT",
    attributes: {
      gateways: "1",
      assets: "5",
      dataPoints: "1,000",
      support: false,
      whiteLabel: false,
      features: ["Basic dashboards", "Community support", "Real-time monitoring"]
    }
  },
  {
    id: 2,
    planID: "prototype-plan",
    name: "Prototype",
    price: "$49/month",
    type: ProductType.Products,
    description: "Ideal for prototyping and small business deployments",
    attributes: {
      gateways: "5",
      assets: "25",
      dataPoints: "50,000",
      support: true,
      whiteLabel: false,
      features: ["Advanced dashboards", "Email support", "API access", "Custom alerts"]
    }
  },
  {
    id: 3,
    planID: "business-plan",
    name: "Business",
    price: "$199/month",
    type: ProductType.Platform,
    description: "Comprehensive solution for growing businesses and enterprises",
    attributes: {
      userLimit: 100,
      supportChannels: ["Email", "Phone", "Chat"],
      responseSLA: "4 hours",
      knowledgeBaseAccess: true,
      proactiveMonitoring: true,
      businessReviews: true,
      onDemandTraining: true,
      dedicatedAccountManager: true
    }
  }
];