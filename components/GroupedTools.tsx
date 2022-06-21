import React from "react";
import Link from "next/link";

export default function GroupedTools({ groupedTools, toolLocation }) {
  return (
    <div
      style={{ overflowY: "scroll", height: "calc(100%)" }}
      className="hide-scrollbar m-2 mt-1"
    >
      {groupedTools.map((group, index) => (
        <div className="mb-4 border-b border-white/10 pb-2" key={index}>
          <h1 className="text-md my-2 px-3 py-0 font-semibold tracking-wide text-gray-100 text-white">
            {group.name}
          </h1>
          {group.tools.map((details, index) => (
            <div
              className="sidenav-item mx-auto my-1 px-2 py-0"
              data-selected={"/" + toolLocation === details.location}
              key={index}
            >
              <Link href={details.location}>
                <a className="flex items-center">
                  <div
                    className=""
                    style={{
                      fontSize: "13px",
                      display: "inline-block",
                      color: "white",
                      padding: "1px",
                      margin: "4px 0px",
                      width: "24px",
                      textAlign: "center",
                      borderRadius: "6px",
                    }}
                  >
                    {details.icon !== undefined && details.icon}
                  </div>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "rgb(215, 216, 219)",
                    }}
                  >
                    &nbsp; {details.label}
                  </span>
                </a>
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
