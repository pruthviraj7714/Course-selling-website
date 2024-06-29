"use client";

import axios from "axios";
import { BackgroundBoxesDemo } from "../_components/Background-boxdemo";
import { CarouselPlugin } from "../_components/Carousel";
import { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";
import CategoryCard from "../_components/CategoryCard";
import { Code2, CodeIcon } from "lucide-react";
import { CATEGORIES } from "@/constants/Icategories";

interface CourseType {
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  studentsEnrolledCount: number;
  duration: string;
  rating: number;
  category : string;
  _id: string;
}

export default function Courses() {
  const [courses, setCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    const getAllCourses = async () => {
      const coursesArr = await axios.get("/api/all-courses");
      console.log(coursesArr);
      setCourses(coursesArr.data.courses);
    };
    getAllCourses();
  }, []);

  return (
    <div className="flex flex-col bg-primary-foreground">
      <BackgroundBoxesDemo />
      <div className="p-6 border-t-2 border-black">
        <h1 className="my-4 font-bold text-2xl">
          Courses to get you started
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-auto p-10">
        {courses && courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard
              title={course.title}
              thumbnail={course.thumbnail}
              price={course.price}
              studentsEnrolledCount={course.studentsEnrolledCount}
              duration={course.duration}
              rating={course.rating}
              category={course.category}
              id={course._id}
            />
          ))
        ) : (
          <div className="font-bold text-5xl flex items-center justify-center">
            No Courses found
          </div>
        )}
      </div>
      </div>
      <div className="p-6">
        <h1 className="my-4 text-white font-bold text-2xl">Featured Courses</h1>
        <div className="flex justify-center items-center">
          <CarouselPlugin />
        </div>
      </div>
      <div className="p-4">
        <h1 className="my-4 text-white font-bold text-2xl">Categories</h1>
        <div className="grid grid-cols-2 p-7 gap-10 my-4">
          {CATEGORIES.map((category) => (
            <CategoryCard category={category.name} Clink={category.name} CIcon={category.icon} />
          ))}
        </div>
      </div>
    </div>
  );
}
