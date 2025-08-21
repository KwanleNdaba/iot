"use client";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  X, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  BarChart3,
  Settings,
  Zap,
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  CreditCard
} from "lucide-react";
import { SubscriptionCardProps } from "@/interfaces/product";

const SubscriptionCard: FC<SubscriptionCardProps> = ({ 
  subscription, 
  module, 
  onModuleClick, 
  onCancelClick 
}) => {
  const formatCurrency = (amount: number, currency: string) => {
    const locale = currency === "ZAR" ? "en-ZA" : "en-US";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency || "USD",
    }).format(amount);
  };

  const getDaysUntilPayment = (dateString: string) => {
    const paymentDate = new Date(dateString);
    const today = new Date();
    const diffTime = paymentDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getModuleIcon = (productName: string) => {
    const name = productName.toLowerCase();
    if (name.includes('analytics') || name.includes('data')) return BarChart3;
    if (name.includes('device') || name.includes('manager')) return Settings;
    if (name.includes('alert') || name.includes('notification')) return Zap;
    if (name.includes('iot') || name.includes('dashboard')) return Package;
    return Package;
  };

  const getSubscriptionDuration = () => {
    const startDate = new Date(subscription.initiationDate);
    const today = new Date();
    const diffTime = today.getTime() - startDate.getTime();
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
    return diffMonths;
  };

  const daysUntilPayment = getDaysUntilPayment(subscription.nextPaymentDate);
  const isExpiringSoon = daysUntilPayment <= 7;
  const isExpiringCritical = daysUntilPayment <= 3;
  const ModuleIcon = getModuleIcon(subscription.productName);
  const subscriptionDuration = getSubscriptionDuration();

  const getStatusConfig = () => {
    switch (subscription.status) {
      case "Active":
        return {
          badge: "bg-green-100 text-green-800 border-green-200",
          icon: CheckCircle,
          iconColor: "text-green-600",
          label: "Active"
        };
      case "NonRenewing":
        return {
          badge: "bg-amber-100 text-amber-800 border-amber-200",
          icon: AlertTriangle,
          iconColor: "text-amber-600",
          label: "Expiring"
        };
      default:
        return {
          badge: "bg-red-100 text-red-800 border-red-200",
          icon: X,
          iconColor: "text-red-600",
          label: subscription.status
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden min-h-[320px]">
      {/* Header Section */}
      <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors shadow-sm">
              <ModuleIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl font-bold text-gray-900 truncate mb-1">
                {subscription.productName}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 leading-relaxed">
                {module?.description || "Professional module subscription with enterprise features and support"}
              </CardDescription>
            </div>
          </div>
          <Badge className={`${statusConfig.badge} font-medium flex items-center space-x-1`}>
            <StatusIcon className={`w-3 h-3 ${statusConfig.iconColor}`} />
            <span>{statusConfig.label}</span>
          </Badge>
        </div>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="p-6 space-y-5">
        {/* Pricing Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                <DollarSign className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <span className="text-sm font-medium text-blue-900">Monthly Investment</span>
                <div className="text-xs text-blue-700">Subscription cost</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-900">
                {formatCurrency(subscription.price, subscription.currency)}
              </div>
              <div className="text-xs text-blue-700">per month</div>
            </div>
          </div>
        </div>

        {/* Subscription Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Calendar className="w-3 h-3 text-gray-500" />
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Next Payment</span>
            </div>
            <p className={`text-sm font-semibold ${
              isExpiringSoon ? (isExpiringCritical ? 'text-red-600' : 'text-amber-600') : 'text-gray-900'
            }`}>
              {new Date(subscription.nextPaymentDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
            {isExpiringSoon && (
              <p className="text-xs text-amber-700 font-medium">
                {daysUntilPayment} day{daysUntilPayment !== 1 ? 's' : ''} remaining
              </p>
            )}
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-3 h-3 text-gray-500" />
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Active Since</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {new Date(subscription.initiationDate).toLocaleDateString('en-US', { 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
            <p className="text-xs text-gray-600">
              {subscriptionDuration} month{subscriptionDuration !== 1 ? 's' : ''} active
            </p>
          </div>
        </div>

        {/* Cancellation Info */}
        {subscription.cancellationDate && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <X className="w-4 h-4 text-red-600" />
              <div>
                <span className="text-sm font-medium text-red-900">
                  Cancelled on {new Date(subscription.cancellationDate).toLocaleDateString()}
                </span>
                <p className="text-xs text-red-700 mt-1">
                  Access will end on next payment date
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Expiring Soon Warning */}
        {isExpiringSoon && subscription.status === "Active" && (
          <div className={`${
            isExpiringCritical ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'
          } border rounded-lg p-3`}>
            <div className="flex items-center space-x-2">
              <AlertTriangle className={`w-4 h-4 ${
                isExpiringCritical ? 'text-red-600' : 'text-amber-600'
              }`} />
              <div>
                <span className={`text-sm font-medium ${
                  isExpiringCritical ? 'text-red-900' : 'text-amber-900'
                }`}>
                  {isExpiringCritical ? 'Urgent: ' : ''}Renewing in {daysUntilPayment} day{daysUntilPayment !== 1 ? 's' : ''}
                </span>
                <p className={`text-xs mt-1 ${
                  isExpiringCritical ? 'text-red-700' : 'text-amber-700'
                }`}>
                  {isExpiringCritical ? 'Payment required to maintain access' : 'Automatic renewal scheduled'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-3 border-t border-gray-100">
          {module && (
            <Button
              onClick={() => onModuleClick(module)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 group"
              disabled={subscription.status !== "Active"}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Launch {subscription.productName}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          )}

          <div className="flex space-x-2">
            {subscription.status === "Active" && (
              <>
                <Button
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Manage Plan
                </Button>
                <Button
                  onClick={() => onCancelClick(subscription)}
                  variant="outline"
                  className="flex-1 border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Subscription Health Indicator */}
        <div className="flex items-center justify-center pt-2">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <div className={`w-2 h-2 rounded-full ${
              subscription.status === "Active" ? 'bg-green-500' : 
              subscription.status === "NonRenewing" ? 'bg-amber-500' : 'bg-red-500'
            }`} />
            <span>
              {subscription.status === "Active" ? 'Healthy subscription' :
               subscription.status === "NonRenewing" ? 'Expiring subscription' : 'Inactive subscription'}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
    </Card>
  );
};

export default SubscriptionCard;