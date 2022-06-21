import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Layout from "../components/Layout";

export default function Status() {
  return (
    <div className="p-8 pt-0">
      <section className="body-font overflow-hidden text-white">
        <div className="container mx-auto px-5 py-8 pt-0">
          <div className="flex content-center">
            <img
              src="/31.png"
              alt="Illustration"
              style={{ maxWidth: "600px" }}
              className="mx-auto"
            />
          </div>
          <div className="text-center">
            <h1 className="tracking-normal">
              Looks like you have landed here by mistake.{" "}
              <Link href="/">
                <a>
                  <span className="text-blue-400">Go </span> back to the
                  homepage.
                </a>
              </Link>
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}

Status.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
