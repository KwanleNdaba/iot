"use client";
import { FC, ReactNode, useState } from "react";
import { AlertTriangle, XCircle, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

// Mock data types
enum AccountStatus {
  Pending = 0,
  Active = 1,
  Suspended = 2,
  Removed = 3
}

interface Organisation {
  id: number;
  name: string;
  userStatus: AccountStatus;
}

interface OrganizationAccessWrapperProps {
  children: ReactNode;
}

// Mock Access Denied Banner Component
interface AccessDeniedBannerProps {
  organizationName: string;
  userStatus: AccountStatus;
}

const AccessDeniedBanner: FC<AccessDeniedBannerProps> = ({
  organizationName,
  userStatus,
}) => {
  const getStatusInfo = () => {
    const statusString = typeof userStatus === "string" ? userStatus : AccountStatus[userStatus];
    
    if (statusString === "Suspended" || userStatus === AccountStatus.Suspended) {
      return {
        icon: <AlertTriangle className="h-4 w-4" />,
        variant: "destructive" as const,
        title: "Account Suspended",
        description: `Your access to ${organizationName} has been suspended. Please contact the organization owner for more information.`,
        badgeText: "Suspended"
      };
    }
    
    if (statusString === "Removed" || userStatus === AccountStatus.Removed) {
      return {
        icon: <XCircle className="h-4 w-4" />,
        variant: "destructive" as const,
        title: "Access Removed",
        description: `You have been removed from ${organizationName}. Contact the organization owner if you believe this is an error.`,
        badgeText: "Removed"
      };
    }

    return {
      icon: <Shield className="h-4 w-4" />,
      variant: "default" as const,
      title: "Access Restricted",
      description: `Your access to ${organizationName} is currently restricted.`,
      badgeText: "Restricted"
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <Alert variant={statusInfo.variant} className="mb-6">
      <div className="flex items-start gap-3">
        {statusInfo.icon}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold">{statusInfo.title}</h4>
            <Badge variant={statusInfo.variant === "destructive" ? "destructive" : "secondary"}>
              {statusInfo.badgeText}
            </Badge>
          </div>
          <AlertDescription>
            {statusInfo.description}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

// Mock organizations with different statuses for testing
const mockOrganisations: Organisation[] = [
  {
    id: 1,
    name: "TechCorp Solutions",
    userStatus: AccountStatus.Active,
  },
  {
    id: 2,
    name: "Suspended Org",
    userStatus: AccountStatus.Suspended,
  },
  {
    id: 3,
    name: "Removed Org", 
    userStatus: AccountStatus.Removed,
  },
];

const OrganizationAccessWrapper: FC<OrganizationAccessWrapperProps> = ({
  children,
}) => {
  // Mock organization store state - you can change the index to test different statuses
  // 0 = Active (normal access)
  // 1 = Suspended (restricted access with banner)
  // 2 = Removed (restricted access with banner)
  const [selectedOrganisation] = useState<Organisation | null>(
    mockOrganisations[0] // Change index to test different states
  );

  if (!selectedOrganisation) {
    return <>{children}</>;
  }

  const isSuspended =
    selectedOrganisation.userStatus === AccountStatus.Suspended ||
    (typeof selectedOrganisation.userStatus === "string" &&
      selectedOrganisation.userStatus === "Suspended");

  const isRemoved =
    selectedOrganisation.userStatus === AccountStatus.Removed ||
    (typeof selectedOrganisation.userStatus === "string" &&
      selectedOrganisation.userStatus === "Removed");

  const hasRestrictedAccess = isSuspended || isRemoved;

  return (
    <div className="w-full h-full">
      {hasRestrictedAccess && (
        <AccessDeniedBanner
          organizationName={selectedOrganisation.name}
          userStatus={selectedOrganisation.userStatus}
        />
      )}

      {hasRestrictedAccess ? (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            <div className="mb-4">
              <Shield className="mx-auto h-16 w-16 text-muted-foreground/50" />
            </div>
            <p className="text-lg font-medium mb-2">Access Restricted</p>
            <p>You cannot view this organization's information.</p>
            <p className="text-sm mt-2">
              Contact the organization owner if you need access restored.
            </p>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default OrganizationAccessWrapper;