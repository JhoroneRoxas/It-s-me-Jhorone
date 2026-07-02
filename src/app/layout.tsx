import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { NoiseOverlay } from "@/components/overlays/NoiseOverlay";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "YNZER — Jhorone",
  description:
    "Music enthusiast & learner. Passionate about OPM, instruments, and creative development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable}`}
      >
        <NoiseOverlay />
        {children}
      </body>
    </html>
  );
}
