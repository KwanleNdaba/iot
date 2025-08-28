export interface IOrganization {
  id?: number;
  organizationName: string;
  organizationType: string;
  industry: string;
  companySize: string;
  website?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  planId?: number;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOrganizationWithUser extends IOrganization {
  // User data for organization creation
  firstName: string;
  lastName: string;
  jobTitle?: string;
  email: string;
  phoneNumber?: string;
  password: string;
  role?: string;
}

// Separate interface for organization-only data (without user fields)
export interface IOrganizationData {
  organizationName: string;
  organizationType: string;
  industry: string;
  companySize: string;
  website?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  planId?: number;
}

// User data for organization creation
export interface IUserData {
  firstName: string;
  lastName: string;
  jobTitle?: string;
  email: string;
  phoneNumber?: string;
  password: string;
  role?: string;
}

// Combined interface for creating organization with user
export interface IOrganizationCreate extends IOrganizationData, IUserData {}

// Update interface - can update organization fields but not user data directly
export interface IOrganizationUpdate extends Partial<IOrganizationData> {
  id: number;
}

export interface IOrganizationResponse extends IOrganization {
  user?: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    jobTitle?: string;
    phoneNumber?: string;
    role?: string;
  };
  plan?: {
    id: number;
    name: string;
    planType: string;
    price: number;
  };
}