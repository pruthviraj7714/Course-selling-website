"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link";

export default function Appbar() {
  const session = useSession(); 

    return <div className='bg-gradient-to-l from-slate-900 to-slate-950 flex justify-between items-center p-4 border-b-2 border-black'>
    <Link href='/' className="text-white">
        Logo
    </Link>
    {session.data?.user ? (
     <>
      <Link href={'/add-course'} className="text-white">
          Add Course
        </Link>
        <button className="px-4 py-1 rounded bg-white font-semibold" onClick={() => signOut()}>
          Logout
        </button>
     </>

    ) : (
      <button className="px-4 py-1 rounded bg-white font-semibold" onClick={() => signIn()}>
          Sign In
      </button>
    )}
    <Link href={'/courses'} className="bg-white font-semibold hover:bg-zinc-300 border border-black px-4 py-2">
      Courses
    </Link>
    <div className="text-white"> 
      Hello
    </div>
  </div>
}