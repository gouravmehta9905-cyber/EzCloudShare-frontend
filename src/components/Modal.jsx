import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  confirmText,
  cancelText,
  onConfirm,
  confirmationButtonClass = "bg-blue-600 hover:bg-blue-700",
  size = "md",
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onMouseDown={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className={`bg-white w-full ${sizeClasses[size]} mx-4 rounded-xl shadow-lg`}
      >
        {title && (
          <div className="flex justify-between items-center border-b p-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
          </div>
        )}

        <div className="p-4">{children}</div>

        <div className="flex justify-end gap-2 border-t p-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
            className={`px-4 py-2 text-white rounded-lg ${confirmationButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") || document.body
  );
};

export default Modal;