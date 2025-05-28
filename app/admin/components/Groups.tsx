"use client";

import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocalStorage } from "usehooks-ts";
import useSWR from "swr";

import { PlusCircle } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import TypographyH2 from "@/app/typography/TypographyH2";
import { useState } from "react";

import GroupList from "./GroupList";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Groups() {
  const [token, setToken, removeToken] = useLocalStorage("token", 0);
  const [photo, setPhoto] = useState<File | null>(null);
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URI}/groups`,
    fetcher
  );

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm<any>({
    mode: "onChange",
    defaultValues: {
      tg_id: "",
      link: "",
      peer_type: "Канал",
      username: "",
      active_usernames: [],
      title: "",
      about: "",
      category: "Получение ВУ / Прочие Услуги",
      country: "Россия",
      language: "Русский",
      image100: "",
      image640: "",
      participants_count: 0,
      rkn_verification: [],
      tgstat_restriction: [],
      viewsCount: 0,
      reviews: [],
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("image", photo);

      // 1. Загрузка изображения
      const uploadRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/uploads`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = uploadRes.data.urls[0];
      setValue("image100", imageUrl);
      setValue("image640", imageUrl);

      // 2. Сбор данных формы
      const payload = {
        ...getValues(),
        image100: imageUrl,
        image640: imageUrl,
      };

      // 3. Отправка формы
      const groupRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/groups`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Группа добавлена:", groupRes.data);
      toast.success("Группа успешно опубликована");
      mutate();
      reset(); // сброс формы
    } catch (e: any) {
      console.error("Ошибка:", e);
      toast.error("Ошибка при загрузке или публикации");
    }
  };

  if (isLoading) return "Loading";
  if (error) return "Error";

  return (
    <div className="w-full h-full flex flex-col gap-y-4">
      <TypographyH2 className="text-center text-primary">
        Управление группами
      </TypographyH2>
      <GroupList mutate={mutate} data={data} />
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="w-full cursor-pointer fixed bottom-2 left-1/2 -translate-x-1/2 text-base font-semibold max-w-xs">
            Добавить новую
            <PlusCircle size={50} />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full h-full overflow-auto"
          >
            <DrawerHeader>
              <DrawerTitle>Добавление новой группы/канала</DrawerTitle>
              <DrawerDescription>Базовая информация</DrawerDescription>
            </DrawerHeader>
            <div className="w-full flex flex-col gap-y-4 px-4 h-full overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="tg_id">TelegramID</Label>
                <Controller
                  name="tg_id"
                  control={control}
                  rules={{ required: "Поле обязательно" }}
                  render={({ field }) => (
                    <Input {...field} id="tg_id" type="text" placeholder="ID" />
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link">Ссылка на группу</Label>
                <Controller
                  name="link"
                  control={control}
                  rules={{ required: "Поле обязательно" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="link"
                      type="text"
                      placeholder="https://t.me/..."
                    />
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="peer_type">Тип источника</Label>
                <Controller
                  name="peer_type"
                  control={control}
                  rules={{ required: "Поле обязательно" }}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue id="peer_type" placeholder="Источник" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>тип</SelectLabel>
                          <SelectItem value="Канал">Канал</SelectItem>
                          <SelectItem value="Группа">Группа</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username (Необязательно) </Label>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="username"
                      type="text"
                      placeholder="@username"
                    />
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Заголовок | Название</Label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="title"
                      type="text"
                      placeholder="Заголовок"
                    />
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about">Описание</Label>
                <Controller
                  name="about"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="about"
                      placeholder="Описание группы"
                    />
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="photo">Фото группы</Label>
                <Input
                  onChange={(e) => {
                    setPhoto(e.target.files?.[0]);
                  }}
                  id="photo"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                />
                {/* <Controller
                  name="image640"
                  control={control}
                  render={({ field }) => (
                    <Input
                      onChange={(e) => {
                        field.onChange(e.target.files?.[0]);
                      }}
                      id="image640"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                    />
                  )}
                /> */}
              </div>
              <Controller
                name="image100"
                control={control}
                render={({ field }) => (
                  <Input
                    id="image100"
                    type="hidden"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="image640"
                control={control}
                render={({ field }) => (
                  <Input
                    id="image640"
                    type="hidden"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <div className="space-y-2">
                <Label htmlFor="participants_count">
                  Количество подписчиков
                </Label>
                <Controller
                  name="participants_count"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="participants_count"
                      placeholder="1488"
                      type="number"
                    />
                  )}
                />
              </div>
            </div>
            <DrawerFooter>
              <Button type="submit">Добавить</Button>
              <DrawerClose>
                <Button
                  onClick={() => reset()}
                  className="w-full"
                  variant="outline"
                >
                  Отменить
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
