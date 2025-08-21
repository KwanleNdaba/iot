"use client";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, X } from "lucide-react";
import { CancelSubscriptionDialogProps } from "@/interfaces/product";


const CancelSubscriptionDialog: FC<CancelSubscriptionDialogProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  subscription, 
  isCancelling 
}) => {
  if (!subscription) return null;

  const formatCurrency = (amount: number, currency: string) => {
    const locale = currency === "ZAR" ? "en-ZA" : "en-US";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency || "USD",
    }).format(amount);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            <span>Cancel Subscription</span>
          </DialogTitle>
          <DialogDescription className="text-left pt-2">
            You are about to cancel your subscription to{" "}
            <span className="font-medium">{subscription.productName}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-red-800">
                  Your subscription will be cancelled immediately
                </p>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• You will lose access to the module</li>
                  <li>• No refund will be issued for the current billing period</li>
                  <li>• You can resubscribe at any time</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Next billing date:</span>
              <span className="font-medium">
                {new Date(subscription.nextPaymentDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">Monthly cost:</span>
              <span className="font-medium">
                {formatCurrency(subscription.price, subscription.currency)}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="space-x-2 pt-4">
          <Button 
            variant="outline" 
            onClick={onClose} 
            disabled={isCancelling}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Keep Subscription
          </Button>
          <Button 
            onClick={onConfirm} 
            disabled={isCancelling}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isCancelling ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Cancelling...
              </>
            ) : (
              <>
                <X className="mr-2 h-4 w-4" />
                Cancel Subscription
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelSubscriptionDialog;