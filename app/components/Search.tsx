"use client";
import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

import { TypographyH3 } from "../typography/TypographyH3";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "../layouts/Container";
import TyphographyP from "@/app/typography/TyphographyP";
import { PackageOpen, Loader } from "lucide-react";

import { useState } from "react";
import TypographyH2 from "../typography/TypographyH2";
import RankCard from "./RankCard";

export default function Search() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  const { data, error, isLoading } = useSWR(
    search ? `/api/search?q=${encodeURIComponent(search)}` : null,
    fetcher
  );

  const handleSearch = () => {
    if (query.trim()) {
      setSearch(query.trim());
    }
    // setQuery("");
  };

  return (
    <div className="w-full flex flex-col gap-y-2 bg-primary py-8">
      <Container>
        <div className="w-full flex flex-col gap-y-4">
          <TypographyH3 className="text-primary-foreground text-center">
            Найти группу
          </TypographyH3>
          <span className="text-xs font-semibold text-primary-foreground text-center">
            Идентификатор канала/чата (@username, t.me/username,
            t.me/joinchat/AAAAABbbbbcccc...
          </span>
          <div className="flex w-full max-w-md mx-auto items-center space-x-2">
            <Input
              type="text"
              className="bg-primary-foreground"
              value={query}
              placeholder="@username, t.me/username, t.me/joinchat/AAAAA"
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              type="submit"
              className=""
              disabled={query === ""}
              variant={"outline"}
              onClick={handleSearch}
            >
              Найти
            </Button>
          </div>
          {isLoading && (
            <Button
              variant="outline"
              className="text-base w-fit mx-auto font-semibold"
            >
              Выполняем поиск
              <Loader className="animate-spin" />
            </Button>
          )}
          {/*  */}
          {error ||
            (!data ? (
              <div className="flex flex-col items-center justify-center text-primary-foreground gap-2">
                <TyphographyP className="text-primary-foreground">
                  Здесь будут результаты
                </TyphographyP>
                <PackageOpen size="42" />
              </div>
            ) : (
              <div className="w-full flex flex-col gap-y-2">
                <TypographyH2 className="text-center text-primary-foreground">
                  Результаты поиска
                </TypographyH2>
                <div className="w-full grid grid-cols-1 mt-4 gap-4 h-fit">
                  <RankCard type="light" item={data.response} />
                </div>
              </div>
            ))}
          {/*  */}
        </div>
      </Container>
    </div>
  );
}
