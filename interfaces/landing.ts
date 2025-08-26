// types/product.ts
export enum ProductType {
    Products = "Products",
    Platform = "Platform"
  }
  
  export interface ProductAttributesProducts {
    features?: string[];
    gateways?: string;
    assets?: string;
    dataPoints?: string;
    support?: boolean;
    whiteLabel?: boolean;
  }
  
  export interface ProductAttributesPlatform {
    userLimit?: number;
    supportChannels?: string[];
    responseSLA?: string;
    knowledgeBaseAccess?: boolean;
    proactiveMonitoring?: boolean;
    businessReviews?: boolean;
    onDemandTraining?: boolean;
    dedicatedAccountManager?: boolean;
  }
  
  export interface ProductResponse {
    id: number;
    planID: string;
    name: string;
    price: string;
    type: ProductType;
    description: string;
    attributes: ProductAttributesPlatform | ProductAttributesProducts;
  }