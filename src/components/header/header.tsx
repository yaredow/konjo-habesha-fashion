"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import {
  HiOutlineHome,
  HiOutlinePhoneOutgoing,
  HiOutlineShoppingBag,
} from "react-icons/hi";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";

import Image from "next/image";
import Logo from "../../../public/images/logo/logo.png";
import { FaArrowRightLong } from "react-icons/fa6";
import NavLink from "./NavLink";
import { navLinks } from "@/lib/utils/constants";
import { ModeToggle } from "../DarkModeToggle";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useState } from "react";
import SearchBar from "../search-bar/SearchBar";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

function Header() {
  const { data: session, status } = useSession();
  const [searchFormOpen, setSearchFormOpem] = useState(false);
  const handleToggleSearchForm = () => {
    setSearchFormOpem((searchFormOpen) => !searchFormOpen);
  };

  return (
    <nav className="sticky inset-0 inset-y-0 right-0 z-10 w-full border-b bg-white px-[10px] md:px-12 ">
      <div className="flex items-center justify-between">
        <Link href="/" className="hidden p-1.5 md:flex">
          <Image
            src={Logo}
            alt="An animated habesha women wearing traditiona cloth"
            width={64}
            height={64}
            priority
          />
        </Link>

        <div className=" hidden font-nav md:flex">
          <ul className="flex gap-[1.3rem]">
            {navLinks.map((navLink, index) => (
              <li key={index}>
                <NavLink href={navLink.path}>{navLink.name}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden gap-8 md:flex md:justify-end">
          <div className=" mt-[6px] flex flex-row gap-[1.3rem]">
            <AiOutlineSearch
              onClick={handleToggleSearchForm}
              className=" text-xl font-semibold hover:text-blue-500"
            />

            <Link href="/account">
              {status === "authenticated" ? (
                <button onClick={() => signOut()}>Log out</button>
              ) : (
                <AiOutlineUser className=" text-xl hover:text-blue-500 " />
              )}
            </Link>

            <Link href="#">
              <AiOutlineShoppingCart className=" text-xl font-semibold hover:text-blue-500" />
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

        <div className="">
          <Sheet>
            <SheetTrigger asChild>
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mx-2 mt-8 flex flex-col gap-8">
                <div className="flex flex-col items-start justify-center gap-4">
                  <ul className=" flex flex-col gap-8">
                    <li>
                      <Link
                        href="/"
                        className=" base flex flex-row items-center gap-2 font-semibold"
                      >
                        <span>
                          <HiOutlineHome className=" text-xl" />
                        </span>{" "}
                        Home
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/shop"
                        className="flex flex-row items-center gap-2 text-base font-semibold"
                      >
                        <span>
                          <HiOutlineShoppingBag className=" text-xl" />
                        </span>{" "}
                        Shop
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/contact"
                        className="base flex flex-row items-center gap-2 font-semibold"
                      >
                        <span>
                          <HiOutlinePhoneOutgoing className=" text-xl" />
                        </span>{" "}
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className=" w-full border"></div>

                <div className="flex flex-row justify-between">
                  <Link href="/" className="flex items-center gap-2">
                    Log in{" "}
                    <span>
                      <FaArrowRightLong />
                    </span>
                  </Link>
                  <ModeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default Header;
