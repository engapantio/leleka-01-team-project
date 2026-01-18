import type { Metadata } from 'next';
import { Lato, Comfortaa } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import LayoutClient from './layoutClient';
import './globals.css';

const latoSans = Lato({
  variable: '--font-family',
  weight: ['400', '700'],
  subsets: ['latin-ext', 'latin'],
  display: 'swap',
});

const comfortaaBold = Comfortaa({
  variable: '--second-family',
  weight: ['700'],
  subsets: ['latin-ext', 'latin', 'cyrillic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Лелека',
  description: 'Track your pregnancy journey with LELEKA',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="uk">
      <body className={`${latoSans.variable} ${comfortaaBold.variable}`}>
        <TanStackProvider>
          <LayoutClient>{children}</LayoutClient>
        </TanStackProvider>
      </body>
    </html>
  );
}
