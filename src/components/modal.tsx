"use client";
import React from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  showBackdrop?: boolean;
  backdropOpacity?: number;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  showCloseButton = true,
  closeOnOutsideClick = true,
  showBackdrop = true,
  backdropOpacity = 50,
}: ModalProps) {
  const modalRef = useOutsideClick<HTMLDivElement>(
    onClose,
    closeOnOutsideClick && isOpen
  );

  // Don't render if modal is not open
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <>
      {/* Backdrop */}
      {showBackdrop && (
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity`}
          style={{
            backgroundColor: `rgba(0, 0, 0, ${backdropOpacity / 100})`,
          }}
        />
      )}

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          ref={modalRef}
          className={`${sizeClasses[size]} w-full bg-white rounded-lg shadow-xl transform transition-all`}
        >
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-primary-200">
              <h2 className="text-xl font-semibold text-primary-dark">
                {title}
              </h2>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-1 text-primary-400 hover:text-primary-600 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className={`${title ? "p-6" : "p-6"}`}>{children}</div>

          {/* Footer */}
          {footer && (
            <div className="flex items-center justify-end gap-3 p-6 border-t border-primary-200 bg-primary-50">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Export additional modal components for common use cases
export interface ConfirmModalProps extends Omit<ModalProps, "children"> {
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  isLoading?: boolean;
  variant?: "danger" | "warning" | "info";
}

// Confirm Modal
export function ConfirmModal({
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  isLoading = false,
  variant = "danger",
  ...modalProps
}: ConfirmModalProps) {
  const variantStyles = {
    danger: {
      confirmButton: "bg-danger hover:bg-danger/90 text-white",
      icon: "⚠️",
    },
    warning: {
      confirmButton: "bg-accent hover:bg-accent/90 text-white",
      icon: "⚡",
    },
    info: {
      confirmButton: "bg-secondary hover:bg-secondary/90 text-white",
      icon: "ℹ️",
    },
  };

  const style = variantStyles[variant];

  return (
    <Modal {...modalProps}>
      <div className="text-center">
        <div className="text-4xl mb-4">{style.icon}</div>
        <p className="text-primary-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={modalProps.onClose}
            disabled={isLoading}
            className="px-4 py-2 border border-primary-300 text-primary-dark rounded-lg hover:bg-primary-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg transition-colors ${style.confirmButton} disabled:opacity-50`}
          >
            {isLoading ? "Loading..." : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
