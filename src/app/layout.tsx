import "./globals.css";
import type { Metadata } from "next";
import {
  Inter as FontSans,
  League_Spartan,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer/Footer";
import StoreProvider from "@/lib/providers/StoreProvider";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import { AuthProvider } from "@/lib/providers/AuthProvider";
import QueryProviders from "@/lib/providers/QueryProvider";
import NextTopLoader from "nextjs-toploader";
import { cn } from "@/utils/cn";
import Header from "@/components/header";

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
          <StoreProvider>
            <QueryProviders>
              <AuthProvider>
                <div className=" flex flex-col">
                  <NextTopLoader />
                  <Header />
                  <div className="min-h-[90vh] items-center justify-center md:m-12">
                    {children}
                  </div>
                  <Footer />
                  <Toaster />
                </div>
              </AuthProvider>
            </QueryProviders>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
