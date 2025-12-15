import React from "react";

interface Props {
  label: string;
  file: File | null;
}

export default function DocumentCard({ label, file }: Props) {
  if (!file) {
    return (
      <div className="border rounded-lg p-4 text-sm text-gray-400">
        {label} not uploaded
      </div>
    );
  }

  const fileUrl = URL.createObjectURL(file);

  return (
    <div className="border rounded-lg p-4 flex flex-col gap-2">
      <p className="font-medium text-gray-700">{label}</p>

      {file.type.startsWith("image/") ? (
        <img
          src={fileUrl}
          alt={label}
          className="h-32 object-cover rounded border"
        />
      ) : (
        <p className="text-sm text-gray-500">{file.name}</p>
      )}

      <a
        href={fileUrl}
        download={file.name}
        className="text-sm text-blue-600 hover:underline"
      >
        Download
      </a>
    </div>
  );
}
