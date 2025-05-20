"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

export function LightboxItems({ src, alt, title }: { src: string; alt?: string, title: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Image src={src} quality={50} alt={alt || ""} title={title} width={80} height={80} className="rounded-md cursor-zoom-in" />
      </DialogTrigger>
      <DialogContent className="aspect-square bg-transparent border-none shadow-none ">
        <Image
          src={src}
          alt={alt || ""}
          fill={true}
          title={title}
          objectFit="cover"
          className="rounded-md"
          quality={100}
        />
      </DialogContent>
    </Dialog>
  );
}
