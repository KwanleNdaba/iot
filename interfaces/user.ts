import { AccountStatus } from './common';

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