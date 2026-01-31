import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/ui/BottomNav";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ServiceWorkerRegister } from "@/components/ui/ServiceWorkerRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FocusBrief",
  description: "Menos ruido, más señal.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FocusBrief",
    startupImage: [
      {
        url: "/splash.png",
        media: "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)"
      }
    ]
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground selection:bg-primary/20`}
      >
        <div className="max-w-md mx-auto min-h-screen bg-background shadow-2xl shadow-black/50 relative overflow-x-hidden border-x border-border/10">
          {/* <Header /> */} {/* Header was not in the original code, commenting out */}
          <main className="pb-24">
            {children}
          </main>
          <BottomNav />
          <CommandPalette />
          <ServiceWorkerRegister />
          <Toaster
            theme="dark"
            position="top-center"
            toastOptions={{
              style: { background: '#121212', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }
            }}
          />
        </div>
      </body>
    </html>
  );
}
