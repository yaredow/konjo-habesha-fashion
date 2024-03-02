'use client';

import { useMediaQuery } from '@/hook/use-media-query';
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { CiSearch, CiShoppingCart, CiUser } from 'react-icons/ci';
import { ModeToggle } from '../dark-mode-toggle';
import Image from 'next/image';
import Logo from '../../../public/images/logo/logo.png';
import { cn } from '@/lib/utils';
import NavLink from './nav-link';

const navLinks = ['/', 'shop', 'contact'];

function Header() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return isDesktop ? (
    <header className="px-6 sticky inset-0 inset-y-0 right-0 z-10 w-full border-b  py-4 md:px-12">
      <nav className="flex items-center justify-between">
        <div className="flex">
          <Link href="/" className="p-1.5">
            <Image
              src={Logo}
              alt="An animated habesha women wearing traditiona cloth"
              width={64}
              height={64}
            />
          </Link>
        </div>

        <div className=" flex">
          <ul className=" flex gap-8">
            {navLinks.map((navLink, index) => (
              <li key={index}>
                <NavLink href={navLink}>
                  {navLink.startsWith('/')
                    ? 'Home'
                    : navLink.charAt(0).toUpperCase() + navLink.slice(1)}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden gap-8 md:flex md:justify-end">
          <div className=" mt-[6px] flex flex-row gap-4">
            <Link href="#">
              <CiSearch className=" text-2xl font-semibold hover:text-blue-500" />
            </Link>

            <Link href="#">
              <CiUser className=" text-2xl hover:text-blue-500 " />
            </Link>

            <Link href="#">
              <CiShoppingCart className=" text-2xl font-semibold hover:text-blue-500" />
            </Link>
          </div>

          <ModeToggle />
        </div>
      </nav>
    </header>
  ) : (
    <div className=" px-6 py-4 flex items-center justify-between ">
      <div>
        <Link href="/">
          <Image src={Logo} alt="Your Company" width={44} height={44} />
        </Link>
      </div>
      <Drawer direction="left">
        <div className=" flex justify-end">
          <DrawerTrigger>
            <MenuIcon />
          </DrawerTrigger>
        </div>
        <DrawerContent>
          <div className="flex mt-8 mx-4 gap-4 flex-col">
            <div className="flex justify-center flex-col gap-4 items-start border-b">
              <Link href="/home">Home</Link>
              <Link href="/shop">Shop</Link>
              <Link href="/contact">Contact</Link>
            </div>

            <div className=" flex flex-row">
              <CiUser className=" text-xl" />
              <ModeToggle />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default Header;
