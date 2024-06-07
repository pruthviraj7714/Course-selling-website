import { HoverEffect } from "@/components/Card-hover-effect";
import { LampDemo } from "@/components/ui/lamp";
import { CarouselPlugin } from "./_components/Carousel";
import { BackgroundGradientDemo } from "./_components/Gradient-Card";
import { AccordionDemo } from "./_components/AccordionDemo";
import { skills } from "@/constants/Iskills";

export default function Home() {
  
  return (
    <>
      <div>
        <LampDemo />
        <div className="flex justify-center flex-col items-center bg-black p-4">
          <h1 className="my-2 font-serif text-white text-4xl">The Skills You Should Learn</h1>
          <HoverEffect items={skills} />
        </div>
        <div className="max-w-4xl mx-auto flex items-center justify-center px-8">
          <CarouselPlugin />
        </div>
        <div className="grid grid-cols-3 gap-5 p-6 my-4 ">
          <BackgroundGradientDemo />
          <BackgroundGradientDemo />
          <BackgroundGradientDemo />
        </div>
        <AccordionDemo />
      </div>
    </>
  );
}
