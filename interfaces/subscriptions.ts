export enum SubscriptionStatus {
  Active = "Active",
  NonRenewing = "NonRenewing",
  Attention = "Attention",
  Completed = "Completed",
  Cancelled = "Cancelled"
}

export enum BillingCycle {
  Monthly = "Monthly",
  Yearly = "Yearly"
}

export enum CancellationType {
  Immediate = "Immediate",
  NextBillingPeriod = "NextBillingPeriod"
}

export enum PaystackSubscriptionType {
  Platform = "Platform",
  Products = "Products"
}

export interface SubscriptionResponse {
  id: number;
  productName: string;
  status: SubscriptionStatus;
  billingCycle: BillingCycle;
  productType: number | string; // 0/"Products" = Products, 1/"Platform" = Platform
  price: number;
  currency: string;
  nextPaymentDate: string;
  initiationDate: string;
  cancellationDate?: string;
  // Paddle legacy field
  paddleSubscriptionId?: string;
  // Paystack fields
  paystackPlatformSubscriptionId?: string;
  paystackProductsSubscriptionId?: string;
  emailToken?: string;
}

export interface GetSubscriptionResponse {
  subscriptions: SubscriptionResponse[];
}