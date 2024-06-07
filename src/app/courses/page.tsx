"use client";

import axios from "axios";
import { BackgroundBoxesDemo } from "../_components/Background-boxdemo";
import { CarouselPlugin } from "../_components/Carousel";
import { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";

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
    <div className="flex flex-col bg-gradient-to-r from-slate-700 to-slate-900">
      <BackgroundBoxesDemo />
      <div className="p-6">
        <h1 className="my-4 text-white font-bold text-2xl">
          Courses to get you started
        </h1>
        <div className="grid grid-cols-4 gap-5 h-[400px]">
          {courses.map((course) => (
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
          ))}
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
        <div className="flex flex-col gap-y-10 justify-center items-end px-10 p-4 my-4">
          {courses.map((course) => (
            <div>
              <h1>{course.title}</h1>
              <h1>{course.description}</h1>
              <img
                src={course.thumbnail}
                width={450}
                height={230}
                alt={"Course Thumbnail"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
