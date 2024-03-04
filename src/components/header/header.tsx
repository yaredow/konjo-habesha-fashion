"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../ui/drawer";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import Image from "next/image";
import Logo from "../../../public/images/logo/logo.png";
import { FaArrowRightLong } from "react-icons/fa6";
import NavLink from "./NavLink";
import { ModeToggle } from "../DarkModeToggle";

const navLinks: string[] = ["/", "/shop", "/contact"];

function Header() {
  return (
    <nav className="sticky inset-0 inset-y-0 right-0 z-10 w-full border-b px-[10px] md:px-12 md:py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="hidden p-1.5 md:flex">
          <Image
            src={Logo}
            alt="An animated habesha women wearing traditiona cloth"
            width={64}
            height={64}
          />
        </Link>

        <div className=" hidden md:flex">
          <ul className="flex gap-8">
            {navLinks.map((navLink, index) => (
              <li key={index}>
                <NavLink href={navLink}>
                  {navLink === "/"
                    ? "Home"
                    : navLink.split("/")[1].charAt(0).toUpperCase() +
                      navLink.split("/")[1].slice(1)}
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
      </div>

      <div className="flex items-center justify-between px-6 py-4 md:hidden ">
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
            <div className="mx-4 mt-16 flex flex-col gap-4">
              <div className="flex flex-col items-start justify-center gap-4">
                <ul className=" flex flex-col gap-8">
                  {navLinks.map((navLink, index) => (
                    <li key={index}>
                      <NavLink href={navLink}>
                        {navLink === "/"
                          ? "Home"
                          : navLink.split("/")[1].charAt(0).toUpperCase() +
                            navLink.split("/")[1].slice(1)}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className=" w-full border"></div>

              <div className=" mt-4 flex flex-row justify-between">
                <Link href="#" className=" flex items-center gap-2">
                  Log in{" "}
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
    </nav>
  );
}

export default Header;
