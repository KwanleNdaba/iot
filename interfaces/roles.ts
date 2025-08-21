export interface PermissionResponse {
  id: number;
  permissionName: string;
  permissionDescription: string;
  scope: number;
  domain: number;
}

export interface PermissionsResponse {
  permissions: PermissionResponse[];
}

export interface RoleResponse {
  id: number;
  roleName: string;
  roleDescription: string;
  organisationId: number;
  createdBy: string;
  createdAt: number;
}

export interface RolesResponse {
  roles: RoleResponse[];
}

export interface CreateRoleRequest {
  roleName: string;
  roleDescription: string;
  organisationId: number;
}

export interface UserRoleResponse {
  userId: number;
  roleId: number;
  roleName: string;
}

export interface UserRolesResponse {
  userRoles: UserRoleResponse[];
}