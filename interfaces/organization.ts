import { AccountStatus } from './common';

export enum OrganisationState {
  Inactive = 0,
  Active = 1,
  Disabled = 2
}

export interface ModuleAttributes {
  urlLive: string;
  urlLocal: string;
}

export interface ModuleResponse {
  id: string;
  name: string;
  description: string;
  attributes: ModuleAttributes;
  createdBy: string;
  createdAt: string;
  modifiedBy: string;
  modifiedAt: string;
}

export interface GetModulesResponse {
  modules: ModuleResponse[];
}

export interface OrganisationResponse {
  id: number;
  name: string;
  organisationStatus: OrganisationState;
  createdAt: string;
  modules: ModuleResponse[];
  isOwner: boolean;
  userStatus: AccountStatus;
}

export interface GetOrganisationResponse {
  organisations: OrganisationResponse[];
}

export interface CreateOrganisationResponse {
  organisationId: number;
}