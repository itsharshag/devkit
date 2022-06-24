import React, { useState } from "react";
import Button from "./Button";
import FileUpload from "./FileUpload";
import { Modal } from "@nextui-org/react";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="mb-4 flex items-center gap-20" style={{ height: "32px" }}>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        closeButton
        animated={false}
        className="relative bg-white p-10"
      >
        <div className="rounded-lg bg-blue-100 py-6 px-4  text-gray-800">
          <FileUpload
            beforeUploadCallback={(fileContent) => {
              setInput(fileContent);
              setIsModalOpen(false);
            }}
          />
        </div>
      </Modal>
      <p className="text-base font-semibold tracking-normal text-white">
        {label}
      </p>
      {showButtons && (
        <div className="buttons-group">
          <Button onClick={() => setInput(sampleInput)}>Use Sample</Button>
          {showLoadFileButton && <Button onClick={openModal}>Load File</Button>}
          <Button onClick={() => setInput("")}>Clear</Button>
        </div>
      )}
      {children}
    </div>
  );
}
