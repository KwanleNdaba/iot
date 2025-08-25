import { FC } from "react";
import { Alert, AlertDescription } from "../alert";
import { AlertTriangle, XCircle } from "lucide-react";
import { AccountStatus } from "@/interfaces/common";


interface AccessDeniedBannerProps {
  organizationName: string;
  userStatus: AccountStatus;
}

const AccessDeniedBanner: FC<AccessDeniedBannerProps> = ({
  organizationName,
  userStatus,
}) => {
  const isSuspended =
    userStatus === AccountStatus.Suspended ||
    (typeof userStatus === "string" && userStatus === "Suspended");
  const isRemoved =
    userStatus === AccountStatus.Removed ||
    (typeof userStatus === "string" && userStatus === "Removed");

  if (!isSuspended && !isRemoved) {
    return null;
  }

  return (
    <Alert variant="destructive" className="mb-6">
      {isSuspended ? (
        <AlertTriangle className="h-4 w-4" />
      ) : (
        <XCircle className="h-4 w-4" />
      )}
      <AlertDescription>
        {isSuspended ? (
          <>
            <strong>Access Suspended:</strong> Your access to{" "}
            <strong>{organizationName}</strong> has been suspended. You cannot
            view or modify organization details. Please contact the organization
            owner for assistance.
          </>
        ) : (
          <>
            <strong>Access Removed:</strong> You have been removed from{" "}
            <strong>{organizationName}</strong>. You no longer have access to
            this organization's data or settings.
          </>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default AccessDeniedBanner;
