import { Cormorant_Garamond, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import HeaderNav from "./HeaderNav";
import FooterBar from "./FooterBar"; // ← ADDED

const corm_gara = Cormorant_Garamond({
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={`${corm_gara.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <HeaderNav />
          {/* content */}
          {children}
          <FooterBar /> {/* ← ADDED: thin smoky glass footer with off-white text */}
        </Providers>
      </body>
    </html>
  );
}
