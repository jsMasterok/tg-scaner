"use client";

import { useForm, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import axios from "axios";
import toast from "react-hot-toast";

type FormData = {
  username: string;
  password: string;
};

export default function Login() {
  const [value, setValue, removeValue] = useLocalStorage("token", 0);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: FormData) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URI}/auth/login`, data)
      .then((data: any) => {
        console.log(data);

        if (data.status === 200) {
          setValue(data.data.token);
          toast.success("Вы успешно авторизовались");
          router.push("/admin");
        } else {
          toast.error("Ошибка при авторизации");
        }
      })
      .catch((e) => {
        console.log(e);

        toast.error(e.response.data.message);
        removeValue();
      })
      .finally(() => {
        reset();
      });
  };

  return (
    <Card className="mt-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Авторизация</CardTitle>
          <CardDescription>
            Вход в существующий аккаунт tg-scaner
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 mt-2">
            <Label htmlFor="username">Username</Label>
            <Controller
              name="username"
              control={control}
              rules={{ required: "Поле обязательно", minLength: 3 }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="username"
                  placeholder="UserName"
                  type="text"
                />
              )}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
            {errors.username?.type == "minLength" && (
              <p className="text-sm text-red-500">
                Имя должно быть больше 3х символов
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="new">Password</Label>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Введите пароль", minLength: 8 }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="password"
                  type="password"
                  placeholder="password"
                />
              )}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
            {errors.password?.type == "minLength" && (
              <p className="text-sm text-red-500">
                Пароль должен быть не менее 8ми символов
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={errors?.password || errors?.username ? true : false}
            className="mt-2 cursor-pointer"
          >
            Авторизация
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
