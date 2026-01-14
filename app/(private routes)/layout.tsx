// app/(private routes)/layout.tsx
'use client';

import { usePathname } from 'next/navigation';
import SideBar from '@/components/SideBar/SideBar';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  const pathname = usePathname();
  const showSidebar = pathname !== '/profile/edit';
  const showBreadcrumbs = pathname !== '/profile/edit';

  return (
    <div className="layout-container">
      <div className="main-content-container">
        {showSidebar && <SideBar />}
        {showBreadcrumbs && <Breadcrumbs />}
        {children}
      </div>
    </div>
  );
}
