"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import TyphographyP from "../typography/TyphographyP";

export default function AdvSlider() {
  const adv = ["Надежно", "Быстро", "Проверенно"];

  return (
    <Carousel
      className="w-full max-w-xs"
      opts={{
        align: "center",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {adv.map((item, index) => (
          <CarouselItem key={index} className="flex items-center">
            <Button className="mx-auto">
              <TyphographyP className="text-base uppercase">
                {item}
              </TyphographyP>
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
