import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SplashScreen from "@/components/SplashScreen.jsx";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "@/components/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Elegance Essence | Luxury Fragrances",
  description: "Discover your signature scent with Elegance Essence.",
};

export default function RootLayout({
  children,
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="google-site-verification" content="XAJANY0xQmGXtnRnHess90DNx3IogphUtTQk-0_LmT4" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans selection:bg-primary/20 selection:text-primary`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CartProvider>
              <SplashScreen />
              <Navbar />
              {children}
              <Footer />
              <CartDrawer />
            </CartProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
