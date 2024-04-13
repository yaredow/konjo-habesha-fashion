"use client";

import React, { SetStateAction, useState } from "react";
import { Paperclip, Upload } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "./ui/file-upload";

const FileSvgDraw = () => {
  return (
    <button
      type="button"
      className="flex aspect-square max-h-[8rem] w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed"
    >
      <Upload className="h-4 w-4 text-muted-foreground" />
      <span className=" text-sm text-muted-foreground">Click to upload</span>
    </button>
  );
};

export default function ImageUploader({
  files,
  setFiles,
}: {
  files: File[] | null;
  setFiles: React.Dispatch<SetStateAction<File[] | null>>;
}) {
  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  return (
    <FileUploader
      value={files}
      onValueChange={setFiles}
      dropzoneOptions={dropZoneConfig}
      className="relative rounded-lg bg-background"
    >
      <FileInput className="outline-dashed outline-1 outline-white">
        <div className="flex w-full flex-col items-center justify-center pb-4 pt-3 ">
          <FileSvgDraw />
        </div>
      </FileInput>
      <FileUploaderContent>
        {files &&
          files.length > 0 &&
          files.map((file, i) => (
            <FileUploaderItem key={i} index={i}>
              <Paperclip className="h-4 w-4 stroke-current" />
              <span>{file.name}</span>
            </FileUploaderItem>
          ))}
      </FileUploaderContent>
    </FileUploader>
  );
}
