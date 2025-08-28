import { AccountStatus } from './common';
import { IOrganization } from './organization';

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  profilePicture?: string;
  userStatus: AccountStatus;
  organisationStatus: AccountStatus;
  isOwner: boolean;
}

export interface GetUsersResponse {
  users: UserResponse[];
}

export interface InviteUserResponse {
  success: boolean;
  failureReason?: string;
}

export type IUserLogin = {
  email: string;
  password: string
}

export interface PendingInviteResponse {
  inviteKey: string;
  organisationName?: string;
  organisationId?: number;
  inviteExpireDate?: string;
  createdAt?: string;
  firstName?: string;
  lastName?: string;
}

export interface GetPendingInvitesResponse {
  invites: PendingInviteResponse[];
}

// Response from /me endpoint that includes both user info and invites
export interface MeResponse {
  firstName: string;
  lastName: string;
  emailAddress: string;
  profilePicture?: string;
  invites: PendingInviteResponse[];
}

export interface IDecodedJWT {
  id: number,
  email: string,
  role: string,
  firstName: string,
  lastName: string,
  jobTitle: string,
  phoneNumber?: string;
  organization?:IOrganization
  exp: number;
  iat: number;
}


export type TokenData = {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date
}
export type DataStoreInToken = {
  id: number,
  email: string,
  role: string,
  firstName: string,
  lastName: string,
  jobTitle: string,
  phoneNumber?: string;
  organization?:IOrganization
}