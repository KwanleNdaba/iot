// Types and Interfaces for Permissions System
export interface PermissionResponse {
  id: number;
  permissionName: string;
  permissionDescription: string;
  scope: number;
  domain: number;
}

export interface RoleResponse {
  id: number;
  roleName: string;
  roleDescription: string;
  organisationId: number;
  createdBy: string;
  createdAt: number;
}

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  isOwner: boolean;
}

export interface Organisation {
  id: number;
  name: string;
  isOwner: boolean;
}

export interface CreateRoleRequest {
  roleName: string;
  roleDescription: string;
  organisationId: number;
}

// Common component props interfaces
export interface BaseTabProps {
  isOwner: boolean;
  isLoading: boolean;
}

export interface CreateRoleTabProps extends BaseTabProps {
  organisationId: number;
  onRoleCreated: () => void;
}

export interface AssignPermissionsTabProps extends BaseTabProps {
  roles: RoleResponse[];
  permissions: PermissionResponse[];
  onPermissionAssigned: () => void;
}

export interface AssignRoleToUsersTabProps extends BaseTabProps {
  users: UserResponse[];
  roles: RoleResponse[];
  onRoleAssigned: () => void;
}