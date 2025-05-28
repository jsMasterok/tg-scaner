import { useForm, Controller } from "react-hook-form";

import TyphographyP from "@/app/typography/TyphographyP";

import { Edit, MessageSquareText, Trash } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocalStorage } from "usehooks-ts";
import toast from "react-hot-toast";
import AddRev from "./AddRev";
import { reviews } from "@/app/utils/constants";

export default function ListItem({ item, mutate }) {
  const [token, setToken, removeToken] = useLocalStorage("token", 0);
  const [revName, setRevName] = useState("");
  const [revDate, setRevDate] = useState("");
  const [revText, setRevText] = useState("");
  const [revPhoto, setRevPhoto] = useState<File | null>(null);
  const [photoLink, setPhotoLink] = useState("");

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

  useEffect(() => {
    setValue("tg_id", item.tg_id);
    setValue("link", item.link);
    setValue("peer_type", item.peer_type);
    setValue("username", item.username);
    setValue("title", item.title);
    setValue("about", item.about);
    setValue("viewsCount", item.viewsCount);
    setValue("participants_count", item.participants_count);
    setValue("image100", item.image100);
    setValue("image640", item.image640);
    setValue("reviews", item.reviews);
  }, []);

  const onSubmit = async (data: any) => {
    console.log("test");

    try {
      axios
        .patch(
          `${process.env.NEXT_PUBLIC_API_URI}/groups/${item.tg_id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((data) => {
          toast.success(data.data.message);
          console.log(data);
          mutate();
        });
    } catch (error) {
      console.log(error);
      toast.error("Ошибка при обновлении данных");
    }
  };

  const submitRev = async () => {
    try {
      if (revPhoto) {
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
        setPhotoLink(imageUrl);
      }

      // 2. Сбор данных формы
      const payload = {
        reviews: [
          ...getValues("reviews"),
          {
            user: revName,
            review: revText,
            date: revDate,
            photos: photoLink,
          },
        ],
      };

      //   3. Отправка формы
      const revRes = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URI}/groups/${item.tg_id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Отзыв добавлена:", revRes.data);
      toast.success("Отзыв успешно опубликован");
      setRevName("");
      setRevDate("");
      setRevText("");
      setRevPhoto(null);
      setPhotoLink("");
    } catch (error) {
      console.log(error);
      toast.error("Ошибка при добавлении отзыва");
    }
  };

  const deleteGroup = () => {
    const confirmed = window.confirm(
      "Вы уверены, что хотите удалить эту группу?"
    );
    if (!confirmed) return;

    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URI}/groups/${item.tg_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Группа успешно удалена");
        mutate();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Ошибка при удалении группы");
      });
  };

  return (
    <div
      key={item.tg_id}
      className="w-full p-2 rounded-md border-2 border-primary flex items-center justify-between gap-2"
    >
      <Avatar className="w-18 h-18">
        <AvatarImage
          src={`${process.env.NEXT_PUBLIC_API_URI}${item.image100}`}
          alt={item.title}
        />
        <AvatarFallback>N</AvatarFallback>
      </Avatar>
      <TyphographyP className="text-primary truncate ">
        {item.title}
      </TyphographyP>
      <div className="w-fit inline-flex items-center gap-x-1">
        {/* EDIT */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Edit />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Редактировать группу - {item.tg_id}</DialogTitle>
              <DialogDescription>Внесите изменения</DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-y-2 overflow-auto max-h-"
            >
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
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" className="my-1" variant="secondary">
                    Закрыть
                  </Button>
                </DialogClose>
                <Button type="submit" className="my-1">
                  Сохранить
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        {/* | */}
        {/* ADD revs */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-fit h-fit">
              <MessageSquareText />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit(submitRev)}>
              <DialogHeader>
                <DialogTitle>Добавить отзыв - {item.tg_id}</DialogTitle>
                <DialogDescription>Внесите изменения</DialogDescription>
              </DialogHeader>
              <div className="w-full flex flex-col gap-y-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Дата</Label>
                  <Input
                    value={revDate}
                    onChange={(e) => setRevDate(e.target.value)}
                    className="w-full"
                    type="date"
                    name="date"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Имя</Label>
                  <Input
                    value={revName}
                    onChange={(e) => setRevName(e.target.value)}
                    type="text"
                    name="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review">Отзыв</Label>
                  <Textarea
                    value={revText}
                    onChange={(e) => setRevText(e.target.value)}
                    name="review"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photos">Фото (Если нужно)</Label>
                  <Input
                    onChange={(e) => setRevPhoto(e.target.files?.[0])}
                    type="file"
                    multiple
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Закрыть
                  </Button>
                </DialogClose>
                <Button type="submit">Сохранить</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        {/* | */}
        {/* DELETE */}
        <Button
          onClick={() => deleteGroup()}
          className="w-fit h-fit"
          variant={"destructive"}
        >
          <Trash />
        </Button>
        {/* | */}
      </div>
    </div>
  );
}
