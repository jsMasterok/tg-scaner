import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="w-full max-w-4xl mx-auto p-2">{children}</div>;
}
