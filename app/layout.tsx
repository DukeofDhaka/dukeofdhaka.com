import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import { site } from "@/lib/content";
import "./globals.css";

/* Clash Display by Indian Type Foundry, via Fontshare (ITF Free Font License —
   free for personal & commercial use, self-hosted here). */
const clash = localFont({
  src: [
    { path: "./fonts/ClashDisplay-Medium.woff2", weight: "500" },
    { path: "./fonts/ClashDisplay-Semibold.woff2", weight: "600" },
    { path: "./fonts/ClashDisplay-Bold.woff2", weight: "700" },
  ],
  variable: "--font-clash",
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
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tahsin Fatin — Duke of Dhaka",
    description:
      "Analytics, machine learning, and things built between Dhaka and Montréal.",
    url: "https://dukeofdhaka.com",
    siteName: "Duke of Dhaka",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tahsin Fatin — Duke of Dhaka",
    description:
      "Analytics, machine learning, and things built between Dhaka and Montréal.",
    images: ["/og.png"],
  },
};

// Structured data so search engines can connect the name, schools and profiles.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.alias,
  url: site.domain,
  image: `${site.domain}/og.png`,
  email: `mailto:${site.email}`,
  jobTitle: "Master of Management in Analytics candidate",
  address: { "@type": "PostalAddress", addressLocality: "Montréal", addressCountry: "CA" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "McGill University" },
    { "@type": "CollegeOrUniversity", name: "Saint Mary's University" },
  ],
  sameAs: [site.github, site.linkedin],
  knowsAbout: ["Data analytics", "Machine learning", "Capital markets", "Python", "SQL"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${clash.variable} ${geist.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
