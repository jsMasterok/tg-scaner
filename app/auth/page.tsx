import React from "react";
import Container from "../layouts/Container";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
            <Card>
              <CardHeader>
                <CardTitle>Регистрация</CardTitle>
                <CardDescription>Заполните форму регистрации</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="@peduarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="mail">Email</Label>
                  <Input type="mail" id="mail" placeholder="name@mail.com" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input type="password" id="password" placeholder="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Регистрация</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Авторизация</CardTitle>
                <CardDescription>
                  Вход в существующий аккаунт tg-scaner
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="peduarte" type="text" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">Password</Label>
                  <Input id="password" type="password" placeholder="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Авторизация</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </Container>
  );
}
