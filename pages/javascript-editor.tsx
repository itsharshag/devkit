import React, { useState } from "react";
import dynamic from "next/dynamic";

import Button from "@/components/Button";
import ToolsLayout from "@/components/ToolsLayout";
import InputColumnHeader from "@/components/InputColumnHeader";
import OutputColumnHeader from "@/components/OutputColumnHeader";

const CodeEditor = dynamic(() => import("@/components/CodeEditor"), {
  ssr: false,
});
const JavaScriptEditorConsole = dynamic(
  () => import("@/components/JavaScriptEditorConsole"),
  { ssr: false }
);

export default function Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);

  const runBtnHandler = (input) => {
    try {
      eval(input);
    } catch (e) {
      console.error(e);
    }
  };

  const sampleInput = `console.log("Hello World!");`;

  return (
    <div id="tools-page-grid" className="p-8">
      <div className="tool" id="tool" style={{ minHeight: "80vh" }}>
        <div className="io-columns-header">
          <div className="io-column">
            <InputColumnHeader sampleInput={sampleInput} setInput={setInput} />
            <CodeEditor
              defaultLanguage="javascript"
              value={input}
              onChange={(e) => setInput(e)}
              name="body"
            />
          </div>
          <div className="io-column">
            <OutputColumnHeader output={output} extension={""}>
              <div className="ml-auto buttons">
                <Button
                  variant="contained"
                  onClick={(e) => runBtnHandler(input)}
                  component="label"
                >
                  Run
                </Button>
              </div>
            </OutputColumnHeader>
            <div
              style={{
                backgroundColor: "#242424",
                flex: 1,
              }}
            >
              <JavaScriptEditorConsole logs={output} setLogs={setOutput} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Tool.getLayout = function getLayout(page) {
  return <ToolsLayout>{page}</ToolsLayout>;
};
