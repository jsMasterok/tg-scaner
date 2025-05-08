"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

import Container from "@/app/layouts/Container";
import TyphographyH1 from "@/app/typography/TyphographyH1";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TyphographyP from "@/app/typography/TyphographyP";
import TypographyH2 from "@/app/typography/TypographyH2";

import { Loader, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function GroupClient({ id }: { id: string }) {
  const { data, error, isLoading } = useSWR(`/api/group/${id}`, fetcher);

  const revCount = 0;

  if (isLoading)
    return (
      <div className="fixed z-50 p-4 inset-0 bg-primary text-primary-foreground flex flex-col items-center justify-center gap-4">
        <Loader size={64} className=" animate-spin " />
        <TyphographyP className="text-primary-foreground">
          Получение данных
        </TyphographyP>
        <TyphographyP className="bg-primary-foreground inline-flex items-center gap-x-2 text-primary absolute bottom-4 left-1/2 -translate-x-1/2 px-8 py-2 rounded-md uppercase">
          tg-scaner.ru{" "}
        </TyphographyP>
      </div>
    );
  if (error) return <p>Ошибка загрузки 😢</p>;

  console.log(data);

  return (
    <Container>
      <Breadcrumb className="my-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/groups/${id}`}>Отчет</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="w-full flex flex-col gap-y-4">
        {data?.status === "error" && data?.error === "outdated_statistics" && (
          <Button
            variant={"destructive"}
            className="text-base font-semibold w-fit mx-auto"
          >
            Данные временно недоступны
          </Button>
        )}
        <TyphographyH1 className="text-center leading-10">
          Отчет о проверке <br /> {data?.response?.username}
        </TyphographyH1>
        <Avatar className="w-32 h-32 mx-auto">
          <AvatarImage
            src={data?.response?.image640}
            alt={data?.response?.username}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <TyphographyP className="text-center text-primary">
          ID: {data?.response?.tg_id}
        </TyphographyP>
        <TyphographyP className="text-center text-primary">
          Подписчики: {data?.response?.participants_count}
        </TyphographyP>
        <TyphographyP className="text-center">
          {data?.response?.title}
        </TyphographyP>
        <TyphographyP className="text-primary-foreground rounded-md w-fit text-base bg-primary px-4 mx-auto py-1">
          Категория: {data?.response?.category}
        </TyphographyP>
        <TyphographyP className="text-primary text-center !text-lg">
          Страна: {data?.response?.country}
        </TyphographyP>
        <TyphographyP className="text-center text-primary !text-sm whitespace-pre-line">
          {data?.response?.about}
        </TyphographyP>
        <TypographyH2 className="text-center text-primary">
          Подробная информация
        </TypographyH2>
        <TyphographyP className="text-primary">
          Верификация РКН:{" "}
          <b
            className={`${
              data?.response?.rkn_verification.status === "active"
                ? "text-green-500"
                : "text-orange-500"
            }`}
          >
            {data?.response?.rkn_verification.status === "active"
              ? "Верифицирован"
              : "На проверке"}
          </b>
        </TyphographyP>
        <TyphographyP className="text-primary">Тип: Группа</TyphographyP>
        <TyphographyP className="text-primary">
          Язык: {data?.response?.language}
        </TyphographyP>
        <TypographyH2 className="text-center text-primary">
          Ограничения и блокировки
        </TypographyH2>
        {data?.response?.tgstat_restrictions.length == 0 ? (
          <>
            <TyphographyP className="text-primary">
              Метка за накрутку: <b className="text-green-500">Отсутсвует</b>
            </TyphographyP>
            <TyphographyP className="text-primary">
              Метка за мошшеничество:{" "}
              <b className="text-green-500">Отсутсвует</b>
            </TyphographyP>
          </>
        ) : (
          <>
            <TyphographyP className="text-primary">
              Метка за накрутку:{" "}
              <b>
                {data?.response?.tgstat_restrictions.red_label
                  ? "зафиксировано"
                  : "Отсутсвует"}
              </b>
            </TyphographyP>
            <TyphographyP className="text-primary">
              Метка за мошшеничество:{" "}
              <b>
                {data?.response?.tgstat_restrictions.red_label
                  ? "зафиксировано"
                  : "Отсутсвует"}
              </b>
            </TyphographyP>
          </>
        )}
        <TypographyH2 className="text-center text-primary">
          Отзывы ({revCount})
        </TypographyH2>
        {revCount === 0 && (
          <div className="flex flex-col items-center justify-center gap-2">
            <TyphographyP className="text-primary">
              Упс,отзывов пока нет
            </TyphographyP>
            <PackageOpen size="42" />
          </div>
        )}
        <TyphographyP className="text-primary text-center !text-xs">
          Отзывы могут оставлять только зарегистрированные пользователи
        </TyphographyP>
      </section>
    </Container>
  );
}
