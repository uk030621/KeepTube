"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function MainLoginForm() {
  return (
    <div className="grid place-items-start justify-center pt-8 h-screen bg-background ml-3 mr-3">
      <div className="shadow-lg p-6 rounded-lg border-t-4 border-slate-900 max-w-md text-center bg-white">
        <h1 className="text-2xl font-bold mb-4">Welcome to Media Library</h1>
        <div className="flex justify-center mb-4">
          <Image
            src="/MediaLibrary.png" // Replace with your image file in /public
            alt="App preview"
            width={100}
            height={100}
            className="rounded-lg mb-4"
          />
        </div>
        <p className="text-gray-700 text-base mb-4 leading-relaxed">
          Enjoy a clean, ad-free experience while downloading and managing your
          media. Seamless access, instant tools, and zero clutter. Media Library
          makes your media workflow simple and secure.
        </p>
        <p className="text-sm mt-2">Start with 3 complimentary visits.</p>
        <p className="text-sm  mb-4">
          Continue with full access for only £2.99.
        </p>

        <button
          type="button"
          onClick={() => signIn("google")}
          className="text-lg px-4 py-2 bg-blue-700 hover:bg-blue-500 text-white rounded flex items-center justify-center w-full"
        >
          <Image
            src="/G.png"
            alt="Google logo"
            width={30}
            height={30}
            className="rounded-md mr-2"
          />
          Sign In with Google
        </button>

        <p className="mt-4 text-sm text-black">
          Don&apos;t have a Google account?{" "}
          <Link
            href="https://support.google.com/accounts/answer/27441?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Create one here
          </Link>
        </p>
      </div>
    </div>
  );
}
