"use client";

import { ShoppingCartIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ModeToggle } from "./ThemeSwitchButton";
import { AppMenu } from "./DropDownMenu";

export default function Appbar() {
  const session = useSession();

  return (
    <div className="bg-gradient-to-l from-slate-900 to-slate-950 dark:bg-white flex justify-between items-center p-4 border-b-2 border-white">
      <Link href="/" className="text-white dark:text-black font-bold text-xl">
        Logo
      </Link>
      <div className="flex items-center space-x-4">
        <Link
          href="/courses"
          className="bg-white font-semibold hover:bg-zinc-300 border border-black px-4 py-2 rounded-md"
        >
          Courses
        </Link>
        {session.data?.user ? (
          <>
            <Link
              href="/wishlist"
              className="flex items-center border bg-white border-black px-4 py-2 rounded-md dark:bg-black dark:text-white"
            >
              <ShoppingCartIcon />
              <span className="ml-2">Wishlist</span>
            </Link>
            <Link
              href="/my-courses"
              className="bg-white font-semibold hover:bg-zinc-300 border border-black px-4 py-2 rounded-md"
            >
              My Learnings
            </Link>
            <Link
              href="/add-course"
              className="bg-white px-4 py-2 rounded-md dark:bg-black dark:text-white font-semibold"
            >
              Add Course
            </Link>
            <AppMenu />
          </>
        ) : (
          <button
            className="px-4 py-2 rounded-md bg-white font-semibold hover:bg-zinc-300 border border-black"
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
