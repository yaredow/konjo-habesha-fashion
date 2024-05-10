"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/images/logo/logo.png";
import NavLink from "./NavLink";
import { ModeToggle } from "../DarkModeToggle";
import { useAppSelector } from "@/store/hooks";
import { getTotalCartQuantity } from "@/store/slices/cartSlice";
import Search from "../Search";
import { NAV_LINKS } from "@/utils/constants";
import AvatarPlaceholder from "@/assets/User-Profile-PNG (1).png";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { HomeIcon, MenuIcon, Phone, ShoppingBag } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const cartQuantity = useAppSelector(getTotalCartQuantity);

  const handleLogout = () => {
    signOut({ callbackUrl: "http://localhost:3000" });
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
            {NAV_LINKS.map((navLink, index) => {
              const isAdmin = session?.user.role == "ADMIN";
              const isAdminPath = navLink.path === "/admin/dashboard";
              if (isAdminPath && !isAdmin) {
                return null;
              }
              return (
                <li key={index}>
                  <NavLink href={navLink.path}>{navLink.name}</NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hidden gap-6 md:flex md:justify-end">
          <div className=" flex flex-row gap-[1.3rem]">
            <Search />
            <div className=" mt-[4px]">
              <ModeToggle />
            </div>
            <div className=" relative flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Link href="/cart">
                  <ShoppingCart
                    strokeWidth={1.5}
                    className=" h-[20px] w-[20px]"
                  />
                </Link>
              </Button>

              {cartQuantity > 0 && (
                <div className=" absolute bottom-[26px] left-[26px] flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white shadow-md">
                  {cartQuantity}
                </div>
              )}
            </div>
            <div className=" flex flex-row items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    onClick={() => {
                      if (status === "unauthenticated") {
                        router.replace("/auth/signin");
                      }
                    }}
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                  >
                    <Image
                      src={session?.user.image || AvatarPlaceholder}
                      alt="User profile picture"
                      width={50}
                      height={50}
                      className="aspect-square rounded-full bg-background object-cover"
                    />
                  </Button>
                </DropdownMenuTrigger>
                {status === "authenticated" ? (
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {session.user ? session.user?.name : "Your Account"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/profile/dashboard">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/profile/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                ) : null}
              </DropdownMenu>
            </div>
          </div>
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
                          <HomeIcon className=" text-xl" />
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
                          <ShoppingBag className=" text-xl" />
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
                          <Phone className=" text-xl" />
                        </span>{" "}
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className=" w-full border"></div>

                <div className="flex flex-row justify-between">
                  <Link href="/auth/signin" className="flex items-center gap-2">
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
