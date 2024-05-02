import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { HomeIcon, MenuIcon, Phone, ShoppingBag } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";
import { ModeToggle } from "../DarkModeToggle";

export default function MobileNavigation() {
  return (
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
  );
}
