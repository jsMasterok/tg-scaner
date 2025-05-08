import AdvSlider from "./components/AdvSlider";
import Search from "./components/Search";
import Container from "./layouts/Container";
import TyphographyP from "./typography/TyphographyP";
import TypographyH2 from "./typography/TypographyH2";
import TyphographyH1 from "./typography/TyphographyH1";
import HeroGroups from "./components/HeroGroups";
import { UserRoundSearch } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="w-full flex flex-col">
      <Container>
        <section className="w-full flex flex-col py-4 h-screen justify-evenly pb-20 items-center">
          <TyphographyH1 className={"text-center p-2"}>
            Пробей Telegram группу прежде чем вступать 🔍
          </TyphographyH1>
          <TyphographyP className="text-primary text-center">
            TG-Scaner — твой фильтр от скама и фейков. Смотри честные отзывы,
            узнай, кто за группой стоит и что о ней говорят. Защити себя и своих
            подписчиков.
          </TyphographyP>
          <AdvSlider />
          <TyphographyP className="bg-primary inline-flex items-center gap-x-2 text-primary-foreground px-8 py-2 rounded-md uppercase">
            tg-scaner.ru{" "}
          </TyphographyP>
        </section>
      </Container>
      <section className="w-full flex flex-col gap-y-4 items-center">
        <TypographyH2 className="text-center">
          Пробей любую группу — за секунды
        </TypographyH2>
        <Search />
      </section>
      <section className="w-full flex flex-col gap-y-4 items-center mt-4 p-2">
        <TypographyH2 className="text-center">
          Недавние запросы на проверку
        </TypographyH2>
        <HeroGroups />
        <Button className="w-fit mx-auto my-4">
          Заказать индивидуальную проверку
          <UserRoundSearch />
        </Button>
        <TypographyH2 className="text-primary text-center">
          Описание сервиса
        </TypographyH2>
        <TyphographyP className="text-center text-primary">
          Наш сервис помогает быстро и безопасно проверять Telegram-группы и
          каналы перед сотрудничеством.
        </TyphographyP>
        <TyphographyP className="text-center text-primary">
          Мы используем данные из TGStat, чтобы показать:
        </TyphographyP>
        <ul className="flex flex-col gap-y-2 pl-4 list-disc">
          <li>
            <TyphographyP className="text-primary">
              🔍 Основную информацию о канале (название, описание, страна, язык)
            </TyphographyP>
          </li>
          <li>
            <TyphographyP className="text-primary">
              📈 Статистику (подписчики, индекс цитирования, активность)
            </TyphographyP>
          </li>
          <li>
            <TyphographyP className="text-primary">
              ⚠️ Метки о мошенничестве, накрутке, блокировках
            </TyphographyP>
          </li>
          <li>
            <TyphographyP className="text-primary">
              ✅ Статус верификации в РКН
            </TyphographyP>
          </li>
        </ul>
        <TyphographyP className="text-center text-primary">
          Идеальный инструмент для маркетологов, аналитиков и всех, кто хочет
          быть уверенным в репутации Telegram-площадок.
        </TyphographyP>
      </section>
    </main>
  );
}
