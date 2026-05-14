import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const title = "Blueprinter — Turn signals into action";
const description =
  "Realtime e-commerce data. Blueprinter automates how companies gather data from the web by integrating multiple online sources into unified, structured pipelines.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "e-commerce intelligence",
    "web data extraction",
    "competitive monitoring",
    "MAP monitoring",
    "price tracking",
    "brand protection",
    "marketplace data",
    "review analysis",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Blueprinter",
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${montserrat.variable} antialiased`}>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
