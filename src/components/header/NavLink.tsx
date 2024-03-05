"use client";

import React, { ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

function NavLink({ href, children }: NavLinkProps) {
  const path: string = usePathname();
  return (
    <Link
      href={href}
      className={` font-nav text-base font-medium leading-6 hover:underline hover:underline-offset-4 ${path === href && "text-blue-500"}`}
    >
      {children}
    </Link>
  );
}

export default NavLink;
