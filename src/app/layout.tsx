import type { Metadata } from "next";
import {
  Inter as FontSans,
  League_Spartan,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import StoreProvider from "@/lib/providers/StoreProvider";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import { AuthProvider } from "@/lib/providers/AuthProvider";
import QueryProviders from "@/lib/providers/QueryProvider";
import { CartProvider } from "@/lib/context/CartContext";
import { cn } from "@/utils/cn";

const league_spartan = League_Spartan({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-league-spartan",
});

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Konjo habesha fashion",
  description: "The best habesha attire shop in Addis",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${league_spartan.variable} ${plus_jakarta_sans.variable}`}
    >
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <StoreProvider>
              <QueryProviders>
                <CartProvider>
                  <div className=" flex flex-col">
                    <Header />
                    <div className="flex items-center justify-center p-6">
                      {children}
                    </div>
                    <Footer />
                    <Toaster />
                  </div>
                </CartProvider>
              </QueryProviders>
            </StoreProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
