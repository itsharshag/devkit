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
      <Dialog isOpen={isDialogOpen} isCloseButtonShown={true} className="p-8">
        <FileUpload
          beforeUploadCallback={(fileContent) => {
            setInput(fileContent);
            setIsDialogOpen(false);
          }}
        />
      </Dialog>
      <p className="font-semibold text-white text-base tracking-normal">
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
