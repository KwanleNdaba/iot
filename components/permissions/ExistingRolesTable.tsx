"use client";
import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Users, 
  Calendar,
  User,
  Shield,
  Settings,
  Edit,
  Trash2
} from "lucide-react";
import { RoleResponse } from "@/interfaces/permissions";

interface ExistingRolesTableProps {
  roles: RoleResponse[];
  onEditRole?: (role: RoleResponse) => void;
  onDeleteRole?: (role: RoleResponse) => void;
  isOwner?: boolean;
}

const ExistingRolesTable: FC<ExistingRolesTableProps> = ({ 
  roles, 
  onEditRole,
  onDeleteRole,
  isOwner = true 
}) => {
  if (roles.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-8 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-4">
            <Shield className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No roles created yet
          </h3>
          <p className="text-sm text-gray-600">
            Create your first role to get started with permission management.
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diffInDays = Math.floor((now - timestamp) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  const getRoleBadgeColor = (roleName: string) => {
    const name = roleName.toLowerCase();
    if (name.includes('admin')) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    if (name.includes('manager')) {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    }
    if (name.includes('analyst')) {
      return 'bg-green-100 text-green-800 border-green-200';
    }
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Existing Roles</h3>
              <p className="text-sm text-gray-600 mt-0.5">
                {roles.length} {roles.length === 1 ? 'role' : 'roles'} created for this organization
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs font-medium">
            {roles.length} Total
          </Badge>
        </div>
      </div>
      
      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-900 pl-6">Role</TableHead>
              <TableHead className="font-semibold text-gray-900">Description</TableHead>
              <TableHead className="font-semibold text-gray-900">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>Created By</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Created</span>
                </div>
              </TableHead>
              {isOwner && (
                <TableHead className="text-right font-semibold text-gray-900 pr-6">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role, index) => (
              <TableRow 
                key={role.id} 
                className={`hover:bg-gray-50 transition-colors ${
                  index === roles.length - 1 ? '' : 'border-b border-gray-100'
                }`}
              >
                <TableCell className="pl-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                      <Shield className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 mb-1">
                        {role.roleName}
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs font-medium ${getRoleBadgeColor(role.roleName)}`}
                      >
                        {role.roleName.toLowerCase().includes('admin') ? 'Administrative' : 
                         role.roleName.toLowerCase().includes('manager') ? 'Management' :
                         role.roleName.toLowerCase().includes('analyst') ? 'Analytical' : 'Standard'}
                      </Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600 max-w-xs">
                  <p className="truncate" title={role.roleDescription}>
                    {role.roleDescription}
                  </p>
                </TableCell>
                <TableCell className="text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-700">
                        {role.createdBy.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm">{role.createdBy}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">
                  <div>
                    <div className="text-sm font-medium">
                      {formatDate(role.createdAt)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {getTimeAgo(role.createdAt)}
                    </div>
                  </div>
                </TableCell>
                {isOwner && (
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem 
                          onClick={() => onEditRole?.(role)}
                          className="text-gray-700"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Role
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-gray-500 cursor-not-allowed" 
                          disabled
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Manage Permissions
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onDeleteRole?.(role)}
                          className="text-red-700 focus:text-red-700 focus:bg-red-50"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Role
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Footer with summary info */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 rounded-b-lg">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Showing {roles.length} of {roles.length} roles
          </span>
          <span>
            Last updated {getTimeAgo(Math.max(...roles.map(r => r.createdAt)))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExistingRolesTable;