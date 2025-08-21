import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { toast } from "sonner";

import { Check, X, Users, AlertTriangle } from "lucide-react";
import Loader from "../ui/loader";

// Mock data types
interface PendingInvite {
  inviteKey: string;
  organisationName: string;
  firstName?: string;
  lastName?: string;
  createdAt?: string;
  inviteExpireDate?: string;
}

interface Suspension {
  organisationId: number;
  organisationName: string;
}

// Mock data
const mockPendingInvites: PendingInvite[] = [
  {
    inviteKey: "invite-1",
    organisationName: "TechCorp Inc.",
    firstName: "John",
    lastName: "Doe",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    inviteExpireDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
  },
  {
    inviteKey: "invite-2",
    organisationName: "DataFlow Solutions",
    firstName: "Sarah",
    lastName: "Smith",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    inviteExpireDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
  },
];

const mockSuspensions: Suspension[] = [
  {
    organisationId: 1,
    organisationName: "Legacy Systems Ltd.",
  },
];

// Simple date formatting utility
const formatDistanceToNow = (date: Date) => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return "just now";
  if (diffInMinutes < 60)
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
  if (diffInHours < 24)
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  if (diffInDays < 7)
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;

  return date.toLocaleDateString();
};

const formatTimeUntil = (date: Date) => {
  const now = new Date();
  const diffInMs = date.getTime() - now.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMs < 0) return "expired";
  if (diffInMinutes < 60)
    return `in ${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""}`;
  if (diffInHours < 24)
    return `in ${diffInHours} hour${diffInHours !== 1 ? "s" : ""}`;

  return `in ${diffInDays} day${diffInDays !== 1 ? "s" : ""}`;
};

const NotificationList = () => {
  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([]);
  const [suspensions, setSuspensions] = useState<Suspension[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate total notification count
  const totalNotificationCount = pendingInvites.length + suspensions.length;

  // Simulate loading data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Set mock data - you can modify this to show different states:
        // For empty state: setPendingInvites([]) and setSuspensions([])
        // For error state: throw new Error("Failed to load notifications")
        setPendingInvites(mockPendingInvites);
        setSuspensions(mockSuspensions);
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load notifications");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAcceptInvite = async (
    inviteKey: string,
    organisationName: string
  ) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Remove the invite from the list
      setPendingInvites(prev => prev.filter(invite => invite.inviteKey !== inviteKey));
      
      toast.success(`Successfully joined ${organisationName}`);
      
      // In a real app, you would refresh app data here
      // await refreshData();
    } catch (error) {
      toast.error("Failed to accept invite");
    }
  };

  const handleRejectInvite = async (
    inviteKey: string,
    organisationName: string
  ) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Remove the invite from the list
      setPendingInvites(prev => prev.filter(invite => invite.inviteKey !== inviteKey));
      
      toast.success(`Declined invitation to ${organisationName}`);
    } catch (error) {
      toast.error("Failed to reject invite");
    }
  };

  const handleDismissSuspension = (
    organisationId: number,
    organisationName: string
  ) => {
    // Remove the suspension from the list
    setSuspensions(prev => prev.filter(suspension => suspension.organisationId !== organisationId));
    
    toast.success(`Dismissed suspension notification for ${organisationName}`);
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    
    // Simulate retry
    setTimeout(() => {
      setPendingInvites(mockPendingInvites);
      setSuspensions(mockSuspensions);
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="p-4 flex justify-center">
        <Loader text="" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-sm text-red-600 mb-2">{error}</div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRetry}
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (totalNotificationCount === 0) {
    return (
      <div className="p-4 text-center">
        <div className="flex flex-col items-center gap-2">
          <Users className="h-8 w-8 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">No notifications</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      <div className="p-3 border-b">
        <h3 className="font-semibold text-sm">Notifications</h3>
        <p className="text-xs text-muted-foreground">
          {totalNotificationCount} notification
          {totalNotificationCount !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="p-2 space-y-2">
        {/* Suspension Notifications */}
        {suspensions.length > 0 && (
          <>
            <div className="px-2 py-1">
              <h4 className="text-xs font-medium text-muted-foreground">
                Account Status
              </h4>
            </div>
            {suspensions.map((suspension, index) => (
              <div key={`suspension-${suspension.organisationId}`}>
                <Card className="border-0 shadow-none bg-red-50 dark:bg-red-950">
                  <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        Account Suspended
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                        onClick={() =>
                          handleDismissSuspension(
                            suspension.organisationId,
                            suspension.organisationName
                          )
                        }
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Your access to{" "}
                      <strong>{suspension.organisationName}</strong> has been
                      suspended. Please contact the organization owner for more
                      information.
                    </CardDescription>
                  </CardHeader>
                </Card>
                {(index < suspensions.length - 1 ||
                  pendingInvites.length > 0) && <Separator />}
              </div>
            ))}
          </>
        )}

        {/* Invitation Notifications */}
        {pendingInvites.length > 0 && (
          <>
            {suspensions.length > 0 && (
              <div className="px-2 py-1">
                <h4 className="text-xs font-medium text-muted-foreground">
                  Invitations
                </h4>
              </div>
            )}
            {pendingInvites.map((invite, index) => (
              <div key={invite.inviteKey}>
                <Card className="border-0 shadow-none">
                  <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {invite.organisationName || "Organization Invitation"}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {invite.createdAt ? (
                        <>
                          Invited{" "}
                          {formatDistanceToNow(new Date(invite.createdAt))}
                          {invite.firstName && invite.lastName && (
                            <span className="block">
                              From: {invite.firstName} {invite.lastName}
                            </span>
                          )}
                        </>
                      ) : (
                        "You have been invited to join an organization"
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() =>
                          handleAcceptInvite(
                            invite.inviteKey,
                            invite.organisationName || "Organization"
                          )
                        }
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() =>
                          handleRejectInvite(
                            invite.inviteKey,
                            invite.organisationName || "Organization"
                          )
                        }
                      >
                        <X className="h-3 w-3 mr-1" />
                        Decline
                      </Button>
                    </div>
                    {invite.inviteExpireDate && (
                      <div className="text-xs text-muted-foreground mt-2">
                        Expires{" "}
                        {formatTimeUntil(new Date(invite.inviteExpireDate))}
                      </div>
                    )}
                  </CardContent>
                </Card>
                {index < pendingInvites.length - 1 && <Separator />}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationList;