import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import { Button } from "../button";
import { Checkbox } from "../checkbox";
import { AlertTriangle } from "lucide-react";
import { SubscriptionResponse } from "@/interfaces/subscriptions";

interface DisableSubscriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  subscription: SubscriptionResponse & {
    organisationId: number;
    organisationName: string;
  } | null;
  isDisabling: boolean;
}

export const DisableSubscriptionDialog: FC<DisableSubscriptionDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  subscription,
  isDisabling,
}) => {
  const [confirmDisable, setConfirmDisable] = useState(false);

  const handleClose = () => {
    setConfirmDisable(false);
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    setConfirmDisable(false);
  };

  if (!subscription) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Permanently Disable Subscription
          </DialogTitle>
          <DialogDescription className="text-left space-y-3">
            <p>
              You are about to permanently disable your{" "}
              <strong>{subscription.productName}</strong> subscription for{" "}
              <strong>{subscription.organisationName}</strong>.
            </p>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="font-semibold text-destructive mb-2">
                ⚠️ This action cannot be undone
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Your subscription will be cancelled immediately</li>
                <li>• You will lose access to all premium features</li>
                <li>• No refunds will be provided for unused time</li>
                <li>• You will need to create a new subscription to regain access</li>
              </ul>
            </div>
            <p className="text-sm">
              If you only want to temporarily pause your subscription, please use the{" "}
              <strong>Manage</strong> button instead to access Paystack's subscription management page.
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2 py-4">
          <Checkbox
            id="confirm-disable"
            checked={confirmDisable}
            onCheckedChange={(checked) => setConfirmDisable(checked as boolean)}
          />
          <label
            htmlFor="confirm-disable"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I understand this action is permanent and cannot be undone
          </label>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isDisabling}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!confirmDisable || isDisabling}
          >
            {isDisabling ? "Disabling..." : "Permanently Disable Subscription"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
