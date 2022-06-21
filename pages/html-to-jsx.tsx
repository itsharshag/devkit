import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import HtmlToJsx from "htmltojsx";

import ToolsLayout from "../components/ToolsLayout";
import InputColumnHeader from "../components/InputColumnHeader";
import OutputColumnHeader from "../components/OutputColumnHeader";
import sampleInput from "../samples/html-to-jsx";

const CodeEditor = dynamic(() => import("../components/CodeEditor"), {
  ssr: false,
});

export default function Tool(props) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);

  useEffect(() => {
    const calculateOutput = async () => {
      if (!input) {
        setIsInputValid(true);
        return;
      }
      try {
        const converter = new HtmlToJsx({
          createClass: false,
        });
        let output = converter.convert(input);
        setOutput(output);
        setIsInputValid(true);
      } catch (e) {
        setIsInputValid(false);
        return;
      }
    };
    calculateOutput();
  }, [input]);

  const router = useRouter();
  const path = router.pathname.replace("/app", "");

  return (
    <div id="tools-page-grid" className="p-8">
      <div id="options" />
      <div className="tool" id="tool" style={{ minHeight: "80vh" }}>
        <div className="io-columns-header">
          <div className="io-column">
            <InputColumnHeader sampleInput={sampleInput} setInput={setInput} />
            <CodeEditor
              defaultLanguage="html"
              value={input}
              onChange={(e) => setInput(e)}
              name="body"
            />
          </div>
          <div className="io-column">
            <OutputColumnHeader output={output} extension={"json"} />
            <CodeEditor
              defaultLanguage="html"
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
