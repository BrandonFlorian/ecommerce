import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RootStyleRegistry from "./providers";
import NavigationBar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <RootStyleRegistry>
          <NavigationBar />
          {children}
          <Footer />
        </RootStyleRegistry>
      </body>
    </html>
  );
}
