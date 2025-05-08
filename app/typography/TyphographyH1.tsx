import React from "react";

export default function TyphographyH1({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <h1
      className={`scroll-m-20 text-3xl md:text-4xl text-primary font-extrabold tracking-tight lg:text-5xl ${className}`}
    >
      {children}
    </h1>
  );
}
