import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SplashScreen from "@/components/SplashScreen.jsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Elegance Essence",
  description: "A premium perfume brand.",
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16" },
      { url: "/favicon.ico" },
    ],
    apple: [
      "/icons/touch-icon-iphone.png",
      {
        url: "/icons/touch-icon-ipad.png",
        sizes: "152x152",
      },
      {
        url: "/icons/touch-icon-iphone-retina.png",
        sizes: "180x180",
      },
      {
        url: "/icons/touch-icon-ipad-retina.png",
        sizes: "167x167",
      },
    ],
  },
  manifest: "/manifest.json",
  themeColor: "#000000",
  openGraph: {
    type: "website",
    title: "Elegance Essence",
    description: "A premium perfume brand.",
    url: "https://yourdomain.com",
    images: [
      "https://yourdomain.com/icons/apple-touch-icon.png",
    ],
  },
  twitter: {
    card: "summary",
    title: "Elegance Essence",
    description: "A premium perfume brand.",
    creator: "@DavidWShadow",
    images: [
      "https://yourdomain.com/icons/android-chrome-192x192.png",
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SplashScreen />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
