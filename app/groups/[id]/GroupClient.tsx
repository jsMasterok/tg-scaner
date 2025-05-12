"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

import Container from "@/app/layouts/Container";
import TyphographyH1 from "@/app/typography/TyphographyH1";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TyphographyP from "@/app/typography/TyphographyP";
import TypographyH2 from "@/app/typography/TypographyH2";

import { getStableReviews } from "@/app/utils/getStableReviews";

import { Loader, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { findGroupById } from "@/app/utils/isFake";
import { useState, useEffect } from "react";

export default function GroupClient({ id }: { id: any }) {
  const [isFake, setIsFake] = useState(false);
  const [fakeGroupInfo, setFakeGroupInfo] = useState<any>(null);
  const { data, error, isLoading } = useSWR(`/api/group/${id}`, fetcher);
  const stableReviews = getStableReviews(id);

  useEffect(() => {
    const found = findGroupById(Number(id));
    if (found) {
      setIsFake(true);
      setFakeGroupInfo(found);
    }
  }, [id]);

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
          Отчет о проверке <br />{" "}
          {isFake ? fakeGroupInfo.username : data?.response?.username}
        </TyphographyH1>
        <Avatar className="w-32 h-32 mx-auto">
          <AvatarImage
            src={isFake ? fakeGroupInfo.image640 : data?.response?.image640}
            alt={isFake ? fakeGroupInfo.image640 : data?.response?.image640}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <TyphographyP className="text-center text-primary">
          ID:
          {isFake ? fakeGroupInfo.tg_id : data?.response?.tg_id}
        </TyphographyP>
        <TyphographyP className="text-center text-primary">
          Подписчики:{" "}
          {isFake
            ? fakeGroupInfo.participants_count
            : data?.response?.participants_count}
        </TyphographyP>
        <TyphographyP className="text-center">
          {isFake ? fakeGroupInfo.title : data?.response?.title}
        </TyphographyP>
        <TyphographyP className="text-primary-foreground rounded-md w-fit text-base bg-primary px-4 mx-auto py-1">
          Категория:{" "}
          {isFake ? fakeGroupInfo.category : data?.response?.category}
        </TyphographyP>
        <TyphographyP className="text-primary text-center !text-lg">
          Страна: {isFake ? fakeGroupInfo.country : data?.response?.country}
        </TyphographyP>
        <TyphographyP className="text-center text-primary !text-sm whitespace-pre-line">
          {isFake ? fakeGroupInfo.about : data?.response?.about}
        </TyphographyP>
        <TypographyH2 className="text-center text-primary">
          Подробная информация
        </TypographyH2>
        {!isFake && (
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
        )}
        <TyphographyP className="text-primary">Тип: Группа</TyphographyP>
        <TyphographyP className="text-primary">
          Язык: {isFake ? fakeGroupInfo.language : data?.response?.language}
        </TyphographyP>
        <TypographyH2 className="text-center text-primary">
          Ограничения и блокировки
        </TypographyH2>
        {!isFake && data?.response?.tgstat_restrictions.length == 0 ? (
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
          Отзывы ({isFake ? fakeGroupInfo.reviews.length : stableReviews.length}
          )
        </TypographyH2>
        {stableReviews.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2">
            <TyphographyP className="text-primary">
              Упс,отзывов пока нет
            </TyphographyP>
            <PackageOpen size="42" />
          </div>
        )}
        <div className="w-full grid grid-cols-1 gap-4">
          {!isFake
            ? stableReviews?.map((rev, index) => (
                <div
                  key={index}
                  className="w-full p-2 rounded-md flex flex-col gap-y-2 border-2 border-primary"
                >
                  <div className="inline-flex items-center gap-x-2">
                    <Avatar className="w-18 h-18">
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {rev.user.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <TyphographyP className="text-primary">
                      {rev.user}
                    </TyphographyP>
                    <TyphographyP className="text-primary ml-auto">
                      {rev.date}
                    </TyphographyP>
                  </div>
                  <TyphographyP className="text-primary p-2">
                    {rev.review}
                  </TyphographyP>
                </div>
              ))
            : fakeGroupInfo.reviews?.map((rev: any, index: any) => (
                <div
                  key={index}
                  className="w-full p-2 rounded-md flex flex-col gap-y-2 border-2 border-primary"
                >
                  <div className="inline-flex items-center gap-x-2">
                    <Avatar className="w-18 h-18">
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {rev.user.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <TyphographyP className="text-primary">
                      {rev.user}
                    </TyphographyP>
                    <TyphographyP className="text-primary ml-auto">
                      {rev.date}
                    </TyphographyP>
                  </div>
                  <TyphographyP className="text-primary p-2">
                    {rev.review}
                  </TyphographyP>
                </div>
              ))}
        </div>
        <TyphographyP className="text-primary text-center !text-xs">
          Отзывы могут оставлять только зарегистрированные пользователи
        </TyphographyP>
      </section>
    </Container>
  );
}
