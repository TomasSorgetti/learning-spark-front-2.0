import localFont from "next/font/local";
import "./globals.css";
import AppProvider from "@/providers/AppProvider";
import { LoadingBar } from "@/components/ui";
import { Navbar } from "@/components/layout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Learning Spark",
  description: "todo description",
};

export default function RootLayout({ children }) {
  return (
    <AppProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <LoadingBar />
          <Navbar />
          {children}
        </body>
      </html>
    </AppProvider>
  );
}
