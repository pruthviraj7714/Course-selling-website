"use client";
import CourseCard from "@/app/_components/CourseCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ({
  params,
}: {
  params: {
    category: string;
  };
}) {
  const [courses, setCourses] = useState<any[]>([]);
  const category = params.category;

  useEffect(() => {
    const getAll = async () => {
      try {
        const res = await axios.get(`/api/all-courses?category=${category}`);
        console.log(res.data);
        setCourses(res.data.courses);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    getAll();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="h-24 flex bg-gray-300 items-center px-24 font-bold text-4xl font-serif">
        {decodeURIComponent(category)}
      </div>
      <div className="container mx-auto p-10">
          {courses && courses.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
              {courses.map((course: any) => (
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
            <div className="flex justify-center items-center font-bold text-3xl">
              You haven't purchased any course yet
            </div>
          )}
        </div>
    </div>
  );
}
