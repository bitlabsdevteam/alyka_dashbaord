
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ReactQueryProvider } from '@/components/providers/react-query-provider';
import { LanguageProvider } from '@/context/language-context'; // Import LanguageProvider
import { Geist } from 'next/font/google';
import { Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Alyka',
  description: 'AI-Powered Trend Analysis and Sales Forecasting for B2B Apparel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>
          <LanguageProvider> {/* Wrap children with LanguageProvider */}
            {children}
            <Toaster />
          </LanguageProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
