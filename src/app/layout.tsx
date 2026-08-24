import type { Metadata } from "next";
import { Outfit, Montserrat, Caveat, Bebas_Neue } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700", "800", "900"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["700"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Nippon Toyota | Official Toyota Dealer in Kerala",
  description: "Welcome to Nippon Toyota. Explore the latest Toyota cars, book a test drive, and get the best deals on your next vehicle in Kerala.",
  keywords: ["Toyota", "Nippon Toyota", "Toyota Dealer Kerala", "Fortuner", "Innova", "Buy Toyota"],
  openGraph: {
    title: "Nippon Toyota | Official Toyota Dealer",
    description: "Welcome to Nippon Toyota. Explore the latest Toyota cars, book a test drive, and get the best deals on your next vehicle.",
    url: "https://www.nippon-toyota.com",
    siteName: "Nippon Toyota",
    images: [
      {
        url: "/nippon-toyota.png",
        width: 800,
        height: 600,
        alt: "Nippon Toyota Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nippon Toyota | Official Toyota Dealer",
    description: "Welcome to Nippon Toyota. Explore the latest Toyota cars and book a test drive today.",
    images: ["/nippon-toyota.png"],
  },
  icons: {
    icon: "/nippon-toyota.png",
    shortcut: "/nippon-toyota.png",
    apple: "/nippon-toyota.png",
  },
};

import GlobalLeadModal from "@/components/GlobalLeadModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${montserrat.variable} ${caveat.variable} ${bebas.variable} h-full antialiased overflow-x-hidden w-full`}
    >
      <body className="min-h-full flex flex-col font-sans text-gray-800 bg-[#111] overflow-x-hidden w-full">
        <GlobalLeadModal />
        {children}
      </body>
    </html>
  );
}
