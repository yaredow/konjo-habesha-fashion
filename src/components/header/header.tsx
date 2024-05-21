
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/images/logo/logo.png";
import NavLink from "./NavLink";
import { ModeToggle } from "../DarkModeToggle";
import Search from "../Search";
import { NAV_LINKS } from "@/utils/constants";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { HomeIcon, MenuIcon, Phone, ShoppingBag } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";
import UserMenu from "../UserMenu";
import { auth } from "@/auth";
import ToggleCart from "../cart/ToggleCart";

export default async function Header() {
  const session = await auth()

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
          <div className=" flex flex-row items-center gap-[1.3rem]">
            <Search />
            <div className=" mt-[4px]">
              <ModeToggle />
            </div>

            <ToggleCart />

            <div className=" flex flex-row items-center gap-2">
              <UserMenu />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-4 md:hidden ">
        <Link href="/">
          <Image src={Logo} alt="Your Company" width={44} height={44} />
        </Link>

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
