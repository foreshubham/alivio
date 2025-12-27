import React, { useState, useEffect } from "react";

interface Props {
  label: string;
  file: File | null;
  setFile: (file: File | null) => void;
  error?: string;
}

export default function FileUpload({ label, file, setFile, error }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [file]);

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        className="border rounded w-full p-2"
        accept="image/*,application/pdf"
      />
      {file && (
        <div className="flex items-center justify-between mt-2 border rounded p-2 bg-gray-50">
          <div className="flex items-center gap-2">
            {preview && file.type.startsWith("image/") && (
              <img src={preview} alt="preview" className="w-10 h-10 object-cover rounded" />
            )}
            <span className="text-sm">{file.name}</span>
          </div>
          <button
            type="button"
            onClick={() => setFile(null)}
            className="text-red-600 font-bold"
          >
            ×
          </button>
        </div>
      )}
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}
