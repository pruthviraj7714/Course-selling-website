"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
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

const SignUp = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const signUpSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Name must be at least of 2 characters" })
      .max(20, { message: "Name cannot be more than 20 characters" }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "password must be at least of 6 characters" }),
  });

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({
    name,
    email,
    password,
  }: z.infer<typeof signUpSchema>) => {
    setIsLoading(true);
    try {
      await axios.post("/api/signup", {
        name,
        email,
        password,
      });

      toast({
        title: "Account Created Successfully",
        description: "Now Sign In with your Credentials",
      });

      router.push("/signin");
    } catch (error: any) {
      console.error(error.message);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-[30%] p-4 shadow-2xl border">
        <div className="text-center flex flex-col my-4">
          <h1 className="font-bold text-3xl">Sign up</h1>
          <p className="font-semibold">Sign up with your Credentials</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Name" {...field} />
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
            <Button type="submit" className={`w-full ${isLoading ? "opacity-25"  : ""}`}>
              {isLoading ? (
                <>
                  <Image src='/spinner.svg' alt="/" width={24} height={24} />
                  <span className="ml-1">Loading...</span>
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center my-2">
          Already have an account?{" "}
          <Link href="/signin" className="underline font-serif">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
