import React, { useEffect } from "react";
import { X, Copy, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const LinkShareModal = ({ isOpen, onClose, link }) => {
  if (!isOpen) return null;

  // close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard");
    } catch (error) {
      console.error("Copy failed", error);
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Modal */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Share File Link
        </h2>

        {/* Link Box */}
        <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg border">
          <input
            type="text"
            value={link}
            readOnly
            className="flex-1 bg-transparent outline-none text-sm text-gray-700"
          />
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            <Copy size={16} />
            Copy
          </button>
        </div>

        {/* Info */}
        <p className="text-sm text-gray-500 mt-3">
          Anyone with this link can view the file.
        </p>

        {/* Footer */} 
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkShareModal;