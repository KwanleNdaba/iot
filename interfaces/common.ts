export interface ValidationError {
  path: string;
  message: string;
}

export interface ApiError {
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  extensions?: {
    validationIssues?: ValidationError[];
  };
  errors?: Record<string, string[]>;
  validationErrors?: ValidationError[];
}

export enum AccountStatus {
  Pending = 0,
  Active = 1,
  Suspended = 2,
  Removed = 3
}