"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/constants/Icategories";
import { CarouselPlugin } from "./Carousel";
import CategoryCard from "./CategoryCard";
import CourseCard from "./CourseCard";
import { SkeletonCard } from "./SkeletonCard";

interface CourseType {
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  studentsEnrolledCount: number;
  duration: string;
  rating: number;
  category: string;
  _id: string;
}

export default function CourseHomePage() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllCourses = async () => {
      try {
        const coursesArr = await axios.get("/api/all-courses");
        setCourses(coursesArr.data.courses);
      } catch (error: any) {
        console.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };
    getAllCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="p-6 border-t-2 border-black">
        <h1 className="my-4 font-bold text-2xl">Courses to get you started</h1>
        <div className="container mx-auto p-10">
          {courses && courses.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {courses.map((course: CourseType) => (
                <CourseCard
                  key={course._id}
                  title={course.title}
                  thumbnail={course.thumbnail}
                  price={course.price}
                  studentsEnrolledCount={course.studentsEnrolledCount}
                  duration={course.duration}
                  rating={course.rating}
                  category={course.category}
                  id={course._id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-300">
                No Courses Added Here Yet
              </h2>
            </div>
          )}
        </div>
      </div>
      <div className="p-6">
        <h1 className="my-4 font-bold text-2xl">Featured Courses</h1>
        <div className="flex justify-center items-center">
          <CarouselPlugin />
        </div>
      </div>
      <div className="p-4">
        <h1 className="my-4  font-bold text-2xl">Categories</h1>
        <div className="grid grid-cols-2 p-7 gap-10 my-4">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category.name}
              category={category.name}
              Clink={category.name}
              CIcon={category.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
