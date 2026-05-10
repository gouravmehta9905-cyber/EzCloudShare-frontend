import React from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";

const DashboardUpload = ({
  files = [],
  onFileChange,
  onUpload,
  uploading = false,
  onRemoveFile,
  remaingingUploads = 0,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Upload Files</h2>

      {/* File Input */}
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-purple-500 transition">
        <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
        <p className="text-sm text-gray-600">
          Click to upload or drag & drop
        </p>
        <input
          type="file"
          multiple
          className="hidden"
          onChange={onFileChange}
        />
      </label>

      {/* Remaining uploads */}
      <p className="text-xs text-gray-500 mt-2">
        Remaining uploads: {remaingingUploads}
      </p>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-4 space-y-3 max-h-48 overflow-y-auto">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium truncate max-w-45">
                  {file.name}
                </span>
                <span className="text-xs text-gray-400">
                  {(file.size / 1024).toFixed(2)} KB
                </span>
              </div>

              <button
                onClick={() => onRemoveFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={onUpload}
        disabled={uploading || files.length === 0}
        className={`w-full mt-6 flex items-center justify-center gap-2 py-2 rounded-lg text-white transition ${
          uploading || files.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {uploading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Uploading...
          </>
        ) : (
          "Upload Files"
        )}
      </button>
    </div>
  );
};

export default DashboardUpload;