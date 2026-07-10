import type { Metadata } from "next";
import { Syne, Geist } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dukeofdhaka.com"),
  title: "Tahsin Fatin — Duke of Dhaka",
  description:
    "Analytics, machine learning, and things built between Dhaka and Montréal. Portfolio of Tahsin Fatin, Master of Management in Analytics candidate at McGill University.",
  openGraph: {
    title: "Tahsin Fatin — Duke of Dhaka",
    description:
      "Analytics, machine learning, and things built between Dhaka and Montréal.",
    url: "https://dukeofdhaka.com",
    siteName: "Duke of Dhaka",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${geist.variable}`}>
      <body>{children}</body>
    </html>
  );
}
