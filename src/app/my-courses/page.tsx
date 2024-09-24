"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import Link from "next/link";
import { SkeletonCard } from "@/components/SkeletonCard";

export default function Page() {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPurchasedCourses = async () => {
    try {
      const res = await axios.get("/api/creator-courses");
      setCourses(res.data.courses);
    } catch (error: any) {
      console.log(error.message);
    }finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPurchasedCourses();
  }, []);

  if(isLoading) {
    return (
      <div className="min-h-screen grid grid-cols-4 gap-4 bg-primary-foreground">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    )
  }

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
              You haven&apos;t added any course yet.
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Go to &quot;Add Course&quot; to add your own course.
            </p>
            <Link
              href="/add-course"
              className="px-4 py-2 font-semibold bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Add your course
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
