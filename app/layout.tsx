import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
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
    <html lang="en" className={`${fraunces.variable} ${grotesk.variable}`}>
      <body className="grain">{children}</body>
    </html>
  );
}
