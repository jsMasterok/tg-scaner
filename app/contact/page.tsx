"use client";

import Container from "../layouts/Container";
import TyphographyH1 from "../typography/TyphographyH1";
import TyphographyP from "../typography/TyphographyP";
import TypographyH2 from "../typography/TypographyH2";
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function page() {
  return (
    <Container>
      <section className="w-full flex flex-col gap-y-4 h-full min-h-screen">
        <TyphographyH1 className="text-primary">Обратная связь</TyphographyH1>
        <TypographyH2 className="text-primary">
          Используйте эту форму обратной связи только для следующих случаев:
        </TypographyH2>
        <TyphographyP className="text-primary">
          1. Если Вы не можете по какой-то причине зарегистрироваться и ранее не
          имели регистраций (в письме необходимо указать какая ошибка выдается
          сервером).
          <br />
          <br />
          2. Если Вы нашли ошибку в работе сервиса (в письме обязательно указать
          свои емаil и ошибку, которую Вы нашли).
          <br />
          <br />
          3. По всем вопросам связанным с аккаунтом - указывать Логин. Все
          письма с заблокированных ip, за нарушение правил нашего сервиса,
          игнорируются.
        </TyphographyP>
        <TypographyH2 className="text-primary">
          Для связи с администрацией сервиса используйте форму ниже:
        </TypographyH2>
        <Card>
          <CardHeader>
            <CardTitle>Обращение</CardTitle>
            <CardDescription>Заполните форму обратной связи</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Имя</Label>
              <Input id="name" placeholder="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="mail">Email</Label>
              <Input type="mail" id="mail" placeholder="name@mail.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cat">Тема обращения</Label>
              <Input id="cat" placeholder="Некорректный отзыв" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="message">Обращение</Label>
              <Textarea id="message" placeholder="Ваше обращение" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Отправить</Button>
          </CardFooter>
        </Card>
      </section>{" "}
    </Container>
  );
}
