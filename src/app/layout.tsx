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
  metadataBase: new URL("https://portfolio-sehaj64s-projects.vercel.app"),
  title: "Sehaj Kumar | Data Analytics Portfolio",
  description: "SQL, Python, Power BI and Tableau projects exploring retail profitability, customer churn, data quality and AI prototypes.",
  openGraph: {
    title: "Sehaj Kumar | Data Analyst Portfolio",
    description: "Project findings, dashboards, source code and working demos.",
    url: "https://portfolio-sehaj64s-projects.vercel.app",
    siteName: "Sehaj Kumar Portfolio",
    images: [
      {
        url: "/projects/consumer-complaints.png",
        width: 1203,
        height: 670,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sehaj Kumar | Data Analyst Portfolio",
    description: "SQL, Python, Power BI and Tableau project case studies.",
    images: ["/projects/consumer-complaints.png"],
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
