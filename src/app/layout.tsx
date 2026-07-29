import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://frontstage-three.vercel.app"),
  title: {
    default: "FrontStage — AI Front Desk",
    template: "%s · FrontStage",
  },
  description:
    "A multi-tenant AI front desk for local service businesses. Customers chat with an AI receptionist; owners edit its config from a live dashboard and the agent updates instantly. Built with Next.js, Supabase, and n8n.",
  openGraph: {
    title: "FrontStage — AI Front Desk",
    description:
      "A multi-tenant AI front desk for local service businesses — chat with the live demo.",
    url: "https://frontstage-three.vercel.app",
    siteName: "FrontStage",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FrontStage — AI Front Desk",
    description:
      "A multi-tenant AI front desk for local service businesses — chat with the live demo.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
