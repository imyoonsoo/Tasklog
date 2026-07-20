import type { Metadata } from "next";

import "./globals.css";
import { Providers } from "../providers/Queryprovider";

export const metadata: Metadata = {
  title: "Tasklog",
  description: "Tasklog",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-background custom-scrollbar">
        <Providers>
          {children}
          {modal}
        </Providers>
      </body>
    </html>
  );
}
