import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { Toaster } from "~/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "丹尼爾的部落格",
  description: "丹尼爾的部落格",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="zh">
      <body className={`font-sans ${inter.variable}`}>
          <Toaster />
          {children}
      </body>
    </html>
  );
}
