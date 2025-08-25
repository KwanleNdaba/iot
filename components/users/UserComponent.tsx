"use client";
import { FC, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  UserPlus,
  MoreHorizontal,
  Crown,
  User,
  UserCheck,
  UserX,
  UserMinus,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Users,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Loader from "@/components/ui/loader";

// Mock data types
enum AccountStatus {
  Pending = 0,
  Active = 1,
  Suspended = 2,
  Removed = 3
}

interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  profilePicture?: string;
  userStatus: AccountStatus;
  organisationStatus: AccountStatus;
  isOwner: boolean;
}

interface Organisation {
  id: number;
  name: string;
  isOwner: boolean;
}

const inviteUserSchema = z.object({
  emailAddress: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  surname: z.string().min(1, "Last name is required"),
});

type InviteUserFormData = z.infer<typeof inviteUserSchema>;

// Mock data
const mockCurrentUserEmail = "john.doe@techcorp.com";

const mockSelectedOrganisation: Organisation = {
  id: 1,
  name: "Smart Restaurants Co",
  isOwner: true,
};

const mockUsers: UserResponse[] = [
  {
    id: "1",
    firstName: "Carel",
    lastName: "Herbst",
    emailAddress: "info@smartsensorflow.com",
    profilePicture: "https://github.com/shadcn.png",
    userStatus: AccountStatus.Active,
    organisationStatus: AccountStatus.Pending,
    isOwner: true,
  },
  {
    id: "2", 
    firstName: "Sarah",
    lastName: "Smith",
    emailAddress: "sarah.smith@smartrestaurants.com",
    userStatus: AccountStatus.Active,
    organisationStatus: AccountStatus.Active,
    isOwner: false,
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Johnson",
    emailAddress: "mike.johnson@smartrestaurants.com",
    userStatus: AccountStatus.Active,
    organisationStatus: AccountStatus.Suspended,
    isOwner: false,
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Davis",
    emailAddress: "emily.davis@contractor.com",
    userStatus: AccountStatus.Active,
    organisationStatus: AccountStatus.Pending,
    isOwner: false,
  },
];

