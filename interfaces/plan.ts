

export interface IPlan {
  id?: number;
  planType: PlanType;
  name: string;
  description: string;
  price: number;
  isPopular?: boolean;
  features: string[];
  supportName?: string;
  supportHours?: number;
  supportDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPlanCreate extends Omit<IPlan, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IPlanUpdate extends Partial<Omit<IPlan, 'id' | 'createdAt' | 'updatedAt'>> {
  id: number;
}

export interface IPlanFilters {
  planType?: PlanType;
  minPrice?: number;
  maxPrice?: number;
  isPopular?: boolean;
}

export interface IPlanStats {
  totalPlans: number;
  popularPlans: number;
  averagePrice: number;
  plansByType: Record<PlanType, number>;
}


// Define the enum for plan types
export enum PlanType {
  MAKER = "maker",
  PROTOTYPE = "prototype",
  STARTUP = "startup",
  BUSINESS = "business",
  BUSINESS_PLUS = "business-plus",
}
