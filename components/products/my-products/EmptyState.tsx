"use client";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { EmptyStateProps } from "@/interfaces/product";


const EmptyState: FC<EmptyStateProps> = ({ 
  title, 
  description, 
  actionText, 
  onAction 
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-8 text-center">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-4">
          <Package className="w-6 h-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {description}
        </p>
        {actionText && onAction && (
          <Button 
            onClick={onAction}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {actionText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;