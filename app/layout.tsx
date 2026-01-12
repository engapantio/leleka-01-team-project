import type { Metadata } from 'next';
import { Lato, Comfortaa } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import './globals.css';
import SideBar from '@/components/SideBar/SideBar';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

const latoSans = Lato({
  variable: '--font-family',
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const comfortaaBold = Comfortaa({
  variable: '--second-family',
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Лелека',
  description: 'Pregnancy development control test',
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
          <div className='layout-container'>
              <SideBar/>
              <div className='main-content-container'>
                <Breadcrumbs/>
                {children}
              </div>
          </div>
        </TanStackProvider>
      </body>
    </html>
  );
}
