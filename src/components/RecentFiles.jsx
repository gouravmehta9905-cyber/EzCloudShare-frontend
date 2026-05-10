import React from "react";
import { FileText, Download, Calendar } from "lucide-react";

const RecentFiles = ({ files = [] }) => {
  if (!files.length) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8 text-center">
        <p className="text-gray-500">No recent files found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Files</h2>

      <div className="space-y-4">
        {files.map((file, index) => (
          <div
            key={file._id || index}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-xl hover:shadow-sm transition"
          >
            {/* File Info */}
            <div className="flex items-center gap-3">
              <FileText className="text-purple-500" size={22} />

              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {file.name || "Unnamed File"}
                </span>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Calendar size={14} />
                  {file.uploadAt
                    ? new Date(file.uploadAt).toLocaleString()
                    : "Unknown date"}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {file.url && (
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800"
                >
                  <Download size={18} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentFiles;