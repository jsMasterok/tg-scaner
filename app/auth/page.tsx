import Container from "../layouts/Container";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Register from "./components/Register";
import Login from "./components/Login";

export default function page() {
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
            <BreadcrumbLink href="/auth">Авторизация</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="h-screen w-full flex items-center justify-center gap-4">
        <Tabs defaultValue="account" className="w-full h-fit">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Регистрация</TabsTrigger>
            <TabsTrigger value="password">Авторизация</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Register />
          </TabsContent>
          <TabsContent value="password">
            <Login />
          </TabsContent>
        </Tabs>
      </section>
    </Container>
  );
}
