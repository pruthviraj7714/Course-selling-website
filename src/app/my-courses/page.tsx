"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import Link from "next/link";

export default function () {
  const [courses, setCourses] = useState<any[]>([]);


  const getPurchasedCourses = async () => {
    try {
      const res = await axios.get("/api/creator-courses");
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
    <div className="min-h-screen bg-primary-foreground">
      <div className="h-24 flex bg-primary items-center px-24 font-bold text-4xl font-serif">
        My Courses
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
            <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-300">
              You haven't purchased any course yet.
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Start exploring and purchasing your favorite courses!
            </p>
            <Link
              href={"/courses"}
              className="px-4 py-2 font-semibold bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Explore Courses
            </Link>
          </div>
          )}
        </div>
    </div>
  );
}