const UserComponent: FC = () => {
  // Mock store state
  const [selectedOrganisation] = useState<Organisation | null>(mockSelectedOrganisation);
  const [currentUserEmail] = useState(mockCurrentUserEmail);
  
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isInviteLoading, setIsInviteLoading] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [userToRemove, setUserToRemove] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [confirmRemoval, setConfirmRemoval] = useState(false);

  const form = useForm<InviteUserFormData>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      emailAddress: "",
      firstName: "",
      surname: "",
    },
  });

  // Mock functions
  const getProfilePictureUrl = () => {
    return "https://github.com/shadcn.png";
  };

  const fetchUsers = async () => {
    if (!selectedOrganisation) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(mockUsers);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedOrganisation]);

  const handleUserAction = async (
    action: string,
    userId: string,
    userName: string
  ) => {
    if (!selectedOrganisation) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      switch (action) {
        case "suspend":
          setUsers(prev => prev.map(user => 
            user.id === userId 
              ? { ...user, organisationStatus: AccountStatus.Suspended }
              : user
          ));
          toast.success(`${userName} has been suspended`);
          break;
        case "activate":
          setUsers(prev => prev.map(user => 
            user.id === userId 
              ? { ...user, organisationStatus: AccountStatus.Active }
              : user
          ));
          toast.success(`${userName} has been unsuspended`);
          break;
      }
    } catch (error) {
      console.error(`Failed to ${action} user:`, error);
      toast.error(`Failed to ${action} user`);
    }
  };

  const handleRemoveUser = (userId: string, userName: string) => {
    setUserToRemove({ id: userId, name: userName });
    setIsRemoveDialogOpen(true);
    setConfirmRemoval(false);
  };

  const handleConfirmRemoval = async () => {
    if (!selectedOrganisation || !userToRemove || !confirmRemoval) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Remove user from list
      setUsers(prev => prev.filter(user => user.id !== userToRemove.id));
      
      toast.success(
        `${userToRemove.name} has been removed from the organization`
      );
      setIsRemoveDialogOpen(false);
      setUserToRemove(null);
      setConfirmRemoval(false);
    } catch (error) {
      console.error("Failed to remove user:", error);
      toast.error("Failed to remove user");
    }
  };

  const handleCancelRemoval = () => {
    setIsRemoveDialogOpen(false);
    setUserToRemove(null);
    setConfirmRemoval(false);
  };

  const handleInvite = async (data: InviteUserFormData) => {
    if (!selectedOrganisation) return;

    setIsInviteLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add new user to list as pending
      const newUser: UserResponse = {
        id: Date.now().toString(),
        firstName: data.firstName,
        lastName: data.surname,
        emailAddress: data.emailAddress,
        userStatus: AccountStatus.Pending,
        organisationStatus: AccountStatus.Pending,
        isOwner: false,
      };
      
      setUsers(prev => [...prev, newUser]);
      
      toast.success("User invited successfully");
      form.reset();
      setIsInviteDialogOpen(false);
    } catch (error) {
      console.error("Failed to invite user:", error);
      toast.error("Failed to invite user");
    } finally {
      setIsInviteLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      form.reset();
    }
    setIsInviteDialogOpen(newOpen);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const isCurrentUser = (userEmail: string) => {
    return userEmail === currentUserEmail;
  };

  const isUserOwner = (user: UserResponse) => {
    return user.isOwner;
  };

  const isUserStatus = (status: AccountStatus, targetStatus: AccountStatus) => {
    return (
      status === targetStatus ||
      (typeof status === "string" && status === AccountStatus[targetStatus])
    );
  };

  const getStatusBadge = (status: AccountStatus) => {
    const statusString =
      typeof status === "string" ? status : AccountStatus[status];

    if (statusString === "Active" || status === AccountStatus.Active) {
      return (
        <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 text-xs font-medium">
          <CheckCircle className="mr-1.5 h-3 w-3" />
          Active
        </Badge>
      );
    }

    if (statusString === "Pending" || status === AccountStatus.Pending) {
      return (
        <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 text-xs font-medium">
          <Clock className="mr-1.5 h-3 w-3" />
          Pending
        </Badge>
      );
    }

    if (statusString === "Suspended" || status === AccountStatus.Suspended) {
      return (
        <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 text-xs font-medium">
          <AlertTriangle className="mr-1.5 h-3 w-3" />
          Suspended
        </Badge>
      );
    }

    if (statusString === "Removed" || status === AccountStatus.Removed) {
      return (
        <Badge className="bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 text-xs font-medium">
          <XCircle className="mr-1.5 h-3 w-3" />
          Removed
        </Badge>
      );
    }

    return (
      <Badge variant="outline" className="text-xs font-medium">
        {statusString || status}
      </Badge>
    );
  };

  const canManageUsers = selectedOrganisation?.isOwner;

  if (!selectedOrganisation) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Organization Members
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Please select an organization to manage users
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-none">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Organization Members
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  {users.length} {users.length === 1 ? "member" : "members"} in {selectedOrganisation.name}
                </p>
              </div>
            </div>
            {canManageUsers && (
              <Button 
                onClick={() => setIsInviteDialogOpen(true)} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2"
                size="sm"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Invite User
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader text="Loading members..." />
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-4">
                <Users className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                No members found
              </h3>
              <p className="text-sm text-gray-500">
                Get started by inviting users to this organization.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {users.map((user, index) => {
                const isOwner = isUserOwner(user);
                const isCurrent = isCurrentUser(user.emailAddress);

                return (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                      index === 0 ? 'rounded-t-lg' : ''
                    } ${
                      index === users.length - 1 ? 'rounded-b-lg' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10 border-2 border-gray-100">
                        <AvatarImage
                          src={isCurrent ? getProfilePictureUrl() : undefined}
                          alt={`${user.firstName} ${user.lastName}`}
                        />
                        <AvatarFallback className="bg-blue-100 text-blue-700 font-medium text-sm">
                          {getInitials(user.firstName, user.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-1">
                          <p className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                            {isCurrent && (
                              <span className="ml-1 text-blue-600 font-normal">(You)</span>
                            )}
                          </p>
                          {isOwner && (
                            <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200 text-xs font-medium">
                              <Crown className="mr-1.5 h-3 w-3" />
                              Owner
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-gray-500">{user.emailAddress}</p>
                          <div className="flex space-x-1">
                            {getStatusBadge(user.organisationStatus)}
                            {user.userStatus !== user.organisationStatus &&
                              getStatusBadge(user.userStatus)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    {canManageUsers && !isOwner && !isCurrent && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          {isUserStatus(user.organisationStatus, AccountStatus.Suspended) && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleUserAction(
                                  "activate",
                                  user.id,
                                  `${user.firstName} ${user.lastName}`
                                )
                              }
                              className="text-green-700"
                            >
                              <UserCheck className="mr-2 h-4 w-4" />
                              Unsuspend
                            </DropdownMenuItem>
                          )}

                          {isUserStatus(user.organisationStatus, AccountStatus.Active) && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleUserAction(
                                  "suspend",
                                  user.id,
                                  `${user.firstName} ${user.lastName}`
                                )
                              }
                              className="text-amber-700"
                            >
                              <UserX className="mr-2 h-4 w-4" />
                              Suspend
                            </DropdownMenuItem>
                          )}

                          {!isUserStatus(user.organisationStatus, AccountStatus.Removed) && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleRemoveUser(
                                  user.id,
                                  `${user.firstName} ${user.lastName}`
                                )
                              }
                              className="text-red-700"
                            >
                              <UserMinus className="mr-2 h-4 w-4" />
                              Remove
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Invite User Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Invite User to Organization
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Send an invitation to a user to join this organization.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleInvite)}
              className="space-y-4"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">First Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter first name" 
                          className="focus:ring-blue-500 focus:border-blue-500"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Last Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter last name" 
                          className="focus:ring-blue-500 focus:border-blue-500"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter email address" 
                          className="focus:ring-blue-500 focus:border-blue-500"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsInviteDialogOpen(false)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isInviteLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isInviteLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Send Invite
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Remove User Confirmation Dialog */}
      <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-red-600">
              <UserMinus className="h-5 w-5" />
              <span>Remove User from Organization</span>
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 text-left">
              You are about to permanently remove{" "}
              <span className="font-medium">{userToRemove?.name}</span> from{" "}
              <span className="font-medium">{selectedOrganisation?.name}</span>.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-red-800">
                    This action is permanent and cannot be undone
                  </p>
                  <p className="text-sm text-red-700">
                    The user will lose all access to this organization and its
                    resources immediately. If you want to temporarily restrict
                    access, consider suspending the user instead.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="confirm-removal"
                checked={confirmRemoval}
                onCheckedChange={(checked) =>
                  setConfirmRemoval(checked === true)
                }
                className="mt-0.5"
              />
              <label
                htmlFor="confirm-removal"
                className="text-sm text-gray-700 leading-relaxed cursor-pointer"
              >
                I understand this action is permanent and cannot be reversed
              </label>
            </div>
          </div>

          <DialogFooter className="space-x-2 pt-4">
            <Button 
              variant="outline" 
              onClick={handleCancelRemoval}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmRemoval}
              disabled={!confirmRemoval}
              className="bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-300 disabled:text-gray-500"
            >
              <UserMinus className="mr-2 h-4 w-4" />
              Remove User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserComponent;