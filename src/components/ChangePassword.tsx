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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const passwordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
  reNewPassword: z.string(),
});

export default function ChangePassword() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      reNewPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof passwordSchema>) => {
    setIsLoading(true);
    try {
      await axios.post("/api/user/change-password", data);
      toast({
        title: "Password is successfully updated",
      });
      router.push('/profile')
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
    <div className="flex flex-col justify-center items-center h-screen bg-slate-100 dark:bg-slate-900">
  <div className="p-4 text-4xl text-black dark:text-white">
    Change your password here.
  </div>
  <div className="w-1/3 mx-auto p-6 border-2 bg-white dark:bg-slate-800 text-black dark:text-white border-gray-300 dark:border-gray-700 shadow-xl">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black dark:text-white">Old Password</FormLabel>
              <FormControl>
                <Input
                  className="text-black dark:text-white"
                  placeholder="Enter your old password here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black dark:text-white">New Password</FormLabel>
              <FormControl>
                <Input
                  className="text-black dark:text-white"
                  placeholder="Enter new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black dark:text-white">Re-type New Password</FormLabel>
              <FormControl>
                <Input
                  className="text-black dark:text-white"
                  placeholder="Re-type new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={`w-full bg-blue-500 hover:bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-600 text-white py-2 px-4 rounded ${
            isLoading ? "opacity-25" : ""
          }`}
        >
          {isLoading ? (
            <>
              <Image src="/spinner.svg" alt="Loading..." width={24} height={24} />
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
