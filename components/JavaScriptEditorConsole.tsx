import React, { useEffect } from "react";
import { Console, Hook, Unhook } from "console-feed";

export default function JavaScriptEditorConsole({ logs, setLogs }) {
  //@ts-ignore
  useEffect(() => {
    Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false
    );
    //@ts-ignore
    return () => Unhook(window.console);
  }, []);

  return <Console logs={logs} variant="light" />;
}
