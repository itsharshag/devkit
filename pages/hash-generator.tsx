import React, { useEffect, useState } from "react";

import CryptoJS from "crypto-js";

//@ts-ignore
import Button from "@/components/Button";
//@ts-ignore
import Input from "@/components/Input";
//@ts-ignore
import TextArea from "@/components/TextArea";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import ToolsLayout from "../components/ToolsLayout";
import InputColumnHeader from "../components/InputColumnHeader";

export default function Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState({
    MD5: "",
    SHA1: "",
    SHA256: "",
    SHA512: "",
  });
  const [isInputValid, setIsInputValid] = useState(true);

  const sampleInput = "Lorem ipsum dolor sit amet";

  useEffect(() => {
    if (!input) {
      setOutput({
        MD5: "",
        SHA1: "",
        SHA256: "",
        SHA512: "",
      });
      setIsInputValid(true);
      return;
    }
    try {
      setOutput({
        MD5: CryptoJS.MD5(input).toString(),
        SHA1: CryptoJS.SHA1(input).toString(),
        SHA256: CryptoJS.SHA256(input).toString(),
        SHA512: CryptoJS.SHA512(input).toString(),
      });
      setIsInputValid(true);
    } catch (e) {
      console.log("Error: ", e);
      setIsInputValid(false);
      return;
    }
  }, [input]);

  const copyToClipboard = (text) => navigator.clipboard.writeText(text);

  return (
    <div id="tools-page-grid" className="bp3-dark p-8">
      <div id="options" />
      <div className="tool" id="tool" style={{ minHeight: "80vh" }}>
        <div className="io-columns-header">
          <div className="io-column">
            <InputColumnHeader sampleInput={sampleInput} setInput={setInput} />
            <TextArea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                borderColor: isInputValid ? "" : "red",
              }}
              spellCheck={false}
              multiline={true}
              minRows={10}
            />
          </div>
          <div className="io-column">
            {Object.keys(output).map((key, index) => (
              <div className="mb-4" key={key}>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "32px",
                  }}
                  className="mb-4"
                >
                  <h2 className="font-semibold tracking-normal">{key}</h2>
                  <div>
                    <Button
                      variant="contained"
                      onClick={() => copyToClipboard(output[key])}
                      component="label"
                    >
                      <ContentCopyIcon style={{ fontSize: "16px" }} />
                    </Button>
                  </div>
                </div>
                <Input value={output[key]} spellCheck={false} readOnly />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Tool.getLayout = function getLayout(page) {
  return <ToolsLayout>{page}</ToolsLayout>;
};
