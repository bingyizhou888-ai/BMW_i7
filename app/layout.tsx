import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import LuckyDraw from "./_components/LuckyDraw";
import WelcomeDialog from "./_components/WelcomeDialog";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BMW i7 | 純電豪華旗艦（練習 Demo）",
  description:
    "BMW i7 車型介紹與試駕預約前端練習頁面，非 BMW 官方網站，僅供開發練習與展示使用。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-TW"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <LuckyDraw />
        <WelcomeDialog />
      </body>
    </html>
  );
}
