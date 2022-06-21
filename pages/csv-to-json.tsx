import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import csvtojson from "csvtojson";

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

  const sampleInput =
    '"car","price","color"\n"Audi",40000,"blue"\n"BMW",35000,"black"\n"Porsche",60000,"green"';

  const ioFunc = async (input) => await csvtojson().fromString(input);

  useEffect(() => {
    const calculateOutput = async () => {
      if (!input) {
        setIsInputValid(true);
        return;
      }
      try {
        const output = await ioFunc(input);
        setOutput(JSON.stringify(output, null, 3));
        setIsInputValid(true);
      } catch (e) {
        console.log("Invalid CSV", e);
        setIsInputValid(false);
        return;
      }
    };
    calculateOutput();
  }, [input]);

  return (
    <div id="tools-page-grid" className="p-8">
      <div id="options" />
      <div className="tool" id="tool" style={{ minHeight: "80vh" }}>
        <div className="io-columns-header">
          <div className="io-column">
            <InputColumnHeader sampleInput={sampleInput} setInput={setInput} />
            <CodeEditor
              language="javascript"
              value={input}
              onChange={(e) => setInput(e)}
              name="body"
            />
          </div>
          <div className="io-column">
            <OutputColumnHeader output={output} extension={"json"} />
            <CodeEditor
              language="json"
              value={output}
              disabled={true}
              name="body"
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
