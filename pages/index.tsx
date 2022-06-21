import React from "react";
import Head from "next/head";
import Link from "next/link";

import ToolsLayout from "@/components/ToolsLayout";
import { tools } from "../utils/tools";

export default function Tool() {
  const tagline = (
    <>
      The Essential <br />
      Developer Toolkit
    </>
  );
  const subTagline = "Powerful tools for everyday developer needs";

  return (
    <>
      <Head>
        <title>App | DevKit</title>
      </Head>
      <div
        className="z-0 mx-auto py-8 px-8 text-white lg:px-24"
        style={{ position: "relative" }}
      >
        <div className="grid grid-cols-12">
          <div className="col-span-12 mb-16 xl:col-span-9">
            <h1 className="mb-6 max-w-4xl text-4xl font-bold leading-none tracking-tight sm:text-4xl lg:text-6xl">
              {tagline}
            </h1>
            <h2 className="mx-auto mb-6 w-full text-xl tracking-normal opacity-80 lg:w-full lg:text-2xl">
              {subTagline}
            </h2>
            <div className="mb-12 flex gap-4">
              <a
                href="https://www.producthunt.com/posts/devkit-4?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-devkit-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=326758&theme=light"
                  alt={`DevKit - The Ultimate Developer Toolkit | Product Hunt`}
                  style={{ width: "250px", height: "54px" }}
                  width="250"
                  height="54"
                />
              </a>
            </div>
            <div className="mx-auto grid grid-cols-12 gap-x-4 gap-y-12">
              {tools.map((tool) => (
                <Link href={`${tool.location}`} key={tool.location}>
                  <a className="col-span-12 lg:col-span-6">
                    <div className="flex cursor-pointer items-center gap-7">
                      <div className="app-home-tool-icon flex items-center justify-center text-left text-9xl">
                        {tool.icon}
                      </div>
                      <div
                        className="flex-1"
                        style={{ alignItems: "flex-start" }}
                      >
                        <h1 className="text-left text-xl font-semibold tracking-normal text-white">
                          {tool.label}
                        </h1>
                        <h1 className="text-left tracking-normal text-white text-gray-300 lg:w-8/12">
                          {tool.description}
                        </h1>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Tool.getLayout = function getLayout(page) {
  return <ToolsLayout>{page}</ToolsLayout>;
};
