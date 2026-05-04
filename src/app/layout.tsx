import "./globals.css";

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
        {children}
        {modal}
      </body>
    </html>
  );
}
