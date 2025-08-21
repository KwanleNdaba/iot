import { PermissionResponse, RoleResponse, UserResponse } from "@/interfaces/permissions";


export const mockSelectedOrganisation: any = {
  id: 1,
  name: "Smart Restaurants Co",
  isOwner: true,
};

export const mockPermissions: PermissionResponse[] = [
  {
    id: 1,
    permissionName: "Read Users",
    permissionDescription: "View user information and profiles",
    scope: 1,
    domain: 1,
  },
  {
    id: 2,
    permissionName: "Write Users",
    permissionDescription: "Create, update, and manage users",
    scope: 2,
    domain: 1,
  },
  {
    id: 3,
    permissionName: "Delete Users",
    permissionDescription: "Remove users from the organization",
    scope: 3,
    domain: 1,
  },
  {
    id: 4,
    permissionName: "Read Devices",
    permissionDescription: "View device information and status",
    scope: 1,
    domain: 2,
  },
  {
    id: 5,
    permissionName: "Write Devices",
    permissionDescription: "Configure and manage devices",
    scope: 2,
    domain: 2,
  },
  {
    id: 6,
    permissionName: "Read Analytics",
    permissionDescription: "View analytics and reports",
    scope: 1,
    domain: 3,
  },
  {
    id: 7,
    permissionName: "Write Analytics",
    permissionDescription: "Create and modify analytics configurations",
    scope: 2,
    domain: 3,
  },
  {
    id: 8,
    permissionName: "Admin Access",
    permissionDescription: "Full administrative access to all features",
    scope: 4,
    domain: 0,
  },
];

export const mockRoles: RoleResponse[] = [
  {
    id: 1,
    roleName: "Administrator",
    roleDescription: "Full access to all organization features",
    organisationId: 1,
    createdBy: "john.doe@smartrestaurants.com",
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
  },
  {
    id: 2,
    roleName: "Device Manager",
    roleDescription: "Manage and monitor IoT devices",
    organisationId: 1,
    createdBy: "john.doe@smartrestaurants.com",
    createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
  },
  {
    id: 3,
    roleName: "Analyst",
    roleDescription: "View and analyze data and reports",
    organisationId: 1,
    createdBy: "john.doe@smartrestaurants.com",
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
  },
];

export const mockUsers: UserResponse[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    emailAddress: "john.doe@smartrestaurants.com",
    isOwner: true,
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Smith",
    emailAddress: "sarah.smith@smartrestaurants.com",
    isOwner: false,
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Johnson",
    emailAddress: "mike.johnson@smartrestaurants.com",
    isOwner: false,
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Davis",
    emailAddress: "emily.davis@contractor.com",
    isOwner: false,
  },
];