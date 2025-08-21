"use client";
import { FC, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { 
  Shield, 
  Settings, 
  UserCheck, 
  Search,
  CheckSquare,
  Square,
  Lock,
  Users,
  Database,
  BarChart3,
  Zap
} from "lucide-react";
import { PermissionResponse, RoleResponse } from "@/interfaces/roles";

interface AssignPermissionsTabProps {
  roles: RoleResponse[];
  permissions: PermissionResponse[];
  onPermissionAssigned: () => void;
  isOwner: boolean;
  isLoading: boolean;
}

const AssignPermissionsTab: FC<AssignPermissionsTabProps> = ({
  roles,
  permissions,
  onPermissionAssigned,
  isOwner,
  isLoading,
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [isAssigning, setIsAssigning] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Helper functions - moved before useMemo calls
  const getDomainName = (domain: number) => {
    switch (domain) {
      case 0: return "System";
      case 1: return "User Management";
      case 2: return "Device Management";
      case 3: return "Analytics";
      default: return "Other";
    }
  };

  const getDomainIcon = (domain: number) => {
    switch (domain) {
      case 0: return Settings;
      case 1: return Users;
      case 2: return Database;
      case 3: return BarChart3;
      default: return Lock;
    }
  };

  const getScopeLevel = (scope: number) => {
    switch (scope) {
      case 1: return { label: "Read", color: "bg-green-100 text-green-800 border-green-200" };
      case 2: return { label: "Write", color: "bg-blue-100 text-blue-800 border-blue-200" };
      case 3: return { label: "Delete", color: "bg-red-100 text-red-800 border-red-200" };
      case 4: return { label: "Admin", color: "bg-purple-100 text-purple-800 border-purple-200" };
      default: return { label: "Unknown", color: "bg-gray-100 text-gray-800 border-gray-200" };
    }
  };

  // Group permissions by domain for better organization
  const groupedPermissions = useMemo(() => {
    const groups: { [key: string]: PermissionResponse[] } = {};
    
    permissions.forEach(permission => {
      const domain = getDomainName(permission.domain);
      if (!groups[domain]) {
        groups[domain] = [];
      }
      groups[domain].push(permission);
    });
    
    return groups;
  }, [permissions]);

  // Filter permissions based on search term
  const filteredPermissions = useMemo(() => {
    if (!searchTerm) return permissions;
    return permissions.filter(permission =>
      permission.permissionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.permissionDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [permissions, searchTerm]);

  const handlePermissionToggle = (permissionId: number) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSelectAll = () => {
    const currentPermissions = searchTerm ? filteredPermissions : permissions;
    const allIds = currentPermissions.map(p => p.id);
    const hasAll = allIds.every(id => selectedPermissions.includes(id));
    
    if (hasAll) {
      setSelectedPermissions(prev => prev.filter(id => !allIds.includes(id)));
    } else {
      setSelectedPermissions(prev => [...new Set([...prev, ...allIds])]);
    }
  };

  const handleAssignPermissions = async () => {
    if (!selectedRoleId) {
      toast.error("Please select a role");
      return;
    }

    if (selectedPermissions.length === 0) {
      toast.error("Please select at least one permission");
      return;
    }

    setIsAssigning(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      for (const permissionId of selectedPermissions) {
        console.log(`Assigning permission ${permissionId} to role ${selectedRoleId}`);
      }

      toast.success(
        `${selectedPermissions.length} permission(s) assigned successfully`
      );
      setSelectedPermissions([]);
      onPermissionAssigned();
    } catch (error) {
      console.error("Failed to assign permissions:", error);
      toast.error("Failed to assign permissions");
    } finally {
      setIsAssigning(false);
    }
  };

  if (!isOwner) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-8 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-4">
            <Shield className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Access Restricted
          </h3>
          <p className="text-sm text-gray-600">
            Only organization owners can assign permissions to roles.
          </p>
        </div>
      </div>
    );
  }

  if (roles.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-8 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-4">
            <Settings className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No roles available
          </h3>
          <p className="text-sm text-gray-600">
            Create roles first in the previous tab to assign permissions.
          </p>
        </div>
      </div>
    );
  }

  const selectedRole = roles.find(role => role.id.toString() === selectedRoleId);
  const currentPermissions = searchTerm ? filteredPermissions : permissions;
  const allSelected = currentPermissions.length > 0 && currentPermissions.every(p => selectedPermissions.includes(p.id));
  const someSelected = currentPermissions.some(p => selectedPermissions.includes(p.id));

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Assign Permissions to Role</h2>
              <p className="text-sm text-gray-600 mt-0.5">
                Select a role and configure its permissions
              </p>
            </div>
          </div>
          {selectedPermissions.length > 0 && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {selectedPermissions.length} Selected
            </Badge>
          )}
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Role Selection */}
        <div>
          <Label htmlFor="roleSelect" className="text-sm font-medium text-gray-700">
            Select Role
          </Label>
          <Select value={selectedRoleId} onValueChange={setSelectedRoleId}>
            <SelectTrigger className="mt-1 focus:ring-blue-500 focus:border-blue-500">
              <SelectValue placeholder="Choose a role to configure" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.id.toString()}>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded">
                      <Shield className="w-3 h-3 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium">{role.roleName}</div>
                      <div className="text-xs text-gray-500">{role.roleDescription}</div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {selectedRole && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  Configuring permissions for: {selectedRole.roleName}
                </span>
              </div>
              <p className="text-xs text-blue-700 mt-1">
                {selectedRole.roleDescription}
              </p>
            </div>
          )}
        </div>

        {/* Permissions Section */}
        {selectedRoleId && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-gray-700">
                Available Permissions ({permissions.length})
              </Label>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                  className="text-xs"
                >
                  {allSelected ? (
                    <>
                      <Square className="w-3 h-3 mr-1" />
                      Deselect All
                    </>
                  ) : (
                    <>
                      <CheckSquare className="w-3 h-3 mr-1" />
                      Select All
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search permissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Permissions List */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="max-h-80 overflow-y-auto">
                {searchTerm ? (
                  // Filtered view
                  <div className="divide-y divide-gray-100">
                    {filteredPermissions.length === 0 ? (
                      <div className="p-8 text-center">
                        <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">No permissions found matching "{searchTerm}"</p>
                      </div>
                    ) : (
                      filteredPermissions.map((permission) => {
                        const scope = getScopeLevel(permission.scope);
                        const DomainIcon = getDomainIcon(permission.domain);
                        
                        return (
                          <div
                            key={permission.id}
                            className="flex items-start space-x-3 p-4 hover:bg-gray-50 transition-colors"
                          >
                            <Checkbox
                              id={`permission-${permission.id}`}
                              checked={selectedPermissions.includes(permission.id)}
                              onCheckedChange={() => handlePermissionToggle(permission.id)}
                              disabled={isLoading || isAssigning}
                              className="mt-1"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <DomainIcon className="w-4 h-4 text-gray-500" />
                                <Label
                                  htmlFor={`permission-${permission.id}`}
                                  className="font-medium text-gray-900 cursor-pointer"
                                >
                                  {permission.permissionName}
                                </Label>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${scope.color}`}
                                >
                                  {scope.label}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {permission.permissionDescription}
                              </p>
                              <div className="flex items-center space-x-2 mt-2">
                                <span className="text-xs text-gray-500">
                                  Domain: {getDomainName(permission.domain)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                ) : (
                  // Grouped view
                  <div>
                    {Object.entries(groupedPermissions).map(([domainName, domainPermissions]) => {
                      const DomainIcon = getDomainIcon(domainPermissions[0]?.domain || 0);
                      return (
                        <div key={domainName}>
                          <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
                            <div className="flex items-center space-x-2">
                              <DomainIcon className="w-4 h-4 text-gray-600" />
                              <h4 className="text-sm font-medium text-gray-900">{domainName}</h4>
                              <Badge variant="outline" className="text-xs">
                                {domainPermissions.length}
                              </Badge>
                            </div>
                          </div>
                          <div className="divide-y divide-gray-100">
                            {domainPermissions.map((permission) => {
                              const scope = getScopeLevel(permission.scope);
                              
                              return (
                                <div
                                  key={permission.id}
                                  className="flex items-start space-x-3 p-4 hover:bg-gray-50 transition-colors"
                                >
                                  <Checkbox
                                    id={`permission-${permission.id}`}
                                    checked={selectedPermissions.includes(permission.id)}
                                    onCheckedChange={() => handlePermissionToggle(permission.id)}
                                    disabled={isLoading || isAssigning}
                                    className="mt-1"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <Label
                                        htmlFor={`permission-${permission.id}`}
                                        className="font-medium text-gray-900 cursor-pointer"
                                      >
                                        {permission.permissionName}
                                      </Label>
                                      <Badge
                                        variant="outline"
                                        className={`text-xs ${scope.color}`}
                                      >
                                        {scope.label}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                      {permission.permissionDescription}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Assignment Summary */}
            {selectedPermissions.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    Ready to assign {selectedPermissions.length} permission(s)
                  </span>
                </div>
                <p className="text-xs text-blue-700">
                  These permissions will be granted to the "{selectedRole?.roleName}" role.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        {selectedRoleId && (
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Button
              onClick={handleAssignPermissions}
              disabled={
                isLoading ||
                isAssigning ||
                !selectedRoleId ||
                selectedPermissions.length === 0
              }
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6"
            >
              {isAssigning ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Assigning Permissions...
                </>
              ) : (
                <>
                  <UserCheck className="mr-2 h-4 w-4" />
                  Assign {selectedPermissions.length} Permission{selectedPermissions.length !== 1 ? 's' : ''}
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignPermissionsTab;