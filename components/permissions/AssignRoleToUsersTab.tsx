"use client";
import { FC, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { 
  MoreHorizontal, 
  Shield, 
  Users, 
  Settings, 
  Crown, 
  UserCheck,
  Search,
  User,
  UserX,
  Edit,
  Zap,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { AssignRoleToUsersTabProps } from "@/interfaces/permissions";
import AccessRestrictionCard from "./AccessRestrictionCard";

const AssignRoleToUsersTab: FC<AssignRoleToUsersTabProps> = ({
  users,
  roles,
  onRoleAssigned,
  isOwner,
  isLoading,
}) => {
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");
  const [isAssigning, setIsAssigning] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    return users.filter(user =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.emailAddress.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Get user and role objects for display
  const selectedUser = users.find(user => user.id === selectedUserId);
  const selectedRole = roles.find(role => role.id.toString() === selectedRoleId);

  // Get initials for avatar
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Get role badge styling
  const getRoleBadgeStyle = (roleName: string) => {
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

  const handleAssignRole = async () => {
    if (!selectedUserId || !selectedRoleId) {
      toast.error("Please select both a user and a role");
      return;
    }

    setIsAssigning(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log(`Assigning role ${selectedRoleId} to user ${selectedUserId}`);
      toast.success(`Role "${selectedRole?.roleName}" assigned to ${selectedUser?.firstName} ${selectedUser?.lastName} successfully`);
      setSelectedUserId("");
      setSelectedRoleId("");
      onRoleAssigned();
    } catch (error) {
      console.error("Failed to assign role:", error);
      toast.error("Failed to assign role");
    } finally {
      setIsAssigning(false);
    }
  };

  if (!isOwner) {
    return (
      <AccessRestrictionCard 
        message="Only organization owners can assign roles to users."
      />
    );
  }

  if (roles.length === 0) {
    return (
      <AccessRestrictionCard 
        title="No roles available"
        message="Create roles and assign permissions first before assigning to users."
        icon={Settings}
      />
    );
  }

  if (users.length === 0) {
    return (
      <AccessRestrictionCard 
        title="No users available"
        message="Invite users to this organization first."
        icon={Users}
      />
    );
  }

  const eligibleUsers = users.filter(user => !user.isOwner);

  return (
    <div className="space-y-6">
      {/* Assignment Form */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Assign Role to User</h2>
                <p className="text-sm text-gray-600 mt-0.5">
                  Grant specific roles and permissions to organization members
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Users className="w-4 h-4" />
              <span>{eligibleUsers.length} eligible users</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Selection */}
            <div className="space-y-3">
              <Label htmlFor="userSelect" className="text-sm font-medium text-gray-700">
                Select User
              </Label>
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger className="focus:ring-blue-500 focus:border-blue-500">
                  <SelectValue placeholder="Choose a user to assign role" />
                </SelectTrigger>
                <SelectContent>
                  {eligibleUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                            {getInitials(user.firstName, user.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.firstName} {user.lastName}</div>
                          <div className="text-xs text-gray-500">{user.emailAddress}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedUser && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                        {getInitials(selectedUser.firstName, selectedUser.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-blue-900">
                        {selectedUser.firstName} {selectedUser.lastName}
                      </p>
                      <p className="text-xs text-blue-700 truncate">
                        {selectedUser.emailAddress}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Role Selection */}
            <div className="space-y-3">
              <Label htmlFor="roleSelect" className="text-sm font-medium text-gray-700">
                Select Role
              </Label>
              <Select value={selectedRoleId} onValueChange={setSelectedRoleId}>
                <SelectTrigger className="focus:ring-blue-500 focus:border-blue-500">
                  <SelectValue placeholder="Choose a role to assign" />
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
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-green-900">
                        {selectedRole.roleName}
                      </p>
                      <p className="text-xs text-green-700">
                        {selectedRole.roleDescription}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Assignment Preview */}
          {selectedUser && selectedRole && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Zap className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-amber-900 mb-1">
                    Ready to Assign Role
                  </h4>
                  <p className="text-sm text-amber-800">
                    <span className="font-medium">{selectedUser.firstName} {selectedUser.lastName}</span> will be granted the{" "}
                    <span className="font-medium">"{selectedRole.roleName}"</span> role with its associated permissions.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Button
              onClick={handleAssignRole}
              disabled={
                isLoading || isAssigning || !selectedUserId || !selectedRoleId
              }
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6"
            >
              {isAssigning ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Assigning Role...
                </>
              ) : (
                <>
                  <UserCheck className="mr-2 h-4 w-4" />
                  Assign Role
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Current Assignments Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Current User Assignments</h3>
              <p className="text-sm text-gray-600 mt-0.5">
                View and manage role assignments for all organization members
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <Badge variant="outline" className="text-xs">
                {filteredUsers.length} of {users.length} users
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-900 pl-6">User</TableHead>
                <TableHead className="font-semibold text-gray-900">Email</TableHead>
                <TableHead className="font-semibold text-gray-900">Status</TableHead>
                <TableHead className="font-semibold text-gray-900">Current Roles</TableHead>
                <TableHead className="text-right font-semibold text-gray-900 pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="flex flex-col items-center space-y-2">
                      <Search className="w-8 h-8 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        No users found matching "{searchTerm}"
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user, index) => (
                  <TableRow 
                    key={user.id} 
                    className={`hover:bg-gray-50 transition-colors ${
                      index === filteredUsers.length - 1 ? '' : 'border-b border-gray-100'
                    }`}
                  >
                    <TableCell className="pl-6">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">
                            {getInitials(user.firstName, user.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-xs text-gray-500">
                            Member since 2024
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {user.emailAddress}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">Active</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {user.isOwner ? (
                          <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200">
                            <Crown className="mr-1.5 h-3 w-3" />
                            Owner
                          </Badge>
                        ) : (
                          <div className="flex items-center space-x-1">
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200">
                              <User className="mr-1.5 h-3 w-3" />
                              Member
                            </Badge>
                            {/* Mock additional roles - in real app, this would come from API */}
                            {Math.random() > 0.7 && (
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getRoleBadgeStyle('Analyst')}`}
                              >
                                Analyst
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      {!user.isOwner && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="text-gray-700">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Roles
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-gray-700">
                              <Shield className="mr-2 h-4 w-4" />
                              View Permissions
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-700 focus:text-red-700 focus:bg-red-50">
                              <UserX className="mr-2 h-4 w-4" />
                              Remove Roles
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Table Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 rounded-b-lg">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {filteredUsers.length} of {users.length} users
            </span>
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Crown className="w-3 h-3 text-amber-600" />
                <span>{users.filter(u => u.isOwner).length} owner(s)</span>
              </span>
              <span className="flex items-center space-x-1">
                <User className="w-3 h-3 text-blue-600" />
                <span>{users.filter(u => !u.isOwner).length} member(s)</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignRoleToUsersTab;