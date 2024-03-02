'use client';

import { useMediaQuery } from '@/hook/use-media-query';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '../ui/drawer';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { CiSearch, CiShoppingCart, CiUser } from 'react-icons/ci';
import { IconType } from 'react-icons';
import { ModeToggle } from '../dark-mode-toggle';
import Image from 'next/image';
import Logo from '../../../public/images/logo/logo.png';
import NavLink from './nav-link';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoHomeOutline, IoShapesOutline} from 'react-icons/io5';

const navLinks: string[] = ['/', 'shop', 'contact'];
const NavLinkIcons: IconType[] = [IoHomeOutline, IoShapesOutline];

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
          <div className="flex mt-16 mx-4 gap-4 flex-col">
            <div className="flex justify-center flex-col gap-4 items-start">
              <div className=" flex">
                <ul className=" flex flex-col gap-8">
                  {navLinks.map((navLink, index) => (
                    <li key={index}>
                       {NavLinkIcons[index] && <NavLinkIcons[index] />}
                      <NavLink href={navLink}>
                        {navLink.startsWith('/')
                          ? 'Home'
                          : navLink.charAt(0).toUpperCase() + navLink.slice(1)}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className=" border w-full"></div>

            <div className=" mt-4 flex flex-row justify-between">
              <Link href="#" className=" flex gap-2 items-center">
                Log in{' '}
                <span>
                  <FaArrowRightLong />
                </span>
              </Link>
              <ModeToggle />
            </div>
          </div>
          <DrawerClose />
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default Header;
