import "./globals.css";
import { Providers } from "../providers/Queryprovider";

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
