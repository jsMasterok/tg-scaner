"use client";
import toast from "react-hot-toast";
import { useLocalStorage } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Container from "../layouts/Container";
import AdminPage from "./components/AdminPage";
import axios from "axios";

export default function page() {
  const [token, setToken, removeToken] = useLocalStorage("token", 0);
  const router = useRouter();
  const [isValidUser, setIsValidUser] = useState<Boolean>(false);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URI}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        if (data.status === 200) {
          setIsValidUser(true);
        } else {
          setIsValidUser(false);
          toast.error("У вас нет доступа");
          router.push("/auth");
          removeToken();
        }
      });
  }, []);

  return (
    <Container>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Админ панель</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {isValidUser ? (
        <AdminPage />
      ) : (
        <section className="w-full min-h-screen flex flex-col gap-y-4"></section>
      )}
    </Container>
  );
}
