"use client";

import { ChangeEvent, DragEvent, useState } from "react";
import * as XLSX from "xlsx";
import { Input } from "./ui/input";

type Line = Partial<{
  ID: string;
}>;

type FileInputProps = {
  onUpload: (data: string[]) => void;
};

function FileInput({ onUpload }: FileInputProps) {
  const [uploadedFile, setUploadedFile] = useState<File>();
  const [dragging, setDragging] = useState(false);

  function handleExtract(file: File) {
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target?.result, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);

      const IDs = (sheetData as Line[]).map((line: Line) => line.ID as string);

      onUpload(IDs);
    };

    reader.readAsArrayBuffer(file);
  }

  const handleFileUpload = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;

    const files = target.files;

    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];

    setUploadedFile(file);
    handleExtract(file);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];

    setUploadedFile(file);
    handleExtract(file);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md">
      <div
        className={`w-full h-32 flex items-center justify-center ${
          dragging ? "bg-gray-100" : "bg-white"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Input
          type="file"
          className="hidden"
          onChange={handleFileUpload}
          id="fileUpload"
        />
        <label
          htmlFor="fileUpload"
          className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
        >
          {uploadedFile ? (
            <p className="text-center text-gray-600">{uploadedFile.name}</p>
          ) : (
            <p className="text-center text-gray-600">
              Arraste e solte a planilha aqui, ou clique para fazer o upload.
            </p>
          )}
        </label>
      </div>
    </div>
  );
}

export default FileInput;
