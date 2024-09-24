"use client";

import axios from "axios";
import { BookAIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import { Button } from "@/components/ui/button";
export default function Page() {
  const [userInfo, setUserInfo] = useState<any>({});
  const [isLoading, setIsLoading] = useState<any>(true);

  const getUserInfo = async () => {
    try {
      const res = await axios.get("api/user/info");
      setUserInfo(res.data.info);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-black text-black dark:text-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <div className="text-5xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-foreground duration-300">
      <div className="h-24 flex bg-primary items-center px-24 font-bold text-4xl font-serif shadow-lg">
        {userInfo.name}
      </div>
      <div className="flex flex-col lg:flex-row justify-evenly items-center py-10">
        <div className="flex flex-col items-center">
          <div className="mt-5 h-32 w-32 flex justify-center items-center bg-gray-300 dark:bg-gray-700 rounded-full border-4 border-gray-900 dark:border-gray-200 shadow-md">
            <img
              className="object-cover h-full w-full rounded-full"
              src={userInfo.gender === "male" ? "/male.svg" : "/female.svg"}
              alt="profile-icon"
            />
          </div>
          <div className="flex justify-evenly items-center my-4 gap-x-4">
            <Link href={"/edit-profile"}>
              <Button className="my-1 bg-yellow-500 text-gray-900 dark:text-gray-900 font-sans rounded-lg px-4 py-2 text-md hover:bg-yellow-400 shadow-md">
                Edit Profile
              </Button>
            </Link>
            <Link href={"/change-password"}>
              <Button className="my-1 bg-sky-500 font-sans text-gray-900 rounded-lg px-4 py-2 text-md hover:bg-sky-400 shadow-md">
                Change Password
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col p-6 my-4 space-y-6 w-full lg:w-1/2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300">
          <div className="p-4 font-sans text-xl border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700">
            Name:{" "}
            <span className="font-bold text-gray-900 dark:text-gray-200">
              {userInfo.name}
            </span>
          </div>
          <div className="p-4 font-sans text-xl border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700">
            Bio:{" "}
            <span className="font-bold text-gray-900 dark:text-gray-200">
              {userInfo.bio ? userInfo.bio : "Not added yet ❗"}
            </span>
          </div>
          <div className="p-4 font-sans text-xl border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700">
            Gender:{" "}
            <span className="font-bold text-gray-900 dark:text-gray-200">
              {userInfo.gender}
            </span>
          </div>
          <div className="p-4 font-sans text-xl border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700">
            Email:{" "}
            <span className="font-bold text-gray-900 dark:text-gray-200">
              {userInfo.email}
            </span>
          </div>
          <div className="p-4 flex font-sans text-xl border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700">
            Current Learning Points:{" "}
            <span className="font-bold text-gray-900 dark:text-gray-200 flex items-center ml-2">
              <BookAIcon />
              {userInfo.learningPoints}
            </span>
          </div>
        </div>
      </div>
      <div className="px-10 pb-10">
        <h1 className="flex justify-center items-center text-3xl font-semibold mb-6">
          Courses You&apos;re Enrolled In
        </h1>
        <div className="container mx-auto">
          {userInfo.purchasedCourses && userInfo.purchasedCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userInfo.purchasedCourses.map((course: any) => (
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
                You haven&apos;t purchased any course yet
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
    </div>
  );
}
