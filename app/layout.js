import "./globals.css";
import { AuthProvider } from "./providers";
import ClientLayout from "@/components/ClientLayout"; // ✅ Correct path
import AutoLogout from "./autologout/page";

export const metadata = {
  title: "Media Library",
  description: "Developed by LWJ",
  icons: {
    icon: "/icons/icon-512x512.png",
    apple: "/icons/icon-180x180.png",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ClientLayout>
            <AutoLogout />
            {children}
            <footer>
              <p>
                © {new Date().getFullYear()} LWJ Media Library. All rights
                reserved.
              </p>
            </footer>
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
