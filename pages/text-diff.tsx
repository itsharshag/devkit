import React, { useState } from "react";

import { DiffEditor } from "@monaco-editor/react";

import TextArea from "@/components/TextArea";
import ToolsLayout from "@/components/ToolsLayout";
import InputColumnHeader from "@/components/InputColumnHeader";

export default function Tool() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");

  const sampleOriginalText = "Lorem ipsum dolor";
  const sampleModifiedText = "Lorem ipsum dolor sit amet";

  return (
    <div id="tools-page-grid" className="bp3-dark p-8">
      <div id="options" />
      <div className="tool" id="tool">
        <div className="io-columns-header p-4" style={{ height: "50vh" }}>
          <div className="io-column">
            <InputColumnHeader
              label="Original Text"
              sampleInput={sampleOriginalText}
              setInput={setOriginal}
            />
            <TextArea
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              spellCheck={false}
              style={{ overflowY: "scroll" }}
              minRows={4}
              maxRows={10}
            />
          </div>
          <div className="io-column">
            <InputColumnHeader
              label="Modified Text"
              sampleInput={sampleModifiedText}
              setInput={setModified}
            />
            <TextArea
              value={modified}
              onChange={(e) => setModified(e.target.value)}
              spellCheck={false}
              multiline={true}
              style={{ overflowY: "scroll" }}
              minRows={4}
              maxRows={10}
            />
          </div>
        </div>
      </div>
      <div className="col-span-12 p-4" style={{ height: "50vh" }}>
        <p className="mb-2 text-base font-semibold tracking-normal">Diff</p>
        {original !== "" && original === modified && (
          <div style={{ textAlign: "center" }} className="mt-20">
            <h2 className="tracking-normal text-white">
              Both inputs are identical
            </h2>
          </div>
        )}
        {original !== "" && original !== modified && (
          <DiffEditor
            original={original}
            modified={modified}
            theme="vs-dark"
            options={{
              wordWrap: true,
              minimap: {
                enabled: false,
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

Tool.getLayout = function getLayout(page) {
  return <ToolsLayout>{page}</ToolsLayout>;
};
