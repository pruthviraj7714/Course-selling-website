"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from "axios";
import Link from "next/link";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const [courses, setCourses] = React.useState<any[]>([]);

  React.useEffect(() => {
    const getAllCourses = async () => {
      try {
        const coursesArr = await axios.get("/api/all-courses");
        setCourses(coursesArr.data.courses);
      } catch (error: any) {
        console.error(error.response.data.message);
      }
    };
    getAllCourses();
  }, []);

  const getStars = (rating: any) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (rating > i - 1) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xl border border-black dark:border-white"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {courses.slice(0,4).map((course, index) => (
          <CarouselItem key={index}>
            <div>
              <Card>
                <Link href={`/courses/${course.category}/${course._id}`}>
                  <CardContent className="flex w-full flex-col items-center justify-center">
                    <img
                      className="w-full h-72"
                      src={course.thumbnail}
                      alt={course.title}
                    />
                    <div className="flex flex-col gap-2 p-4 rounded-lg shadow-md bg-white dark:bg-transparent">
                      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {course.title}
                      </h1>
                      <div className="flex items-center">
                        {getStars(course.rating)}
                      </div>
                      <h4 className="text-lg font-medium text-gray-600 dark:text-white">
                        ₹{course.price}
                      </h4>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
