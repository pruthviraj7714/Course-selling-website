"use client";

import { ShoppingCartIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ModeToggle } from "./ThemeSwitchButton";
import { AppMenu } from "./DropDownMenu";

export default function Appbar() {
  const session = useSession();

  return (
    <div className=" dark:bg-white bg-gradient-to-l from-slate-900 to-slate-950 flex justify-between items-center p-4 border-b-2 border-white">
      <Link href="/" className="text-white">
        Logo
      </Link>
      {session.data?.user ? (
        <>
          <Link
            href={"/add-course"}
            className="bg-white px-3 py-1 rounded-md dark:bg-black dark:text-white"
          >
            Add Course
          </Link>
        </>
      ) : (
        <button
          className="px-4 py-1 rounded bg-white font-semibold"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      )}
      <Link
        href={"/courses"}
        className="bg-white font-semibold hover:bg-zinc-300 border border-black px-4 py-2 "
      >
        Courses
      </Link>
      <Link
        href={"/wishlist"}
        className="flex  border bg-white border-white px-2 py-1 dark:bg-black dark:text-white"
      >
        <ShoppingCartIcon />
        <span className="ml-1">Wishlist</span>
      </Link>
      <Link
        href={"/my-courses"}
        className="bg-white font-semibold hover:bg-zinc-300 border border-black px-4 py-2"
      >
        My Learnings
      </Link>
      <ModeToggle />
      <AppMenu />
    </div>
  );
}
