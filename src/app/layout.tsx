import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/header';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Konjo habesha fashion',
  description: 'The best habesha attire shop in Addis',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className=" flex min-h-screen flex-col">
            <Header />
            <div className="mx-auto my-8 w-[90%] flex-grow">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
