import React from "react";

export default function Layout({ children }) {
  return (
    <div className="bg-black text-gray-300">
      {children}
    </div>
  );
}
