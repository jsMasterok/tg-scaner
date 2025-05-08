import React from "react";

export default function TyphographyP({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <p className={`leading-7 font-semibold text-base ${className}`}>
      {children}
    </p>
  );
}
