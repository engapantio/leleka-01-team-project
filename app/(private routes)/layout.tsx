// app/(private routes)/layout.tsx
'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import SideBar from '@/components/SideBar/SideBar';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Header from '@/components/Header/Header';
interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  const pathname = usePathname();
  const showSidebar = pathname !== '/profile/edit';
  const showBreadcrumbs = pathname !== '/profile/edit';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="layout-container">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
         {showSidebar && <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
      <div className="main-content-container">
        {showBreadcrumbs && <Breadcrumbs />}
        {children}
      </div>
    </div>
  );
}
