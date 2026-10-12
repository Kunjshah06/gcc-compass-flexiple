import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SidebarLayout from "@/components/SidebarLayout";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GCC Compass — Single Source of Truth for India's GCC Ecosystem",
  description: "AI-powered product intelligence platform for India's 2,117+ Global Capability Centres, city benchmarking, and state incentives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.className} min-h-screen antialiased`}
        style={{ backgroundColor: "var(--surface-base)", color: "var(--text-primary)" }}
      >
        <ThemeProvider>
          <SidebarLayout>{children}</SidebarLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
