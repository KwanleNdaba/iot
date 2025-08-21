"use client";
import { FC } from "react";
import { Shield } from "lucide-react";

interface AccessRestrictionCardProps {
  title?: string;
  message?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const AccessRestrictionCard: FC<AccessRestrictionCardProps> = ({
  title = "Access Restricted",
  message = "Only organization owners can perform this action.",
  icon: Icon = Shield,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-8 text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-4">
          <Icon className="w-6 h-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600">
          {message}
        </p>
      </div>
    </div>
  );
};

export default AccessRestrictionCard;