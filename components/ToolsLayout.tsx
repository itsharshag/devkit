import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { KBarProvider } from "kbar";
import { ToastContainer } from "react-toastify";
import { createTheme } from "@mui/material/styles";

import CommandBar from "@/components/CommandBar";
import GroupedTools from "./GroupedTools";
import DrawerBasedLayout from "./DrawerBasedLayout";
import {
  groupedTools,
  tools,
  toolsMap,
} from "../utils/tools";

import "react-toastify/dist/ReactToastify.css";

export default function ToolsLayout(props) {
  const { children, enableHead = true } = props;

  const router = useRouter();
  const path = router.pathname.replace("/app", "");
  const toolLocation = path.split("/").find((item) => !!item) || "";
  const tool = toolsMap["/" + toolLocation];

  const [mode, setMode] = React.useState<"light" | "dark">("dark");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const initialActions = tools.map(({ location, label = "", icon }) => ({
    id: location,
    name: label,
    icon,
    perform: () => router.push(location),
  }));

  return (
    <>
      <KBarProvider
        options={{
          enableHistory: true,
        }}
        actions={initialActions}
      >
        <CommandBar />
        {enableHead && (
          <Head>
            {router.pathname !== "/app" && (
              <title>{tool?.label || ""} | DevKit</title>
            )}
          </Head>
        )}
        <DrawerBasedLayout
          theme={theme}
          DrawerBody={
            <div
              className="hide-scrollbar"
              style={{
                height: "75vh",
                flex: 1,
                background: "rgb(32, 32, 32)",
              }}
            >
              <div className="">
                <GroupedTools
                  groupedTools={groupedTools}
                  toolLocation={toolLocation}
                />
              </div>
            </div>
          }
          DrawerFooter={<></>}
          MainSection={
            <>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                theme="dark"
              />
              <div className="z-0 text-black" style={{ overflowX: "hidden" }}>
              {children}
              </div>
            </>
          }
          tool={tool}
        />
      </KBarProvider>
    </>
  );
}
