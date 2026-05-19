import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Sehaj Kumar | Data Analyst & BI Specialist",
  description: "Senior Data Analyst specializing in Business Intelligence, Data Warehousing, and Advanced Analytics. Transforming complex data into strategic business value.",
  openGraph: {
    title: "Sehaj Kumar | Data Analyst Portfolio",
    description: "Senior Data Analyst specializing in BI and Data Warehousing.",
    url: "https://sehajkumar.com",
    siteName: "Sehaj Kumar Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sehaj Kumar | Data Analyst Portfolio",
    description: "Senior Data Analyst specializing in BI and Data Warehousing.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geist.variable} ${spaceGrotesk.variable} antialiased selection:bg-emerald-accent selection:text-black`}>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
