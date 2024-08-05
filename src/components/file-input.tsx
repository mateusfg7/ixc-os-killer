"use client";

import { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";

type Line = Partial<{
  ID: string;
}>;

type FileInputProps = {
  onUpload: (data: string[]) => void;
};

function FileInput({ onUpload }: FileInputProps) {
  const [data, setData] = useState<Line[]>();

  const handleFileUpload = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;

    const files = target.files;

    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];

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
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {data && (
        <div className="flex flex-wrap gap-1">
          {data ? (
            data.map((line) => <span key={line.ID}>{line.ID}</span>)
          ) : (
            <span>No data</span>
          )}
        </div>
      )}
    </div>
  );
}

export default FileInput;
