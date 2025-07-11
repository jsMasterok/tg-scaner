import React from "react";
import Container from "../layouts/Container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TyphographyP from "../typography/TyphographyP";
import { User } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full fixed top-0 left-0 right-0 z-20">
      <div className="w-full p-2 bg-primary">
        <Container>
          <nav className="w-full flex items-center justify-between gap-x-2">
            <Link
              href={"/"}
              className="p-2 text-primary w-fit gap-1 items-center rounded-md bg-primary-foreground inline-flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
              </svg>
              <span className="uppercase text-nowrap text-xs text-primary font-semibold">
                tg-scaner.ru
              </span>
            </Link>
            <div className="w-fit inline-flex items-center justify-between gap-x-4">
              <Link
                href={"/"}
                className="text-primary-foreground text-base font-semibold"
              >
                <TyphographyP className="text-center">Статьи</TyphographyP>
              </Link>
              <Button asChild variant={"outline"}>
                <Link href={"/auth"}>
                  <User size={48} />
                </Link>
              </Button>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
