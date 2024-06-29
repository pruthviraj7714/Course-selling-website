"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";

export default function () {
  const [courses, setCourses] = useState<any[]>([]);


  const getPurchasedCourses = async () => {
    try {
      const res = await axios.get("/api/get-purchased-courses");
      console.log(res.data);
      setCourses(res.data.courses);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPurchasedCourses();
  }, []);

  return (
    <div className="h-screen bg-white dark:bg-gradient-to-r dark:from-slate-700 dark:to-slate-900">
      <div className="h-24 flex bg-black text-white  dark:bg-white dark:text-black items-center px-24 font-bold text-4xl font-serif">
        My Learning
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
