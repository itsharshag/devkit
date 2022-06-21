import React from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor(props) {
  return (
    <Editor
      highlightActiveLine
      showGutter
      theme={"vs-dark"}
      showPrintMargin
      editorProps={{ $blockScrolling: true }}
      wrapEnabled={true}
      options={{
        fontSize: 16,
        minimap: {
          enabled: false,
        },
      }}
      style={{
        width: "100%",
        flex: 1,
        ...(props?.extraStyles || {}),
      }}
      {...props}
    />
  );
}
