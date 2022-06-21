import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import ToolsLayout from "../components/ToolsLayout";
import InputColumnHeader from "../components/InputColumnHeader";
import OutputColumnHeader from "../components/OutputColumnHeader";

import sampleInput from "../samples/html-editor";

const CodeEditor = dynamic(() => import("../components/CodeEditor"), {
  ssr: false,
});

export default function Tool() {
  const [input, setInput] = useState("");

  return (
    <div id="tools-page-grid" className="p-8">
      <div id="options" />
      <div className="tool" id="tool" style={{ minHeight: "80vh" }}>
        <div className="io-columns-header">
          <div className="io-column" style={{ gridColumn: "1 / 3" }}>
            <InputColumnHeader sampleInput={sampleInput} setInput={setInput} />
            <CodeEditor
              defaultLanguage="html"
              value={input}
              onChange={(e) => setInput(e)}
              name="body"
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Tool.getLayout = function getLayout(page) {
  return <ToolsLayout>{page}</ToolsLayout>;
};
