// Types and Interfaces for Products System
export interface SubscriptionResponse {
  id: number;
  productName: string;
  status: "Active" | "NonRenewing" | "Cancelled";
  price: number;
  currency: string;
  nextPaymentDate: string;
  initiationDate: string;
  cancellationDate?: string;
  productType: number | string;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  attributes: {
    urlLive: string;
    urlLocal: string;
  };
}

export interface Organisation {
  id: number;
  name: string;
  modules: Module[];
}

// Component props interfaces
export interface SubscriptionCardProps {
  subscription: SubscriptionResponse;
  module?: Module;
  onModuleClick: (module: Module) => void;
  onCancelClick: (subscription: SubscriptionResponse) => void;
}

export interface CancelSubscriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  subscription: SubscriptionResponse | null;
  isCancelling: boolean;
}

export interface ProductsSummaryProps {
  subscriptions: SubscriptionResponse[];
  totalMonthlyCost: number;
  currency: string;
}

export interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

// Types and Interfaces for All Products System
export interface ModuleResponse {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  attributes: {
    urlLive: string;
    urlLocal: string;
  };
}

export interface ProductResponse {
  id: number;
  planID: string;
  name: string;
  price: string;
  type: string;
  description: string;
  attributes: {
    features?: string[];
    [key: string]: any;
  };
}

export interface ModuleWithProducts extends ModuleResponse {
  products: ProductResponse[];
  productsLoading: boolean;
}



// Component props interfaces
export interface ModuleCardProps {
  module: ModuleWithProducts;
  isOwned: boolean;
  onViewProducts: (module: ModuleWithProducts) => void;
  selectedOrganisation: Organisation | null;
}

export interface ProductSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModule: ModuleWithProducts | null;
  onPurchaseProduct: (product: ProductResponse) => void;
  purchasingProductId: number | null;
  selectedOrganisation: Organisation | null;
}

export interface PricingCardProps {
  product: ProductResponse;
  isPopular: boolean;
  onPurchase: (product: ProductResponse) => void;
  isPurchasing: boolean;
  disabled: boolean;
}