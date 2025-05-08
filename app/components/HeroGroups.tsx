"use client";

import useSWR from "swr";
import Container from "../layouts/Container";
import RankCard from "./RankCard";
import { Skeleton } from "@/components/ui/skeleton";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function HeroGroups() {
  const { data, error, isLoading } = useSWR("/api/groups", fetcher);
  const groups = data?.response?.items ?? [];

  if (isLoading)
    return (
      <div className="flex flex-col space-y-3 my-4">
        <Skeleton className="h-[150px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  if (error) return <p>Ошибка при загрузке данных 😢</p>;

  return (
    <Container>
      <div className="w-full gap-2 grid grid-cols-1">
        {groups?.map((item: object, index: number) => (
          <RankCard key={index} item={item} />
        ))}
      </div>
    </Container>
  );
}
