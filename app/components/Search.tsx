"use client";
import useSWR from "swr";
import { useState } from "react";
import { TypographyH3 } from "../typography/TypographyH3";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "../layouts/Container";
import { Loader } from "lucide-react";
import TyphographyP from "../typography/TyphographyP";
import RankCard from "./RankCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Search() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  const { data, error, isLoading } = useSWR(
    search ? `/api/search?query=${encodeURIComponent(search)}` : null,
    fetcher
  );

  const handleSearch = () => {
    if (query.trim()) {
      setSearch(query.trim());
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-2 bg-primary py-8">
      <Container>
        <div className="w-full flex flex-col gap-y-4">
          <TypographyH3 className="text-primary-foreground text-center">
            Найти группу
          </TypographyH3>
          <span className="text-xs font-semibold text-primary-foreground text-center">
            Введите ключевое слово или название Telegram-канала
          </span>
          <div className="flex w-full max-w-md mx-auto items-center space-x-2">
            <Input
              type="text"
              className="bg-primary-foreground"
              value={query}
              placeholder="Поиск..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              type="submit"
              disabled={false}
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
              <Loader className="animate-spin ml-2" />
            </Button>
          )}

          {error && (
            <TyphographyP className="text-center text-primary-foreground">
              Произошла ошибка при поиске. Попробуйте снова.
            </TyphographyP>
          )}
          {data?.data?.map((item: any) => (
            <RankCard key={item.tg_id} type="light" item={item} />
          ))}
        </div>
      </Container>
    </div>
  );
}
