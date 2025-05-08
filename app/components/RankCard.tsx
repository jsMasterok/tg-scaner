import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TypographyH3 } from "../typography/TypographyH3";
import TyphographyP from "../typography/TyphographyP";
import { Button } from "@/components/ui/button";
import { Link as LinkIco } from "lucide-react";
import Link from "next/link";

export default function RankCard({
  item,
  type = "dark",
}: {
  item: any;
  type: string;
}) {
  return (
    <article
      className={`w-full flex flex-col gap-y-2 border-2 rounded-md ${
        type === "dark" ? "border-primary" : "border-primary-foreground"
      } p-2`}
    >
      <header className="w-fit mx-auto flex flex-col items-center gap-y-1">
        <Avatar className="w-18 h-18">
          <AvatarImage src={item?.image100} alt={item?.title} />
          <AvatarFallback>{item?.title}</AvatarFallback>
        </Avatar>
        <TypographyH3
          className={`${
            type === "dark" ? "text-primary" : "text-primary-foreground"
          }`}
        >
          {item?.username}
        </TypographyH3>
      </header>
      <TyphographyP
        className={`${
          type === "dark" ? "text-primary" : "text-primary-foreground"
        }`}
      >
        Подписчики: {item?.participants_count.toLocaleString()}
      </TyphographyP>
      <TyphographyP
        className={`${
          type === "dark" ? "text-primary" : "text-primary-foreground"
        }`}
      >
        {item?.title}
      </TyphographyP>
      <TyphographyP
        className={` whitespace-pre-line ${
          type === "dark" ? "text-primary" : "text-primary-foreground"
        }`}
      >
        {item?.about}
      </TyphographyP>
      {item?.ci_index && (
        <TyphographyP
          className={`w-fit py-1 px-2 text-xs rounded-md ${
            type === "dark"
              ? "bg-primary text-primary-foreground"
              : "bg-primary-foreground text-primary"
          }`}
        >
          Индекс цитирования:
          {Math.round(item.ci_index)}
        </TyphographyP>
      )}
      <Button variant={type === "dark" ? "default" : "outline"} asChild>
        <Link href={`/groups/${item?.tg_id}`}>
          Полный отчет <LinkIco />
        </Link>
      </Button>
    </article>
  );
}
