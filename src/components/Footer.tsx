import { Button } from "@/components/ui/button";
import { Globe2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col w-full bg-gradient-to-l from-slate-900 to-slate-950 text-white p-8">
      <div className="flex justify-between my-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 text-sm font-serif">
          <ul>
            <li className="hover:underline cursor-pointer">Get the app</li>
            <li className="hover:underline cursor-pointer">About us</li>
            <li className="hover:underline cursor-pointer">contact us</li>
          </ul>
          <ul>
            <li className="hover:underline cursor-pointer">Help and support</li>
            <li className="hover:underline cursor-pointer">Careers</li>
          </ul>
          <ul>
            <li className="hover:underline cursor-pointer">Terms</li>
            <li className="hover:underline cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
        <div>
          <Button>
            <Globe2Icon />
            <h2 className="ml-2">English</h2>
          </Button>
        </div>
      </div>
      <div className="flex justify-between my-4">
      <Link href="/" className=" bg-white  p-2 rounded-lg flex items-center font-bold text-xl">
        <Image  src='/logo.svg' alt="Logo" width={30} height={30} /> <span className="font-mono px-1 text-black dark:text-black"> CourseForge</span>
      </Link>
        <div>
          <p className="text-sm">© 2024 Edx, Inc.</p>
        </div>
      </div>
    </div>
  );
}
