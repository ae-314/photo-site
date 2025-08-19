import { Tinos, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import HeaderNav from "./HeaderNav";

const tinos = Tinos({
  variable: "--font-main",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Photography Portfolio",
  description: "Astro · Natur und Landschaft · Tiere",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={`${tinos.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <HeaderNav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
