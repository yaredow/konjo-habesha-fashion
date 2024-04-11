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
import { ModeToggle } from "../DarkModeToggle";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/store/hooks";
import { getTotalCartQuantity } from "@/store/slices/cartSlice";
import { useCart } from "@/lib/context/CartContext";
import Search from "../Search";
import { NAV_LINKS } from "@/utils/constants";

function Header() {
  const { data: session, status } = useSession();
  const [searchFormOpen, setSearchFormOpem] = useState(false);
  const cartQuantity = useAppSelector(getTotalCartQuantity);
  const handleToggleSearchForm = () => {
    setSearchFormOpem((searchFormOpen) => !searchFormOpen);
  };

  return (
    <nav className="sticky inset-0 inset-y-0 right-0 z-10 w-full border-b bg-background px-[10px] text-foreground shadow-md md:px-12 ">
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
            {NAV_LINKS.map((navLink, index) => (
              <li key={index}>
                <NavLink href={navLink.path}>{navLink.name}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden gap-8 md:flex md:justify-end">
          <div className=" mt-[6px] flex flex-row gap-[1.3rem]">
            <Search />
            <div className=" flex flex-row gap-2">
              <Link
                href={
                  status === "authenticated"
                    ? "/account/user-details"
                    : "/account"
                }
              >
                <AiOutlineUser className=" text-xl hover:text-blue-500 " />
              </Link>

              <p
                className={`${status === "unauthenticated" ? "hidden" : "flex"}`}
              >
                {session?.user?.name?.split(" ")[0]}
              </p>
            </div>

            <div className=" relative">
              <Link href="/cart">
                <AiOutlineShoppingCart className=" text-xl font-semibold hover:text-blue-500" />
              </Link>

              {cartQuantity > 0 && (
                <div className=" absolute bottom-5 left-5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white shadow-md">
                  {cartQuantity}
                </div>
              )}
            </div>
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
                  <Link href="/account" className="flex items-center gap-2">
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
