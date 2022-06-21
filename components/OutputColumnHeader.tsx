import React from "react";

import Button from "./Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  //@ts-ignore
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function OutputColumnHeader({
  output = "",
  extension = "",
  children,
}: {
  output?: any;
  extension?: string;
  children?: any;
}) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const downloadFile = (content, extension) => {
    const element = document.createElement("a");
    const file = new Blob([content], {
      type: "text/plain",
    });
    const time = new Date().getTime();
    element.href = URL.createObjectURL(file);
    element.download = `${time}.${extension}`;
    document.body.appendChild(element);
    element.click();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setOpen(true);
  };

  return (
    <div className="flex-20-gap-align-center mb-4" style={{ height: "32px" }}>
      <p className="font-semibold text-white text-base tracking-normal">
        Output
      </p>
      <div className="buttons-group">
        {!!extension && (
          <>
            <Button
              variant="contained"
              onClick={() => copyToClipboard(output)}
              component="label"
            >
              Copy
            </Button>
            <Button
              variant="contained"
              onClick={() => downloadFile(output, extension)}
              component="label"
            >
              Download
            </Button>
          </>
        )}
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        {/*
 // @ts-ignore*/}
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Copied!
        </Alert>
      </Snackbar>
      {children}
    </div>
  );
}
