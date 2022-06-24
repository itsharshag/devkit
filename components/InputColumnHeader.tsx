import React, { useState } from "react";

import Button from "./Button";

import { Dialog } from "@blueprintjs/core";
import FileUpload from "./FileUpload";

export default function InputColumnHeader({
  label = "Input",
  sampleInput,
  setInput,
  showButtons = true,
  showLoadFileButton = true,
  children,
}: {
  label?: string;
  sampleInput: any;
  setInput: any;
  showButtons?: boolean;
  showLoadFileButton?: boolean;
  children?: any;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex-20-gap-align-center mb-4" style={{ height: "32px" }}>
      <Dialog isOpen={isDialogOpen} className="relative p-12">
        <div className="cursor-pointer" onClick={() => setIsDialogOpen(false)}>
          <i
            className="fa-solid fa-xmark absolute right-3 top-3 rounded p-1 px-2 hover:bg-gray-200"
            style={{ fontSize: "24px" }}
          ></i>
        </div>
        <FileUpload
          beforeUploadCallback={(fileContent) => {
            setInput(fileContent);
            setIsDialogOpen(false);
          }}
        />
      </Dialog>
      <p className="text-base font-semibold tracking-normal text-white">
        {label}
      </p>
      {showButtons && (
        <div className="buttons-group">
          <Button onClick={() => setInput(sampleInput)}>Use Sample</Button>
          {showLoadFileButton && (
            <Button onClick={() => setIsDialogOpen(true)}>Load File</Button>
          )}
          <Button onClick={() => setInput("")}>Clear</Button>
        </div>
      )}
      {children}
    </div>
  );
}
