"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function MainLoginForm() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn("google");
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-purple-500 p-4 pt-6">
      <div className="shadow-2xl p-8 rounded-2xl border-t-4 border-blue-600 max-w-md w-full text-center bg-purple-200 animate-fade-in">
        <h1 className="text-3xl font-extrabold mb-4 text-blue-800 animate-bounce">
          Welcome
          <br />
          <span className=" text-base sm:text-xl md:text-2xl lg:text-3xl">
            to
          </span>
          <br />
          <span className="text-purple-600">Media Library</span>
        </h1>

        <div className="flex justify-center mb-6 h-[140px]">
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <Image
              src="/MediaLibrary.png"
              alt="App preview"
              width={140}
              height={140}
              className="rounded-xl shadow-md"
            />
          )}
        </div>

        <p className="text-gray-700 text-base mb-3 leading-relaxed">
          📥 Enjoy a clean, ad-free experience while downloading and managing
          your media.
        </p>
        <p className="text-gray-700 text-base mb-4">
          🚀 Seamless access, instant tools, zero clutter — built for speed &
          simplicity.
        </p>

        <div className="bg-blue-100 text-blue-900 p-3 rounded-md shadow-sm mb-6 transition-transform duration-500 hover:scale-105">
          <p className="font-medium">
            🎁 Start with{" "}
            <span className="font-bold">3 complimentary visits</span>
          </p>
          <p className="text-sm">
            💎 Then unlock full access for only{" "}
            <span className="font-bold">£2.99</span>
          </p>
        </div>

        <button
          type="button"
          onClick={handleSignIn}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md flex items-center justify-center transition-transform duration-300 hover:scale-105"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Signing In...
            </>
          ) : (
            <>
              <Image
                src="/G.png"
                alt="Google logo"
                width={26}
                height={26}
                className="rounded-md mr-2"
              />
              Sign In with Google
            </>
          )}
        </button>

        <p className="mt-4 text-sm text-gray-700">
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

      <style jsx>{`
        @keyframes limitedBounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .custom-bounce {
          animation: limitedBounce 0.6s ease-in-out 3;
        }
      `}</style>
    </div>
  );
}
