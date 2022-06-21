export default (
    `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Tailwind CSS Skeleton</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="author" content="" />
    
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.10.2/css/all.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"
        />
        <link
          href="https://unpkg.com/@tailwindcss/custom-forms/dist/custom-forms.min.css"
          rel="stylesheet"
        />
        <style>
          @import url("https://rsms.me/inter/inter.css");
          html {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
              Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
              "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
              "Noto Color Emoji";
          }
    
          .browser-mockup {
            border-top: 2em solid rgba(230, 230, 230, 0.7);
            position: relative;
            height: 60vh;
          }
    
          .browser-mockup:before {
            display: block;
            position: absolute;
            content: "";
            top: -1.25em;
            left: 1em;
            width: 0.5em;
            height: 0.5em;
            border-radius: 50%;
            background-color: #f44;
            box-shadow: 0 0 0 2px #f44, 1.5em 0 0 2px #9b3, 3em 0 0 2px #fb5;
          }
    
          .browser-mockup > * {
            display: block;
          }
    
          /* Custom code for the demo */
        </style>
      </head>
    
      <body
        class="gradient leading-relaxed tracking-wide flex flex-col dark text-white bg-black"
      >
        <nav id="header" class="w-full z-30 top-0 text-white py-1 lg:py-6">
          <div
            class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-2 lg:py-6"
          >
            <div class="pl-4 pt-2 flex items-center">
              <a
                class="text-white no-underline hover:no-underline font-bold text-1xl lg:text-4xl"
                href="#"
              >
                <img
                  src="http://localhost:3000/logo.png"
                  class="w-8 -mt-1 inline"
                />
                DevKit
              </a>
            </div>
            <div class="block lg:hidden pr-4">
              <button
                id="nav-toggle"
                class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-800 hover:border-green-500 appearance-none focus:outline-none"
              >
                <svg
                  class="fill-current h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>
    
            <div
              class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 text-white p-4 lg:p-0 z-20"
              id="nav-content"
            >
              <ul class="list-reset lg:flex justify-end flex-1 items-center">
                <li class="mr-3">
                  <a
                    class="inline-block py-2 px-4 text-white font-bold no-underline"
                    href="#"
                    >Active</a
                  >
                </li>
                <li class="mr-3">
                  <a
                    class="inline-block text-white no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                    href="#"
                    >link</a
                  >
                </li>
                <li class="mr-3">
                  <a
                    class="inline-block text-white no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                    href="#"
                    >link</a
                  >
                </li>
              </ul>
              <button
                id="navAction"
                class="mx-auto lg:mx-0 hover:underline text-gray-800 font-extrabold rounded mt-4 lg:mt-0 py-4 px-8 shadow opacity-75"
              >
                Action
              </button>
            </div>
          </div>
        </nav>
    
        <div class="container mx-auto h-screen">
          <div class="text-center px-3 lg:px-0">
            <h1
              class="my-4 text-2xl md:text-3xl lg:text-5xl font-black leading-tight"
            >
              The Essential Developer Toolkit
            </h1>
            <p
              class="leading-normal text-gray-50 text-base md:text-xl lg:text-2xl mb-8"
            >
              Powerful tools for everyday developer needs
            </p>
    
            <button
              class="bg-white text-black mx-auto lg:mx-0 hover:underline font-extrabold rounded my-2 md:my-6 py-4 px-8 shadow-lg shadow-white w-48"
            >
              Get Started
            </button>
            <a
              href="#"
              class="inline-block mx-auto lg:mx-0 hover:underline bg-transparent text-gray-600 font-extrabold my-2 md:my-6 py-2 lg:py-4 px-8"
              >Learn more</a
            >
          </div>
    
          <div class="flex items-center w-full mx-auto content-end">
            <div
              class="browser-mockup flex flex-1 m-6 md:px-0 md:m-12 bg-white w-1/2 rounded shadow-xl"
            ></div>
          </div>
        </div>
    
        <script>
          var navMenuDiv = document.getElementById("nav-content");
          var navMenu = document.getElementById("nav-toggle");
    
          document.onclick = check;
          function check(e) {
            var target = (e && e.target) || (event && event.srcElement);
    
            if (!checkParent(target, navMenuDiv)) {
              if (checkParent(target, navMenu)) {
                if (navMenuDiv.classList.contains("hidden")) {
                  navMenuDiv.classList.remove("hidden");
                } else {
                  navMenuDiv.classList.add("hidden");
                }
              } else {
                navMenuDiv.classList.add("hidden");
              }
            }
          }
          function checkParent(t, elm) {
            while (t.parentNode) {
              if (t == elm) {
                return true;
              }
              t = t.parentNode;
            }
            return false;
          }
        </script>
      </body>
    </html>
    `)