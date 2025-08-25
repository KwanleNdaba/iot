// Payment interfaces
export interface InitializeTransactionRequest {
  productId: number;
  organizationId: number;
}

export interface InitializeTransactionResponse {
  authorizationUrl: string;
}

export interface VerifyTransactionResponse {
  status: string;
  reference: string;
  amount: number;
  currency: string;
  customerEmail: string;
  planCode: string;
  subscriptionCode: string;
  metadata?: any;
}