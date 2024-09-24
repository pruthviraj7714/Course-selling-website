"use client";

import { ShoppingCartIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { ModeToggle } from "./ThemeSwitchButton";
import { AppMenu } from "./DropDownMenu";
import Image from "next/image";

export default function Appbar() {
  const session = useSession();

  return (
    <div className="bg-gradient-to-l from-slate-900 to-slate-950 dark:bg-white flex justify-between items-center p-4 border-b border-white">
      <Link
        href="/"
        className=" sm:text-sm md:text-lg bg-white p-2 rounded-lg flex items-center font-bold text-xl"
      >
        <Image src="/logo.svg" alt="Logo" width={30} height={30} />{" "}
        <span className="font-mono px-1 dark:text-black"> CourseForge</span>
      </Link>
      <div className="flex items-center space-x-4">
        <Link
          href="/courses"
          className="bg-white dark:bg-black dark:text-white font-semibold hover:bg-zinc-300 border border-black px-4 py-2 rounded-md"
        >
          Courses
        </Link>
        {session.data?.user ? (
          <>
            <Link
              href="/wishlist"
              className="hidden md:flex items-center border bg-white  border-black px-4 py-2 rounded-md dark:bg-black dark:text-white"
            >
              <ShoppingCartIcon />
              <span className="ml-2">Wishlist</span>
            </Link>
            <Link
              href="/my-learnings"
              className="hidden md:block bg-white dark:bg-black dark:text-white font-semibold hover:bg-zinc-300 border border-black px-4 py-2 rounded-md"
            >
              My Learnings
            </Link>
            <Link
              href="/add-course"
              className="hidden md:block bg-white px-4 py-2 rounded-md dark:bg-black dark:text-white font-semibold"
            >
              Add Course
            </Link>
            <AppMenu />
          </>
        ) : (
          <button
            className="px-4 py-2 rounded-md bg-white dark:bg-black dark:text-white font-semibold hover:bg-zinc-300 border border-black"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
        <ModeToggle />
      </div>
    </div>
  );
}
