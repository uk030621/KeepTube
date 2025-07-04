"use client";
import ContactForm from "@/components/ContactForm";
//import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-background background-container">
      <div className="p-4 max-w-3xl mx-auto">
        {/*<Link
          className="bg-amber-200 px-4 py-2 mt-2 rounded-lg text-xs"
          href="\mediastart"
        >
          Back To Menu
        </Link>*/}

        <ContactForm />
      </div>
    </div>
  );
}
