"use client";
import { mockPermissions, mockRoles, mockUsers } from "@/components/permissions/data";
import { Organisation, PermissionResponse, RoleResponse, UserResponse } from "@/interfaces/permissions";
import { useState, useEffect } from "react";
import { toast } from "sonner";


export const usePermissionsData = (selectedOrganisation: Organisation | null) => {
  const [permissions, setPermissions] = useState<PermissionResponse[]>([]);
  const [roles, setRoles] = useState<RoleResponse[]>([]);
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    if (!selectedOrganisation) return;

    setIsLoading(true);
    try {
      console.log(
        "Fetching permissions data for organization:",
        selectedOrganisation.id
      );

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setPermissions(mockPermissions);
      setRoles(mockRoles);
      setUsers(mockUsers);
      
      console.log("All data fetched successfully");
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed to load permissions data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedOrganisation]);

  return {
    permissions,
    roles,
    users,
    isLoading,
    refetchData: fetchData,
  };
};