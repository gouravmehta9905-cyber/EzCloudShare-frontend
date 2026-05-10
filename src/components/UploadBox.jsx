import React, { useRef, useCallback } from "react";
import { UploadCloud, X, File, AlertCircle } from "lucide-react";   

const UploadBox = ({
  files = [],
  onFileChange,
  onRemoveFile,
  onUpload,
  uploading = false,
  remainingCredits = 0,
  isUploadDisabled = false,
}) => {
  const fileInputRef = useRef(null);

  // Handle input change
  const handleInputChange = (e) => {
    if (!onFileChange) return;
    onFileChange(e);
  };

  // Drag & Drop
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      if (!onFileChange) return;

      const fakeEvent = {
        target: {
          files: e.dataTransfer.files,
        },
      };

      onFileChange(fakeEvent);
    },
    [onFileChange]
  );

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Drop Area */}
      <div
        onClick={() => fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition rounded-2xl p-8 text-center cursor-pointer bg-white"
      >
        <UploadCloud className="mx-auto mb-3 text-gray-400" size={40} />
        <p className="text-gray-700 font-medium">
          Drag & drop files here or{" "}
          <span className="text-blue-600">browse</span>
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Max files depend on your credits
        </p>

        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {/* Credits Info */}
      <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
        <AlertCircle size={16} />
        <span>Remaining Credits: {remainingCredits}</span>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6 bg-gray-50 rounded-xl p-4">
          <h4 className="font-semibold mb-3">Selected Files</h4>

          <ul className="space-y-3">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <File size={18} className="text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload Button */}
      <div className="mt-6">
        <button
          onClick={onUpload}
          disabled={isUploadDisabled || uploading}
          className={`w-full py-3 rounded-xl font-semibold transition ${
            isUploadDisabled || uploading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {uploading ? "Uploading..." : "Upload Files"}
        </button>
      </div>
    </div>
  );
};

export default UploadBox;