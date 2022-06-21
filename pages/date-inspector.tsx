import React, { useEffect, useState } from "react";

//@ts-ignore
import Button from "@/components/Button";
//@ts-ignore
import TextField from "@/components/Input";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import ToolsLayout from "../components/ToolsLayout";
import InputColumnHeader from "../components/InputColumnHeader";

export default function Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState({
    isoString: "",
    prettyFormat: "",
    unixTime: "",
    isLeapYear: "",
  });
  const [isInputValid, setIsInputValid] = useState(true);

  const sampleInput = "01/01/2022";

  const isLeap = (year) => new Date(year, 1, 29).getDate() === 29;

  const copyToClipboard = (text) => navigator.clipboard.writeText(text);

  const isValidDate = (d: any) => {
    //@ts-ignore
    return d instanceof Date && !isNaN(d);
  };

  const parseDate = (date: string): [Date, string] => {
    const d1 = new Date(date);
    if (isValidDate(d1)) {
      return [d1, null];
    }
    const d2 = new Date(parseInt(date));
    if (isValidDate(d2)) {
      return [d2, null];
    }
    return [null, "Invalid date format"];
  };

  useEffect(() => {
    if (!input) {
      setIsInputValid(true);
      return;
    }
    try {
      const [date, err] = parseDate(input);
      if (err) {
        setIsInputValid(false);
        return;
      }
      setOutput({
        isoString: date.toISOString(),
        prettyFormat: date.toLocaleString(),
        unixTime: date.getTime().toString(),
        isLeapYear: isLeap(date.getFullYear()).toString(),
      });
      setIsInputValid(true);
    } catch (e) {
      console.log("Invalid Date", e);
      setIsInputValid(false);
      return;
    }
  }, [input]);

  const labels = {
    isoString: "ISO String",
    prettyFormat: "Pretty Format",
    unixTime: "UNIX Time",
    isLeapYear: "Is Leap Year",
  };

  const useSampleBtnHandler = (e) => setInput(new Date().getTime().toString());

  return (
    <div id="tools-page-grid" className="bp3-dark p-8">
      <div id="options" />
      <div className="tool" id="tool">
        <div className="io-columns-header">
          <div className="io-column">
            <InputColumnHeader
              sampleInput={sampleInput}
              setInput={setInput}
              showButtons={false}
            >
              <div className="buttons-group">
                <Button
                  variant="contained"
                  onClick={useSampleBtnHandler}
                  component="label"
                >
                  Use Current Time
                </Button>
              </div>
            </InputColumnHeader>
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                borderColor: isInputValid ? "" : "red",
              }}
              spellCheck={false}
            />
            {!isInputValid && (
              <p style={{ color: "red" }}>Invalid Date Value</p>
            )}
          </div>
          <div className="io-column">
            {Object.keys(output).map((key, index) => (
              <div className="mb-4" key={key} style={{}}>
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
                  <h2 className="font-semibold tracking-normal">
                    {labels[key]}
                  </h2>
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
                <TextField value={output[key]} spellCheck={false} readOnly />
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
