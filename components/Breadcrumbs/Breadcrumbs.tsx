'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import css from './Breadcrumbs.module.css';
type Props = {
  currentLabel?: string;
};

const breadcrumbNameMap: Record<string, string> = {
  '/diary': 'Щоденник',
  '/journey': 'Подорож',
  '/profile': 'Профіль',
};

export default function Breadcrumbs({ currentLabel }: Props) {
  const pathname = usePathname();

  if (pathname.startsWith('/auth')) {
    return null;
  }

  if (pathname === '/') {
    return (
      <nav className={css.breadcrumbs} aria-label="Breadcrumb">
        <ul className={css.breadcrumbsList}>
          <li className={css.item}>
            <Link href="/" className={css.link}>
              Лелека
            </Link>
          </li>
          <li className={css.separatorItem}>
            <svg
              width={24}
              height={24}
              className={css.separatorIcon}
              aria-hidden="true"
              viewBox="0 0 32 32"
            >
              <use href="/sprite.svg#breadcrumbs-icon" />
            </svg>
          </li>
          <li className={css.item}>
            <Link href="/" className={css.current}>
              Miй день
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  const pathSegments = pathname.split('/').filter(Boolean);

  const crumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const isLast = index === pathSegments.length - 1;

    let label = breadcrumbNameMap[href];

    if (!label && isLast && currentLabel) {
      label = currentLabel;
    }
    if (!label) {
      label = segment;
    }

    return { href, label, isLast };
  });

  return (
    <nav className={css.breadcrumbs} aria-label="Breadcrumb">
      <li className={css.item}>
        <Link href="/" className={css.link}>
          Лелека
        </Link>
      </li>

      {crumbs.map(crumb => (
        <React.Fragment key={crumb.href}>
          <li className={css.separatorItem}>
            <svg
              width={24}
              height={24}
              className={css.separatorIcon}
              aria-hidden="true"
              viewBox="0 0 32 32"
            >
              <use href="/sprite.svg#breadcrumbs-icon" />
            </svg>
          </li>

          <li className={css.item}>
            {crumb.isLast ? (
              <span className={css.current}>{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className={css.link}>
                {crumb.label}
              </Link>
            )}
          </li>
        </React.Fragment>
      ))}
    </nav>
  );
}
