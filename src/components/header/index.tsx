import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/images/logo/logo2.png";
import { ModeToggle } from "../DarkModeToggle";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { HomeIcon, MenuIcon, Phone, ShoppingBag } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";
import UserMenu from "../UserMenu";
import ToggleCart from "../cart/ToggleCart";
import Search from "../Search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { AVAILABLE_CATEGORIRES } from "@/utils/constants";
import { Suspense } from "react";
import Spinner from "../Spinner";
import { Separator } from "../ui/separator";
import { auth } from "@/auth";

export default async function Header() {
  const session = auth();
  return (
    <nav className="sticky inset-0 inset-y-0 right-0 z-10 w-full border-b bg-background px-[10px] text-foreground shadow-sm md:px-12 ">
      <div className="flex flex-row items-center justify-between">
        <Link href="/" className="hidden flex-col items-center p-1.5 md:flex">
          <Image
            src={Logo}
            alt="An animated habesha women wearing traditiona cloth"
            width={50}
            height={50}
            priority
          />
        </Link>

        <div className=" hidden flex-row items-center justify-center gap-4 md:flex">
          <div className=" hidden font-nav md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className=" text-sm text-foreground/65"
                  variant="outline"
                >
                  Categories
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                {AVAILABLE_CATEGORIRES.map((category, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link href="/shop">{category}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Suspense fallback={<Spinner />}>
            <Search />
          </Suspense>
        </div>

        <div className="hidden gap-6 md:flex md:justify-end">
          <div className=" flex flex-row items-center gap-[1.3rem]">
            <div className=" mt-[4px]">
              <ModeToggle />
            </div>

            <ToggleCart />

            <Separator orientation="vertical" />
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
                  {!session ? (
                    <UserMenu />
                  ) : (
                    <Link
                      href="/auth/signin"
                      className="flex items-center gap-2"
                    >
                      Log in{" "}
                      <span>
                        <FaArrowRightLong />
                      </span>
                    </Link>
                  )}
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
