import React from "react";

import { Input as Inp } from "@nextui-org/react";

// import { MenuItem, Select, TextField } from "@mui/material";

export default function Input(props) {
  return (
    <Inp
      {...props}
      width={props?.fullWidth == false ? "max-content" : "100%"}
    />
  );
}
