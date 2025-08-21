import { FC } from "react";
import { Alert, AlertDescription, AlertTitle } from "../alert";
import { Button } from "../button";
import { AlertTriangle } from "lucide-react";

interface InactiveOrganisationBannerProps {
  organisationName: string;
  onContinueSetup: () => void;
}

const InactiveOrganisationBanner: FC<InactiveOrganisationBannerProps> = ({
  organisationName,
  onContinueSetup,
}) => {
  return (
    <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
      <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
      <AlertTitle className="text-orange-800 dark:text-orange-200">
        Unlock Premium Features
      </AlertTitle>
      <AlertDescription className="text-orange-700 dark:text-orange-300">
        <div className="space-y-3">
          <p>
            Upgrade "{organisationName}" to unlock advanced features like
            enhanced sensor analytics, team collaboration, and priority support.
          </p>
          <Button
            onClick={onContinueSetup}
            variant="outline"
            className="border-orange-300 cursor-pointer text-orange-800 hover:bg-orange-100 dark:border-orange-700 dark:text-orange-200 dark:hover:bg-orange-900"
          >
            Choose Plan
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default InactiveOrganisationBanner;
