import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { Typography } from "@mui/material";

import Select from "@/components/Select";
import Switch from "@/components/Switch";
import ToolsLayout from "@/components/ToolsLayout";
import InputColumnHeader from "@/components/InputColumnHeader";
import OutputColumnHeader from "@/components/OutputColumnHeader";

const CodeEditor = dynamic(() => import("../components/CodeEditor"), {
  ssr: false,
});

export default function Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);

  const [type, setType] = useState("0");
  const [isDecodeMode, setIsDecodeMode] = useState(false);

  const sampleInput = "johnedoe@example.com:password";

  const base64Encode = (input) => btoa(input);
  const base64Decode = (input) => atob(input);

  const ioFunc = {
    0: {
      encode: base64Encode,
      decode: base64Decode,
    },
    1: {
      encode: encodeURIComponent,
      decode: decodeURIComponent,
    },
  };

  useEffect(() => {
    if (!input) {
      setOutput("");
      setIsInputValid(true);
      return;
    }
    try {
      const f = ioFunc[type][isDecodeMode ? "decode" : "encode"];
      setOutput(f(input));
      setIsInputValid(true);
    } catch (e) {
      console.log("Invalid input", e);
      setIsInputValid(false);
      return;
    }
  }, [input, isDecodeMode, type]);

  const options = [
    {
      value: "0",
      label: "Base64",
    },
    {
      value: "1",
      label: "URI",
    },
  ];

  return (
    <div id="tools-page-grid" className="text-white">
      <div id="options" className="px-10 py-2 pt-4">
        <div className="flex items-center gap-2">
          <Typography>Encode</Typography>
          <Switch
            checked={isDecodeMode}
            //@ts-ignore
            onChange={(e) => setIsDecodeMode(e.target?.checked)}
          />
          <Typography>Decode</Typography>
        </div>
        <Select
          options={options}
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </div>
      <div className="tool p-8 pt-6" id="tool" style={{ minHeight: "80vh" }}>
        <div className="io-columns-header">
          <div className="io-column" style={{ minHeight: "70vh" }}>
            <InputColumnHeader sampleInput={sampleInput} setInput={setInput} />
            <CodeEditor
              language="plaintext"
              value={input}
              onChange={(e) => setInput(e)}
              name="body"
              extraStyles={{
                border: isInputValid ? "" : "1px solid red",
              }}
            />
          </div>
          <div className="io-column" style={{ minHeight: "70vh" }}>
            <OutputColumnHeader extension={""} />
            <CodeEditor
              language="plaintext"
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
