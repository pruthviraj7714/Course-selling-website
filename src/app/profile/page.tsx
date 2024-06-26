"use client";

import axios from "axios";
import {
  BookAIcon,
  Lamp,
  SparkleIcon,
  StarOffIcon,
  StarsIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiGoldenline } from "react-icons/si";
import CourseCard from "../_components/CourseCard";

export default function () {
  const [userInfo, setUserInfo] = useState<any>({});

  const getUserInfo = async () => {
    try {
      const res = await axios.get("api/user/info");
      console.log(res.data);

      setUserInfo(res.data.info);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="">
      <div className="h-24 flex bg-gray-300 items-center px-24 font-bold text-4xl font-serif">
        {userInfo.name}
      </div>
      <div className="flex justify-evenly items-center">
        <div className="flex flex-col items-center">
          <div className="mt-5 h-32 w-32 flex justify-center bg-slate-200  items-center rounded-full border-2 border-black">
            <img
              className="object-cover h-full w-full"
              src={userInfo.gender === "male" ? "/male.svg" : "/female.svg"}
              alt="profile-icon"
            />
          </div>
          <div className="flex justify-evenly items-center my-2 gap-x-4">
          <Link className="my-1 bg-yellow-500 font-sans rounded-lg px-4 py-2 text-md hover:bg-yellow-400" href={"/edit-profile"}>Edit Profile</Link>
          <Link className="my-1 bg-sky-500 font-sans rounded-lg px-4 py-2 text-md hover:bg-sky-400" href={"/change-password"}>Change Password</Link>
          </div>
        </div>
        <div className="flex flex-col p-4 my-2 space-y-4">
          <div className="p-4 font-sans text-xl border border-black rounded-md">
            Name : <span className="font-bold">{userInfo.name}</span>
          </div>
          <div className="p-4 font-sans text-xl border border-black rounded-md">
            bio :{" "}
            <span className="font-bold">
              {userInfo.bio ? userInfo.bio : "Not added yet ❗"}
            </span>
          </div>
          <div className="p-4 font-sans text-xl border border-black rounded-md">
            gender : <span className="font-bold">{userInfo.gender}</span>
          </div>
          <div className="p-4 font-sans text-xl border border-black rounded-md">
            email : <span className="font-bold">{userInfo.email}</span>
          </div>
          <div className="p-4 flex font-sans text-xl border border-black rounded-md">
            current Learning Points :{" "}
            <span className="font-bold flex items-center">
              <BookAIcon />
              {userInfo.learningPoints}
            </span>
          </div>
        </div>
      </div>
      <div>
        <h1 className="flex justify-center items-center text-2xl font-semibold">
          Courses you're enrolled in
        </h1>
        <div className="container mx-auto p-10">
          {userInfo.purchasedCourses && userInfo.purchasedCourses.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
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
            <div className="flex justify-center items-center font-bold text-3xl">
              You haven't purchased any course yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
