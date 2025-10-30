import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import  Header  from "./components/Header";
import Footer from "./components/Footer";
import LayoutWrapper from "./LayoutWrapper";

const geistSans = ({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const roboto_Mono = Roboto_Mono({
  subsets: ["latin"],
  display:'swap'
});

export const metadata: Metadata = {
  title: "Book Kart",
  description: "this is e-commerce platform where you can buy or shell your used books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={roboto_Mono.className}
      >
        <LayoutWrapper>
        <Header/>
        {children}
        <Footer/>
        </LayoutWrapper>
      </body>
    </html>
  );
}
