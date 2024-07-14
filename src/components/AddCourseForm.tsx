"use client";

import { CourseSchema } from "@/schemas/courseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { CATEGORIES } from "@/constants/Icategories";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

export default function AddCourseForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof CourseSchema>>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      duration: "",
      thumbnail: "",
      category: "",
      instructor: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof CourseSchema>) => {
    setIsLoading(true);
    try {
      await axios.post("/api/add-course", data);
      router.push("/courses");
      toast({
        title: "Course is successfully added",
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: error.response.data.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-4 bg-gray-100 dark:bg-gray-900 py-6">
      <div className="p-4 text-4xl text-black dark:text-white my-3">
        Add Course Here
      </div>
      <div className="w-3/4 mx-auto p-6  rounded-xl shadow-2xl bg-white border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-6 lg:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-white">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black dark:text-white"
                      placeholder="Enter name of the Course"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-white">
                    Price
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="text-black dark:text-white"
                      placeholder="Enter Price of the course"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-white">
                    Category
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Category for your course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category.name} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instructor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-white">
                    Instructor
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black dark:text-white"
                      placeholder="Enter name of the instructor of the course"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-white">
                    Thumbnail
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black dark:text-white"
                      placeholder="Enter the url for the thumbnail of the course"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-white">
                    Duration
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black dark:text-white"
                      placeholder="Enter total duration of the course in hr"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="lg:col-span-2">
                  <FormLabel className="text-black dark:text-white">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="text-black dark:text-white"
                      placeholder="Enter description of the course"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center items-center lg:col-span-2">
              <Button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-600 text-white py-2 px-6 rounded ${
                  isLoading ? "opacity-25" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <Image
                      src="/spinner.svg"
                      alt="Loading..."
                      width={24}
                      height={24}
                    />
                    <span className="ml-1">Loading...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
