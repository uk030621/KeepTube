//app/success/page.js
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SuccessPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleClick = () => {
    setFadeOut(true);
    setIsLoading(true);
    setTimeout(() => {
      router.push("/mediastart");
    }, 600); // Allow fade-out animation to complete before navigating
  };

  return (
    <div
      className={`p-10 text-center background-container bg-background transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <h1 className="text-3xl font-bold text-green-600">Thank you!</h1>
      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 mt-2">
        Payment Successful.
      </p>
      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 mt-8">
        You Now Have Full Access To Your Media Library
      </p>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleClick}
          disabled={isLoading}
          className={`flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-all ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          )}
          {isLoading ? "Loading..." : "Home"}
        </button>
      </div>
    </div>
  );
}
