import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/contexts/AppContext";

export const metadata: Metadata = {
  title: "Mirror - AI Beauty Life OS",
  description: "Your sleep becomes your beauty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
