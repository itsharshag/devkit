import React from "react";

import { Textarea } from "@nextui-org/react";

export default function TextArea(props) {
  return (
    <Textarea
      // rows={4}
      placeholder="Lorem ipsum dolor sit amet"
      dir="auto"
      height="100%"
      {...props}
    />
  );
}
