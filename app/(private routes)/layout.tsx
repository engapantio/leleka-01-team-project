// app/(private routes)/layout.tsx
'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import SideBar from '@/components/SideBar/SideBar';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Header from '@/components/Header/Header';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import css from "./Layout.module.css"
interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  const pathname = usePathname();
  const showSidebar = pathname !== '/profile/edit';
  const showBreadcrumbs = pathname !== '/profile/edit';
  const showGreetingBlock = pathname !== '/profile' && pathname !== '/profile/edit';
  const showHeader = pathname !== '/profile/edit';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={css.layoutContainer}>
      {showHeader && <Header onMenuClick={() => setIsSidebarOpen(true)} />}
      {showSidebar && <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
      <div className={css.mainContentContainer}>
        {showBreadcrumbs && <Breadcrumbs />}
        {showGreetingBlock && <GreetingBlock />}
        {children}
      </div>
    </div>
  );
}
