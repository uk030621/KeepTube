"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Define the list of paths where the navbar should be hidden
  const hiddenRoutes = ["/upgrade", "/cancel", "/success"];
  const hideNavbar = hiddenRoutes.includes(pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
