import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { Parser } from "json2csv";

import ToolsLayout from "../components/ToolsLayout";
import InputColumnHeader from "../components/InputColumnHeader";
import OutputColumnHeader from "../components/OutputColumnHeader";

const CodeEditor = dynamic(() => import("../components/CodeEditor"), {
  ssr: false,
});

export default function Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);

  const sampleInputContent = [
    {
      car: "Audi",
      price: 40000,
      color: "blue",
    },
    {
      car: "BMW",
      price: 35000,
      color: "black",
    },
    {
      car: "Porsche",
      price: 60000,
      color: "green",
    },
  ];
  const sampleInput = JSON.stringify(sampleInputContent, null, 3);

  useEffect(() => {
    if (!input) {
      setIsInputValid(true);
      return;
    }
    try {
      const json = JSON.parse(input);
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(json);
      setOutput(csv);
      setIsInputValid(true);
    } catch (e) {
      console.log("Invalid JSON");
      setIsInputValid(false);
      return;
    }
  }, [input]);

  return (
    <div id="tools-page-grid" className="p-8">
      <div id="options" />
      <div className="tool" id="tool" style={{ minHeight: "80vh" }}>
        <div className="io-columns-header">
          <div className="io-column">
            <InputColumnHeader sampleInput={sampleInput} setInput={setInput} />
            <CodeEditor
              defaultLanguage="json"
              value={input}
              onChange={(e) => setInput(e)}
              name="input"
            />
          </div>
          <div className="io-column">
            <OutputColumnHeader output={output} extension={"csv"} />
            <CodeEditor
              defaultLanguage="javascript"
              value={output}
              name="output"
              setOptions={{
                readOnly: true,
              }}
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
