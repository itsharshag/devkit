import React from "react";

import { Button as Btn, Loading } from "@nextui-org/react";

export default function Button(props) {
  const { large = false, loading = false } = props;

  return (
    <Btn type="primary" auto size={"xs"} {...props}>
      {!loading && props.children}
      {loading && (
        <Loading color="white" size="sm" style={{ height: "100%" }} />
      )}
    </Btn>
  );
}
