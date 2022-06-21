import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

import { marked } from "marked";

import ToolsLayout from "components/ToolsLayout";
import InputColumnHeader from "components/InputColumnHeader";
import OutputColumnHeader from "components/OutputColumnHeader";

import sampleInput from "../samples/markdown-editor";

const CodeEditor = dynamic(() => import("../components/CodeEditor"), {
  ssr: false,
});

export default function Tool() {
  const [input, setInput] = useState("");

  const ref = useRef(null);

  const srcDoc = `<html>
  <head>
      <link rel="stylesheet" href="/github.css">
      <script>
      window.addEventListener('message', (event) => {
        const { type, value } = event.data;

        if (type === 'html') {
          document.body.innerHTML = value;
        }
      })
      </script>
  </head>
  <body class="markdown-body">
  </body>
</html>
`;

  useEffect(() => {
    function updateScrollPosition() {
      const iframe: any = window.document.getElementById("markdown-preview");
      if (iframe && iframe?.contentWindow) {
        iframe.contentWindow.scrollTo(
          0,
          parseInt(localStorage.getItem("iframePageYOffset") || "0")
        );
        iframe.contentDocument.addEventListener(
          "scroll",
          function (event) {
            // iframe.contentWindow.pageYOffset = 200;
            console.log(iframe.contentWindow.pageYOffset);
            localStorage.setItem(
              "iframePageYOffset",
              iframe.contentWindow.pageYOffset
            );
          },
          false
        );
      }
    }
    if (ref && ref.current) {
      ref.current.addEventListener("load", updateScrollPosition, false);
      return function cleanup() {
        try {
          ref.current.removeEventListener("load", ref, false);
        } catch (e) {}
      };
    }
  }, [ref]);

  useEffect(() => {
    if (ref && ref.current) {
      const iframe: any = window.document.getElementById("markdown-preview");
      if (iframe && iframe?.contentWindow) {
        try {
          const html = { type: "html", value: marked(input) };
          iframe.contentWindow.postMessage(html, "*");
        } catch (e) {}
      }
    }
  }, [ref, input]);

  return (
    <div id="tools-page-grid" className="p-8">
      <Head>
        {/* <script
          src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
          integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          async={false}
        ></script>
        <script
          async={false}
          src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js"
          integrity="sha512-aUhL2xOCrpLEuGD5f6tgHbLYEXRpYZ8G5yD+WlFrXrPy2IrWBlu6bih5C9H6qGsgqnU6mgx6KtU8TreHpASprw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        ></script> */}
        {/* <script
          async={false}
          dangerouslySetInnerHTML={{
            __html: `
            console.log("Hello from here")
                  $(document).load(function () {
                    console.log("Loaded", $('#markdown-preview'))
                    $('#markdown-preview').contents().scrollTop($.cookie("height"));
                });
                function report() {
                    var frame_top = $('#markdown-preview').contents().scrollTop();
                    $.cookie("height", frame_top, { expires: 3 });
                }
            `,
          }}
        /> */}
      </Head>
      <div id="options" />
      <div className="tool" id="tool" style={{ minHeight: "80vh" }}>
        <div className="io-columns-header">
          <div className="io-column">
            <InputColumnHeader sampleInput={sampleInput} setInput={setInput} />
            <CodeEditor
              defaultLanguage="markdown"
              value={input}
              onChange={(e) => setInput(e)}
              name="body"
            />
          </div>
          <div className="io-column">
            <OutputColumnHeader extension={""} />
            <iframe
              ref={ref}
              srcDoc={srcDoc}
              className="editor-iframe"
              id="markdown-preview"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

Tool.getLayout = function getLayout(page) {
  return <ToolsLayout>{page}</ToolsLayout>;
};
