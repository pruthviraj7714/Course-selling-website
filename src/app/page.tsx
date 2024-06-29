"use client"

import { HoverEffect } from "@/components/Card-hover-effect";
import { LampDemo } from "@/components/ui/lamp";
import { CarouselPlugin } from "./_components/Carousel";
import { BackgroundGradientDemo } from "./_components/Gradient-Card";
import { AccordionDemo } from "./_components/AccordionDemo";
import { skills } from "@/constants/Iskills";
import { InfiniteMovingCards } from "@/components/infinite-moving-cards";
import { Testimonials } from "@/constants/Testimonials";;

export default function Home() {
  return (
    <>
      <div>
        <LampDemo />
        <div className="flex justify-center flex-col items-center bg-black p-4">
          <h1 className="my-2 font-serif text-white text-4xl">
            The Skills You Should Learn
          </h1>
          <HoverEffect items={skills} />
        </div>
        <div className="h-[40rem] rounded-md flex flex-col antialiased border-2 border-b-black bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={Testimonials}
            direction="right"
            speed="slow"
          />
        </div>
        <AccordionDemo />
      </div>
    </>
  );
}
