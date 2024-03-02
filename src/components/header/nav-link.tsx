'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const path: string = usePathname();
  return (
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? ' text-base font-normal leading-6 text-blue-500 dark:text-blue-500 hover:underline hover:underline-offset-4 dark:text-foreground'
          : ' text-base font-normal leading-6 hover:underline hover:underline-offset-4 dark:text-foreground'
      }
    >
      {children}
    </Link>
  );
};

export default NavLink;
