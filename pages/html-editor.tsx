import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import ToolsLayout from "components/ToolsLayout";
import InputColumnHeader from "components/InputColumnHeader";
import OutputColumnHeader from "components/OutputColumnHeader";

import sampleInput from "../samples/html-editor";
import "antd/dist/antd.css";

const CodeEditor = dynamic(() => import("../components/CodeEditor"), {
  ssr: false,
});

export default function Tool() {
  const [input, setInput] = useState("");
  const [currentIframe, setCurrentIframe] = useState(1);

  const [iframe1SrcDoc, setIframe1SrcDoc] = useState("");
  const [iframe2SrcDoc, setIframe2SrcDoc] = useState("");
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  useEffect(() => {
    const oldIframe = currentIframe;

    function updateCurrentTo1() {
      // console.log("added event listener to iframe2");
      console.log("event from iframe 1");
      setCurrentIframe(1);
    }
    function updateCurrentTo2() {
      // console.log("added event listener to iframe1");
      console.log("event from iframe 2");
      setCurrentIframe(2);
    }

    if (ref1 && ref1.current) {
      const iframe1: any = window.document.getElementById("markdown-preview-1");
      if (iframe1 && iframe1?.contentWindow) {
        if (oldIframe === 1) {
          setIframe2SrcDoc(input);
          ref2.current.addEventListener("load", updateCurrentTo2, {
            once: true,
          });
        }
      }
    }
    if (ref2 && ref2.current) {
      const iframe2: any = window.document.getElementById("markdown-preview-2");
      if (iframe2 && iframe2?.contentWindow) {
        if (oldIframe === 2) {
          setIframe1SrcDoc(input);
          ref1.current.addEventListener("load", updateCurrentTo1, {
            once: true,
          });
        }
      }
    }
  }, [ref1, ref2, currentIframe, input]);

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
              className="flex-1"
            />
          </div>
          <div className="io-column">
            <OutputColumnHeader output={""} extension={""} />
            <div style={{ position: "relative", height: "100%" }}>
              {input && (
                <>
                  <iframe
                    ref={ref1}
                    srcDoc={iframe1SrcDoc}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: "100%",
                      visibility: currentIframe === 1 ? "visible" : "hidden",
                    }}
                    className={`editor-iframe flex-1`}
                    id="markdown-preview-1"
                  />
                  <iframe
                    ref={ref2}
                    srcDoc={iframe2SrcDoc}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: "100%",

                      visibility: currentIframe === 2 ? "visible" : "hidden",
                    }}
                    className={`editor-iframe flex-1`}
                    id="markdown-preview-2"
                  />
                </>
              )}
              {!input && <div className={`editor-iframe flex-1 bg-gray-300`} />}
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
