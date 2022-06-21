import React from "react";

import { Switch as NextUISwitch } from "@nextui-org/react";

export default function Switch(props) {
  return <NextUISwitch {...props}>{props.children}</NextUISwitch>;
}
