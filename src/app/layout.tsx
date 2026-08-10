import type { Metadata, Viewport } from "next";
import { Archivo, DM_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = "https://vidiosa.com";
const description =
  "Vidiosa makes animated explainers, product demos, and launch films for SaaS teams. The new site is in the edit — the studio is open.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vidiosa — SaaS videos that educate, engage, and convert",
    template: "%s · Vidiosa",
  },
  description,
  keywords: [
    "SaaS video production",
    "animated explainer video",
    "product demo video",
    "product launch video",
    "video agency for SaaS",
  ],
  authors: [{ name: "Vidiosa", url: siteUrl }],
  creator: "Vidiosa",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Vidiosa",
    title: "Vidiosa — SaaS videos that educate, engage, and convert",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidiosa — SaaS videos that educate, engage, and convert",
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrument.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
