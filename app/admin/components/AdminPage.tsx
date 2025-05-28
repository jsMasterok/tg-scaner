"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TyphographyH1 from "@/app/typography/TyphographyH1";
import Groups from "./Groups";
import Reviews from "./Reviews";

export default function AdminPage() {
  return (
    <section className="w-full min-h-screen flex flex-col gap-y-4">
      <TyphographyH1 className="text-center text-primary my-2">
        Админ панель
      </TyphographyH1>
      <Tabs defaultValue="groups" className="w-full h-fit">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="groups">Группы</TabsTrigger>
          <TabsTrigger value="reviews">Отзывы</TabsTrigger>
          <TabsTrigger disabled={true} value="stats">
            Статистика
          </TabsTrigger>
        </TabsList>
        <TabsContent value="groups">
          <Groups />
        </TabsContent>
        <TabsContent value="reviews">
          <Reviews />
        </TabsContent>
        <TabsContent value="stats"></TabsContent>
      </Tabs>
    </section>
  );
}
