"use client";

import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const Signin = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const signInSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "password must be at least of 6 characters" }),
  });

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({
    email,
    password,
  }: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    try {
      await signIn("credentials", {
        email,
        password,
      });
    } catch (error: any) {
      toast({
        title: "signin Failed",
        description: error.response.data.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-primary-foreground dark:bg-primary-background">
      <div className="flex flex-col p-4 text-center text-black dark:text-white">
        <h1 className="font-bold text-3xl">Sign In</h1>
        <p className="font-semibold">Sign in with your credentials</p>
      </div>
      <div className="w-full md:w-1/3 rounded-xl mx-auto p-6 border-2 bg-white dark:bg-gray-800 dark:text-white text-black border-gray-300 dark:border-gray-700 shadow-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="tony@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={`w-full ${isLoading ? "opacity-25" : ""}`}
            >
              {isLoading ? (
                <>
                  <Image src="/spinner.svg" alt="/" width={24} height={24} />
                  <span className="ml-1">Loading...</span>
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center my-2">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline font-serif">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
