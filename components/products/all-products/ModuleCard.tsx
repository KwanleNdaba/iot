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
  Package, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Zap, 
  Calendar,
  User,
  ExternalLink,
  CheckCircle,
  ArrowRight,
  Star
} from "lucide-react";
import { ModuleCardProps } from "@/interfaces/product";

const ModuleCard: FC<ModuleCardProps> = ({ 
  module, 
  isOwned, 
  onViewProducts, 
  selectedOrganisation 
}) => {
  const getModuleIcon = (moduleName: string) => {
    const name = moduleName.toLowerCase();
    if (name.includes('analytics') || name.includes('data')) return BarChart3;
    if (name.includes('device') || name.includes('manager')) return Settings;
    if (name.includes('alert') || name.includes('notification')) return Zap;
    return Package;
  };

  const getModuleCategory = (moduleName: string) => {
    const name = moduleName.toLowerCase();
    if (name.includes('analytics') || name.includes('data')) return 'Analytics & Insights';
    if (name.includes('device') || name.includes('manager')) return 'Device Management';
    if (name.includes('alert') || name.includes('notification')) return 'Alerting & Notifications';
    if (name.includes('iot') || name.includes('dashboard')) return 'IoT Monitoring';
    return 'Platform Module';
  };

  const getModuleRating = () => {
    // Mock rating - in real app this would come from the API
    return (Math.random() * 2 + 3).toFixed(1);
  };

  const ModuleIcon = getModuleIcon(module.name);
  const category = getModuleCategory(module.name);
  const rating = getModuleRating();

  return (
    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden min-h-[280px]">
      {/* Header Section */}
      <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors shadow-sm">
              <ModuleIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <CardTitle className="text-xl font-bold text-gray-900 truncate">
                  {module.name}
                </CardTitle>
                {isOwned && (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline" className="text-xs font-medium text-blue-700 bg-blue-50 border-blue-200">
                  {category}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-amber-500 fill-current" />
                  <span className="text-xs font-medium text-gray-700">{rating}</span>
                </div>
              </div>
            </div>
          </div>
          <Badge
            className={
              isOwned
                ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-200 font-medium"
                : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 font-medium"
            }
          >
            {isOwned ? "Active" : "Available"}
          </Badge>
        </div>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="p-6 space-y-4">
        {/* Description */}
        <CardDescription className="text-sm text-gray-700 leading-relaxed line-clamp-3">
          {module.description}
        </CardDescription>

        {/* Module Details Grid */}
        <div className="grid grid-cols-2 gap-4 py-3 border-t border-gray-100">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <User className="w-3 h-3 text-gray-500" />
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Publisher</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">{module.createdBy}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Calendar className="w-3 h-3 text-gray-500" />
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Released</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {new Date(module.createdAt).toLocaleDateString('en-US', { 
                month: 'short', 
                year: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Key Features Preview */}
        <div className="py-3 border-t border-gray-100">
          <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
            Key Features
          </h4>
          <div className="grid grid-cols-1 gap-1">
            {/* Mock features - in real app these would come from API */}
            {[
              "Real-time monitoring",
              "Advanced analytics",
              "Custom dashboards"
            ].slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                <span className="text-xs text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Section */}
        <div className="pt-4 space-y-3">
          {isOwned ? (
            <div className="space-y-2">
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5"
                disabled={false}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Module
              </Button>
              <p className="text-xs text-green-700 text-center font-medium">
                Active subscription - ready to use
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Button
                onClick={() => onViewProducts(module)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 group"
                disabled={!selectedOrganisation}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                View Plans & Pricing
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
              {!selectedOrganisation ? (
                <p className="text-xs text-amber-700 text-center font-medium">
                  Select an organization to view pricing
                </p>
              ) : (
                <p className="text-xs text-gray-600 text-center">
                  Multiple plans available from $19/month
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
    </Card>
  );
};

export default ModuleCard;