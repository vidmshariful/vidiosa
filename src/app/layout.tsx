import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://vidiosa.com";
const title = "Vidiosa: your SaaS video team, every week";
const description =
  "One plan, a full video team. Vidiosa plans, makes and ships product and founder videos for SaaS teams every week. No hiring, no salaries, no managing.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · Vidiosa",
  },
  description,
  keywords: [
    "SaaS video production subscription",
    "product videos for SaaS",
    "SaaS explainer video",
    "feature launch video",
    "founder video content",
  ],
  authors: [{ name: "Vidiosa", url: siteUrl }],
  creator: "Vidiosa",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Vidiosa",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
