import React, { useEffect, useState } from "react";

import Highlighter from "react-highlight-words";

// import { TextField } from "@mui/material";

//@ts-ignore
import Input from "@/components/Input";
import { Textarea } from "@nextui-org/react";

import ToolsLayout from "../components/ToolsLayout";
import InputColumnHeader from "../components/InputColumnHeader";
import OutputColumnHeader from "../components/OutputColumnHeader";

export default function Tool() {
  const [regexInput, setRegexInput] = useState("");
  const [text, setText] = useState("");
  const [highlighterInput, setHighlighterInput] = useState({
    regexInput: "",
    text: "",
  });
  const [isRegexValid, setIsRegexValid] = useState(true);

  useEffect(() => {
    const calculateOutput = async () => {
      try {
        new RegExp(regexInput);
        setIsRegexValid(true);
        setHighlighterInput({ regexInput, text });
      } catch (e) {
        setIsRegexValid(false);
        return;
      }
    };
    calculateOutput();
  }, [regexInput, text]);

  const sampleRegex = "[ie]t";
  const sampleText = "Lorem ipsum dolor sit amet";

  return (
    <div id="tools-page-grid" className="p-8 bp3-dark">
      <div id="options" />
      <div className="tool" id="tool" style={{ minHeight: "80vh" }}>
        <div className="io-columns-header">
          <div className="io-column">
            <InputColumnHeader
              sampleInput={sampleRegex}
              setInput={setRegexInput}
              label="RegExp"
            />
            <Input
              value={regexInput}
              onChange={(e) => setRegexInput(e.target.value)}
              spellCheck={false}
            />
            {!isRegexValid && <p style={{ color: "red" }}>Invalid RegExp</p>}
            <br />
            <InputColumnHeader
              sampleInput={sampleText}
              setInput={setText}
              label="Text"
            />
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              spellCheck={false}
              minRows={10}
            />
          </div>
          <div className="io-column">
            <OutputColumnHeader extension="" />
            <Highlighter
              highlightClassName="YourHighlightClass"
              searchWords={[highlighterInput.regexInput]}
              textToHighlight={highlighterInput.text}
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
