import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const description =
  "Rochan Shrish Awasthi — applied AI/ML: speech processing, LLMs, computer vision, and geospatial AI.";

export const metadata: Metadata = {
  title: "Rochan Awasthi",
  description,
  openGraph: { title: "Rochan Awasthi", description, type: "website" },
  twitter: { card: "summary", title: "Rochan Awasthi", description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-paper focus:px-3 focus:py-2 focus:text-sm focus:text-blue"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
