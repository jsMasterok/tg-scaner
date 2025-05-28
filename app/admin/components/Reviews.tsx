"use client";

import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocalStorage } from "usehooks-ts";
import useSWR from "swr";

import { PlusCircle, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import TypographyH2 from "@/app/typography/TypographyH2";
import TyphographyP from "@/app/typography/TyphographyP";
import { useState } from "react";
import Image from "next/image";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Reviews() {
  const [token, setToken, removeToken] = useLocalStorage("token", 0);
  const [revPhoto, setRevPhoto] = useState<File | null>(null);

  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URI}/reviews`,
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
      user: "",
      review: "",
      date: "",
      photos: "",
    },
  });

  const submitRev = async () => {
    try {
      const formData = new FormData();
      formData.append("image", revPhoto);

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
      setValue("photos", imageUrl);

      const revRes = await axios
        .post(`${process.env.NEXT_PUBLIC_API_URI}/reviews`, getValues(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          mutate();
        })
        .finally(() => {
          reset(); // сброс формы
        });

      console.log("Группа добавлена:", revRes.data);
      toast.success("Отзыв успешно опубликован");
    } catch (e) {
      console.error("Ошибка:", e);
      toast.error("Ошибка при загрузке или публикации");
    }
  };

  const deleteReview = (id) => {
    const confirmed = window.confirm("Вы уверены, что хотите удалить отзыв?");
    if (!confirmed) return;
    console.log(`${process.env.NEXT_PUBLIC_API_URI}/reviews/${id}`);

    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URI}/reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Отзыв успешно удален");
        mutate();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Ошибка при удалении отзыва");
      });
  };

  if (isLoading) return "";
  if (error) return "Ошибка";

  return (
    <div className="w-full h-full flex flex-col gap-y-4">
      <TypographyH2 className="text-center text-primary">
        Управление отзывами
      </TypographyH2>
      <TyphographyP className="text-primary text-center">
        Отзывы для остальных груп (Нейтральные)
      </TyphographyP>
      <div className="grid grid-cols-1 gap-y-2">
        {data?.map((item, index) => (
          <div
            key={index}
            className="w-full relative flex flex-col gap-y-2 p-2 rounded-md border-2 border-primary"
          >
            <TyphographyP className="text-primary">{item.date}</TyphographyP>
            <TyphographyP className="text-primary">{item.user}</TyphographyP>
            <TyphographyP className="text-primary">{item.review}</TyphographyP>
            {item.photos !== "" && (
              <>
                <TyphographyP className="text-primary my-1">Фото:</TyphographyP>
                <Image
                  width={100}
                  height={200}
                  src={`${process.env.NEXT_PUBLIC_API_URI}${item.photos}`}
                  alt={item.user}
                />
              </>
            )}
            <Button
              variant={"destructive"}
              onClick={() => deleteReview(item._id)}
              className="w-fit h-fit absolute z-10 top-2 right-2"
            >
              <Trash />
            </Button>
          </div>
        ))}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full cursor-pointer fixed bottom-2 left-1/2 -translate-x-1/2 text-base font-semibold max-w-xs">
            Добавить отзыв <PlusCircle />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Отзыв</DialogTitle>
            <DialogDescription>Внесите данные </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(submitRev)}
            className="w-full flex flex-col gap-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="user">Пользователь</Label>
              <Controller
                name="user"
                control={control}
                rules={{ required: "Поле обязательно" }}
                render={({ field }) => (
                  <Input {...field} id="user" type="text" placeholder="Имя" />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="review">Отзыв</Label>
              <Controller
                name="review"
                control={control}
                rules={{ required: "Поле обязательно" }}
                render={({ field }) => (
                  <Textarea {...field} id="review" placeholder="Отзыв" />
                )}
              />
            </div>
            <div className="space-y-2 z-20">
              <Label htmlFor="date">Дата</Label>
              <Controller
                name="date"
                control={control}
                rules={{ required: "Поле обязательно" }}
                render={({ field }) => (
                  <Input
                    value={field.value}
                    onChange={field.onChange}
                    type="date"
                    className="z-20"
                    id="date"
                  />
                )}
              />
            </div>
            <Controller
              name="photos"
              control={control}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  type="hidden"
                />
              )}
            />
            <div className="space-y-2">
              <Label htmlFor="photos">Фото (Если нужно)</Label>
              <Input
                onChange={(e) => setRevPhoto(e.target.files?.[0])}
                type="file"
                multiple
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" className="my-1" variant="secondary">
                  Закрыть
                </Button>
              </DialogClose>
              <Button type="submit" className="my-1">
                Добавить
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
