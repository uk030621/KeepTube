"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const hideNavbarPaths = ["/", "/register", "/success", "/cancel", "/payment"];

  if (!mounted || hideNavbarPaths.includes(pathname)) return null;

  const handleSignOut = async (e) => {
    e.preventDefault();
    setSigningOut(true);
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <header className="bg-purple-600 text-white shadow-md">
      <nav className="flex justify-evenly items-center mx-auto py-2 px-4">
        <ul className="flex justify-between flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide gap-4">
          <li>
            <Link
              href="/"
              className="text-sm sm:text-base md:text-lg lg:text-xl font-medium px-2 py-1 hover:text-yellow-300 hover:underline underline-offset-4"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/youtube"
              className="text-sm sm:text-base md:text-lg lg:text-xl font-medium px-2 py-1 hover:text-yellow-300 hover:underline underline-offset-4"
            >
              YouTube
            </Link>
          </li>
          <li>
            <Link
              href="/customsearch"
              className="text-sm sm:text-base md:text-lg lg:text-xl font-medium px-2 py-1 hover:text-yellow-300 hover:underline underline-offset-4"
            >
              URL
            </Link>
          </li>
          <li>
            <Link
              href="/enhanced"
              className="text-sm sm:text-base md:text-lg lg:text-xl font-medium px-2 py-1 hover:text-yellow-300 hover:underline underline-offset-4"
            >
              Library
            </Link>
          </li>
          <li>
            <Link
              href="#"
              onClick={handleSignOut}
              className="text-sm sm:text-base md:text-lg lg:text-xl font-medium px-2 py-1 cursor-pointer flex items-center hover:text-yellow-300 hover:underline underline-offset-4"
            >
              {signingOut ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
              ) : (
                "Exit"
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
