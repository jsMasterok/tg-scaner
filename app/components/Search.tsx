"use client";
import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

import { TypographyH3 } from "../typography/TypographyH3";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "../layouts/Container";
import { Loader } from "lucide-react";

import { useState } from "react";
import RankCard from "./RankCard";

import { telegramLinkRegex } from "../utils/constants";
import { findGroupByLink } from "../utils/getFakeData";
import TyphographyP from "../typography/TyphographyP";

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
    setQuery("");
  };

  return (
    <div className="w-full flex flex-col gap-y-2 bg-primary py-8">
      <Container>
        <div className="w-full flex flex-col gap-y-4">
          <TypographyH3 className="text-primary-foreground text-center">
            Найти группу
          </TypographyH3>
          <span className="text-xs font-semibold text-primary-foreground text-center">
            Вставтье ссылку на канал/группу или cсылку приглашение
          </span>
          <div className="flex w-full max-w-md mx-auto items-center space-x-2">
            <Input
              type="text"
              className="bg-primary-foreground"
              value={query}
              placeholder="t.me/username, t.me/joinchat/AAAAA"
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              type="submit"
              className=""
              disabled={query === "" || !telegramLinkRegex.test(query)}
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
          {data?.status == "error" && findGroupByLink(search) ? (
            <RankCard type="light" item={findGroupByLink(search)} />
          ) : data?.status == "ok" && findGroupByLink(search) ? (
            <RankCard type="light" item={findGroupByLink(search)} />
          ) : (
            data && <RankCard type="light" item={data?.response} />
          )}
          {error && (
            <TyphographyP className="text-center text-primary-foreground">
              Данных не найдено - попробуйте снова
            </TyphographyP>
          )}
        </div>
      </Container>
    </div>
  );
}
