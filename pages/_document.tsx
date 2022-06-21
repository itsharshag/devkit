import Document, { Html, Head, Main, NextScript } from "next/document";
//@ts-ignore
import { CssBaseline } from "@nextui-org/react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html className="">
        <Head>
          {/* <link
            href={
              "https://fonts.googleapis.com/css2?family=Manrope:wght@100;200;300;400;500;600;700;800;900&display=swap"
            }
            rel="stylesheet"
          /> */}
          {/* <link
            href={
              "https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;800;900&display=swap"
            }
            rel="stylesheet"
          /> */}

          <meta name="application-name" content="DevKit" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="PWA App" />
          <meta name="description" content="The Essential Developer Toolki" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />

          <link rel="apple-touch-icon" href="/logo.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/logo.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
          <link rel="apple-touch-icon" sizes="167x167" href="/logo.png" />

          <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="mask-icon"
            href="/icons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <link rel="shortcut icon" href="/logo.png" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://getdevkit.com" />
          <meta name="twitter:title" content="DevKit" />
          <meta
            name="twitter:description"
            content="The Essential Developer Toolkit"
          />
          <meta name="twitter:image" content="https://getdevkit.com/logo.png" />
          <meta name="twitter:creator" content="@getdevkit" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="DevKit" />
          <meta
            property="og:description"
            content="The Essential Developer Toolkit"
          />
          <meta property="og:site_name" content="DevKit" />
          <meta property="og:url" content="https://getdevkit.com" />
          <meta property="og:image" content="https://getdevkit.com/logo.png" />

          <meta name="theme-color" content="#fff" />
          <script
            src="https://kit.fontawesome.com/9d8d666c9a.js"
            async={true}
            crossOrigin="anonymous"
          ></script>
          {process?.env?.NEXT_PUBLIC_IS_PRODUCTION == "true" && (
            <>
              <script
                src="https://accounts.google.com/gsi/client"
                async
                defer
              ></script>
              <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-X2CCJNFX9Y"
              ></script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X2CCJNFX9Y');
            `,
                }}
              />

              <script
                dangerouslySetInnerHTML={{
                  __html: `
              function resizeIframe(iframe) {
                iframe.height = iframe.contentWindow.document.body.scrollHeight + "px";
              }
            `,
                }}
              ></script>
              {/* <script
                dangerouslySetInnerHTML={{
                  __html: `
                  Paddle.Setup({ vendor: 140981 });
            `,
                }}
              ></script> */}
            </>
          )}
          {/* <script async src="https://cdn.tailwindcss.com/"></script> */}

          <script
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
          ></script>

          <link href="https://emoji-css.afeld.me/emoji.css" rel="stylesheet" />

          <title>DevKit | The Essential Developer Toolkit</title>

          {CssBaseline.flush()}

          <link
            href={
              "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            }
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
        </Head>
        <body className="dark">
          <Main />
          <NextScript />
          {/* <script src="https://cdn.paddle.com/paddle/paddle.js"></script> */}
          {/* <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
          Paddle.Setup({ vendor: 140981 });`,
            }}
          ></script> */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
