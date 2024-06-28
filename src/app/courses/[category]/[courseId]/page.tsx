"use client";

import { getCourseInfo } from "@/actions/getCourseInfo";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Clock10, Star, UserRound, VideoIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CoursePage({ params }: { params: any }) {
  const [courseData, setCourseData] = useState<any>({});
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const { toast } = useToast();

  const session = useSession();

  const addCoursetoWishList = async () => {
    try {
      const res = await axios.post("/api/wishlist", {
        courseId: params.courseId,
      });

      setIsInWishlist(true);
      toast({
        title: "Success",
        description: "Course is successfully added to wishlist",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "error",
        description: error.message,
      });
    }
  };
  const removeFromWishlist = async () => {
    try {
      const res = await axios.delete("/api/wishlist", {
        params: {
          courseId: params.courseId,
        },
      });

      setIsInWishlist(false);

      toast({
        title: "Success",
        description: "Course is successfully removed from wishlist",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "error",
        description: error.message,
      });
    }
  };
  const purchaseCoures = async () => {
    try {
      await axios.post("/api/purchase-course", {
        courseId: params.courseId,
      });
      setIsPurchased(true);
      toast({
        title: "Course purchased successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong",
        description: error.message,
      });
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      if (params && params.courseId) {
        try {
          const data = await getCourseInfo({ courseId: params.courseId });
          setCourseData(data);
        } catch (error) {
          toast({
            variant: "destructive",
            description: "Error fetching course information.",
          });
        }
      } else {
        console.error("Course ID is undefined");
      }
    };

    const getWslinfo = async () => {
      try {
        const res = await axios.get("/api/wishlist", {
          params: {
            courseId: params.courseId,
          },
        });
        setIsInWishlist(res.data.isInWishlist);
      } catch (error: any) {
        console.log(error);
      }
    };

    const getPurchaseInfo = async () => {
      try {
        const res = await axios.get("/api/purchase-course", {
          params: {
            courseId: params.courseId,
          },
        });
        setIsPurchased(res.data.isCoursePurchased);
      } catch (error) {
        console.log(error);
      }
    };

    getWslinfo();
    getInfo();
    getPurchaseInfo();
  }, [params, isInWishlist, isPurchased]);

  return (
    <div className="bg-gradient-to-t from-slate-800 to-slate-950">
      <div className="w-full bg-gradient-to-br from-slate-400 to-slate-600 ">
        <div className="flex justify-center items-center p-10">
          <div className="border-2 border-white dark:bg-black bg-pink-300 min-w-4xl py-7">
            <div className="flex justify-evenly items-center gap-x-7 p-10">
              <div className="flex flex-col space-y-4">
                <h1 className="text-5xl mr font-extrabold my-3">
                  {courseData.title}
                </h1>
                <p className="text-lg">{courseData.description}</p>
                <div>
                  <div className="px-3 py-1 bg-yellow-300 w-24 font-serif">
                    <p className="text-center">Bestseller</p>
                  </div>
                </div>
                <div>
                  <Star />
                </div>
                <div className="my-2 text-sm">
                  Created by
                  <span className="text-violet-600 underline ml-1">
                    {courseData.instructor}
                  </span>
                </div>
                <div className="flex gap-1">
                  <UserRound /> {courseData.studentsEnrolledCount}+ students
                  enrolled
                </div>
                <div className="flex gap-1">
                  <VideoIcon /> {courseData.duration} hours on-demand video
                </div>
                <div className="flex gap-1">
                  <Clock10 /> Created At {courseData.createdAt?.split("T")[0]}
                </div>
              </div>
              <div>
                <img
                  className="border-2 border-white"
                  src={courseData.thumbnail}
                  alt={courseData.title}
                />
              </div>
            </div>
            {session.data?.user ? (
              <div>
                <div className="flex justify-evenly items-center">
                  {isInWishlist ? (
                    <Button
                      variant={"destructive"}
                      onClick={removeFromWishlist}
                    >
                      Remove from wishlist
                    </Button>
                  ) : (
                    <Button onClick={addCoursetoWishList}>
                      Add to wishlist
                    </Button>
                  )}
                  {isPurchased ? (
                    <Button variant={"outline"} className="bg-green-400">
                      View Content
                    </Button>
                  ) : (
                    <Button
                      onClick={purchaseCoures}
                    >
                      {" "}
                      Buy Course{" "}
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <Link href="/signin">
                  <Button>Login to Continue</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
