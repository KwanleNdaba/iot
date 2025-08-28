"use client";

import { AlertCircle, X, Loader2 } from "lucide-react";
import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmationModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: ReactNode;
  confirmText?: string;
  isLoading: boolean;
  cancelText?: string;
  icon?: ReactNode;
  confirmColor?: "danger" | "success" | "primary" | "warning";
}

export function ConfirmationModal({
  show,
  onClose,
  isLoading,
  onConfirm,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  icon,
  confirmColor = "danger",
}: ConfirmationModalProps) {
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && show && !isLoading) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [show, onClose, isLoading]);

  const handleConfirm = () => {
    if (!isLoading) {
      onConfirm();
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  const getConfirmButtonStyles = () => {
    const baseStyles = "px-4 py-2.5 cursor-pointer rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    switch (confirmColor) {
      case "danger":
        return `${baseStyles} bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 text-white shadow-sm hover:shadow-md`;
      case "success":
        return `${baseStyles} bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500 text-white shadow-sm hover:shadow-md`;
      case "primary":
        return `${baseStyles} bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white shadow-sm hover:shadow-md`;
      case "warning":
        return `${baseStyles} bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-500 text-white shadow-sm hover:shadow-md`;
      default:
        return `${baseStyles} bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 text-white shadow-sm hover:shadow-md`;
    }
  };

  const getIconColor = () => {
    switch (confirmColor) {
      case "danger":
        return "text-red-500 dark:text-red-400";
      case "success":
        return "text-green-500 dark:text-green-400";
      case "primary":
        return "text-blue-500 dark:text-blue-400";
      case "warning":
        return "text-yellow-500 dark:text-yellow-400";
      default:
        return "text-red-500 dark:text-red-400";
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2,
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Enhanced Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-colors duration-300"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants as any}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 w-full max-w-md mx-auto transition-colors duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                {title}
              </h3>
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="text-center">
                {/* Icon */}
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-700/50 flex items-center justify-center transition-colors duration-300">
                  {icon || <AlertCircle className={`w-8 h-8 ${getIconColor()} transition-colors duration-300`} />}
                </div>

                {/* Message */}
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed transition-colors duration-300">
                    {message}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={handleClose}
                    disabled={isLoading}
                    className="px-4 py-2.5 cursor-pointer rounded-lg font-medium text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {cancelText}
                  </button>
                  
                  <button
                    onClick={handleConfirm}
                    disabled={isLoading}
                    className={getConfirmButtonStyles()}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <span>{confirmText}</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}