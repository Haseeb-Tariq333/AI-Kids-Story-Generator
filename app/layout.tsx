import type { Metadata } from "next";
import {Nunito} from "next/font/google"
import "./globals.css";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";

const appFont = Nunito({subsets: ["latin"]});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Story Yetu",
  description: "Get the best from our AI stories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={appFont.className}>
          <Provider>{children}</Provider>
        </body>
      </html>
      </ClerkProvider>
  );
}
