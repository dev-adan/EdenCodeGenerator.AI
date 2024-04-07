import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@tldraw/tldraw/tldraw.css';
const inter = Inter({ subsets: ["latin"] });
import Providers from "./Provider";


export const metadata: Metadata = {
  title: "EdenCodeGenerator.AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}><Providers>{children}</Providers></body>
    </html>
  );
}
