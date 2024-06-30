"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string(),
  bio: z.string(),
  email: z.string().email({ message: "You should use valid email" }),
});

export default function EditProfile() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      bio: "",
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    setIsLoading(true);
    try {
      await axios.post("/api/user/edit-profile", data);
      toast({
        title: "Profile is successfully updated",
      });

      router.push("/profile");
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-primary-foreground dark:bg-primary-background">
      <div className="p-4 text-4xl text-black dark:text-white">
        Edit your profile here
      </div>
      <div className="w-1/3 rounded-xl mx-auto p-6 border-2 bg-white dark:bg-gray-800 dark:text-white text-black border-gray-300 dark:border-gray-700 shadow-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-white">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black dark:text-white"
                      placeholder="Enter the name/Changed name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-white">
                    Bio
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="text-black dark:text-white"
                      placeholder="Enter the bio for your profile"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-white">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black dark:text-white"
                      placeholder="Enter the email/Changed email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={`${
                isLoading ? "opacity-25" : ""
              } w-full bg-blue-500 hover:bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-600 text-white py-2 px-4 rounded`}
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
          </form>
        </Form>
      </div>
    </div>
  );
}
