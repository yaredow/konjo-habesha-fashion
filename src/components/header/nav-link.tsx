'use client';

import React, { ReactElement } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
  href: string;
  children: string;
};

function NavLink({ href, children }: NavLinkProps) {
  const path: string = usePathname();
  return (
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? ' text-base font-normal leading-6  hover:underline hover:underline-offset-4'
          : ' text-base font-normal leading-6 hover:underline hover:underline-offset-4'
      }
    >
      {children}
    </Link>
  );
}

export default NavLink;
