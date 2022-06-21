import React from "react";
import NextNProgress from "nextjs-progressbar";
import { SessionProvider } from "next-auth/react";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// import { MoralisProvider } from "react-moralis";

import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout || ((page) => page);

  // const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
  // const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

  const lightTheme = createTheme({
    type: "light",
    theme: {
      colors: {},
    },
  });

  const darkTheme = createTheme({
    type: "dark",
    theme: {
      colors: {},
    },
  });

  return (
    <SessionProvider session={session}>
      <NextThemesProvider
        defaultTheme="dark"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider>
          {getLayout(
            <>
              <NextNProgress />
              {/*
 // @ts-ignore*/}
              {/* <MoralisProvider appId={appId} serverUrl={serverUrl}> */}
              <Component {...pageProps} />
              {/* </MoralisProvider> */}
            </>
          )}
        </NextUIProvider>
      </NextThemesProvider>
    </SessionProvider>
  );
}
