import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const mabryPro = localFont({
  src: [
    {
      path: "./fonts/mabry_pro/MabryPro-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/mabry_pro/MabryPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/mabry_pro/MabryPro-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/mabry_pro/MabryPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/mabry_pro/MabryPro-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-mabry-pro",
});

export const metadata: Metadata = {
  title: "Castello",
  description: "Fresh and delicious food, made with love and the finest ingredients. Order now and experience the taste of Iceland in every bite!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${mabryPro.variable} h-full antialiased`}
    >
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
