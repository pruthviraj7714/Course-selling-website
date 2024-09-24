"use client";

import CourseCard from "@/components/CourseCard";
import { SkeletonCard } from "@/components/SkeletonCard";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CategoryPage({ category }: { category: string }) {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAll = async () => {
      try {
        const res = await axios.get(`/api/all-courses?category=${category}`);
        setCourses(res.data.courses);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getAll();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen grid grid-cols-4 gap-4 bg-primary-foreground">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
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
            No Courses Added Here Yet
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Explore other categories in the meantime!
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
  );
}
