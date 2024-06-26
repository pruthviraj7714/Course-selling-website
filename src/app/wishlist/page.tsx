"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";

const WishlistPage = async () => {
  const [courses, setCourses] = useState<any[]>([]);

  const getWishListCourses = async () => {
    try {
      const res = await axios.get("/api/get-wishlists");
      console.log(res.data);
      setCourses(res.data.courses);

      const res2 = await axios.get('/api/wishlist');
      console.log(res2);

    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getWishListCourses();
  }, []);

  return (
    <div className="h-screen">
     <div className="h-24 flex bg-gray-300 items-center px-24 font-bold text-4xl font-serif">
        My Wishlist
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
};

export default WishlistPage;
