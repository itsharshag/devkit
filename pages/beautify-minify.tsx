import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import vkbeautify from "vkbeautify";

import { Typography } from "@mui/material";

import Select from "@/components/Select";
import Switch from "@/components/Switch";
import ToolsLayout from "@/components/ToolsLayout";
import InputColumnHeader from "@/components/InputColumnHeader";
import OutputColumnHeader from "@/components/OutputColumnHeader";

import samples from "../samples/beautify-minify";

const CodeEditor = dynamic(() => import("../components/CodeEditor"), {
  ssr: false,
});

export default function Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);

  const [type, setType] = useState("0");
  const [isMinifyMode, setIsMinifyMode] = useState(false);
  const [editorContentType, setEditorContentType] = useState("json");

  const ioFunc = {
    0: {
      name: "json",
      beautify: (text) => vkbeautify.json(text, 4),
      minify: vkbeautify.jsonmin,
    },
    1: {
      name: "css",
      beautify: (text) => vkbeautify.css(text, 4),
      minify: vkbeautify.cssmin,
    },
    2: {
      name: "xml",
      beautify: (text) => vkbeautify.xml(text, 4),
      minify: vkbeautify.xmlmin,
    },
    3: {
      name: "sql",
      beautify: (text) => vkbeautify.sql(text, 4),
      minify: vkbeautify.sqlmin,
    },
  };

  // const editorContentType = ioFunc[type].name;

  useEffect(() => {
    setEditorContentType(ioFunc[type].name);
    if (!input) {
      setOutput("");
      setIsInputValid(true);
      return;
    }
    try {
      const f = ioFunc[type][isMinifyMode ? "minify" : "beautify"];
      setOutput(f(input));
      setIsInputValid(true);
    } catch (e) {
      console.log("Invalid input", e);
      setIsInputValid(false);
      return;
    }
  }, [input, isMinifyMode, type]);

  useEffect(() => {
    setInput("");
    setOutput("");
  }, [type]);

  const options = [
    {
      value: "0",
      label: "JSON",
    },
    {
      value: "1",
      label: "CSS",
    },
    {
      value: "2",
      label: "XML",
    },
    {
      value: "3",
      label: "SQL",
    },
  ];

  return (
    <div id="tools-page-grid" className="text-white">
      <div id="options" className="px-10 py-2 pt-4">
        <div className="buttons"></div>
        <div className="flex items-center gap-2">
          <Typography>Beautify</Typography>
          <Switch
            checked={isMinifyMode}
            //@ts-ignore
            onChange={(e) => setIsMinifyMode(e.target.checked)}
          />
          <Typography>Minify</Typography>
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
            <InputColumnHeader
              sampleInput={samples[type]}
              setInput={setInput}
            />
            <CodeEditor
              language={editorContentType}
              value={input}
              onChange={(e) => setInput(e)}
              name="input"
              extraStyles={{
                border: isInputValid ? "" : "1px solid red",
              }}
            />
          </div>
          <div className="io-column" style={{ minHeight: "70vh" }}>
            <OutputColumnHeader output={output} extension={editorContentType} />
            <CodeEditor
              language={editorContentType}
              value={output}
              disabled={true}
              name="output"
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
