// app/layout.tsx
import ThemeProviderClient from "@/components/ThemeProviderClient";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { Geist, Geist_Mono } from "next/font/google";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
import "./globals.css";

import { Navigation } from "@/components/navigation/NavigationBar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-900 dark:bg-neutral-950`}
      >
        <ThemeProviderClient>
          <Navigation />
          <StarsBackground className="fixed inset-0 -z-10" />
          {children}
        </ThemeProviderClient>
      </body>
    </html>
  );
}
