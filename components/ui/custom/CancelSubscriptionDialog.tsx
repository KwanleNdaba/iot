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

interface CancelSubscriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  subscription: SubscriptionResponse | null;
  isCancelling: boolean;
}

export const CancelSubscriptionDialog: FC<CancelSubscriptionDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  subscription,
  isCancelling,
}) => {
  const [confirmCancel, setConfirmCancel] = useState(false);

  const handleClose = () => {
    setConfirmCancel(false);
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    setConfirmCancel(false);
  };

  if (!subscription) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Permanently Cancel Subscription
          </DialogTitle>
          <DialogDescription className="text-left space-y-3">
            <p>
              You are about to permanently cancel your{" "}
              <strong>{subscription.productName}</strong> subscription.
            </p>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="font-semibold text-destructive mb-2">
                ⚠️ This action cannot be undone
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Your subscription will be cancelled immediately</li>
                <li>• The module will be removed from your organization</li>
                <li>• You will lose access to all module features</li>
                <li>• No refunds will be provided for unused time</li>
                <li>• You will need to purchase a new subscription to regain access</li>
              </ul>
            </div>
            <p className="text-sm">
              If you only want to temporarily pause your subscription, please close
              this dialog and use the <strong>Pause Subscription</strong> button instead.
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2 py-4">
          <Checkbox
            id="confirm-cancel"
            checked={confirmCancel}
            onCheckedChange={(checked) => setConfirmCancel(checked as boolean)}
          />
          <label
            htmlFor="confirm-cancel"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I understand this action is permanent and cannot be undone
          </label>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isCancelling}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!confirmCancel || isCancelling}
          >
            {isCancelling ? "Cancelling..." : "Permanently Cancel Subscription"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
