import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "COCO AI — Correspondence Operations Intelligence",
  description:
    "COCO AI: Searchable. Auditable. Actionable. Shell Corporate Correspondence operations intelligence platform.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="flex h-screen overflow-hidden">
          <div className="hidden shrink-0 md:block">
            <Sidebar />
          </div>
          <div className="flex flex-1 flex-col overflow-hidden">
            <Topbar />
            <main className="flex-1 overflow-y-auto scrollbar-thin bg-background">
              <div className="mx-auto max-w-[1400px] space-y-6 p-4 md:p-6 lg:p-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
