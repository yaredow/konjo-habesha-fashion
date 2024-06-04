"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  LineChart,
  LucideIcon,
  Package,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SideBar() {
  return (
    <div className="m flex w-full flex-col bg-muted/40">
      <aside className="fixed left-0 z-10 hidden w-14 flex-col bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <SideBarLinks name="Dashboard" Icon={Home} href="/dashboard" />
          <SideBarLinks
            name="Order"
            Icon={ShoppingCart}
            href="/dashboard/order"
          />
          <SideBarLinks
            name="Products"
            Icon={Package}
            href="/dashboard/products"
          />
          <SideBarLinks name="Customers" Icon={Users2} href="#" />
          <SideBarLinks name="Analytics" Icon={LineChart} href="#" />
        </nav>

        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <SideBarLinks name="Settings" Icon={Settings} href="#" />
        </nav>
      </aside>
    </div>
  );
}

type SideBarLinksType = {
  name: string;
  Icon: LucideIcon;
  href: string;
};

export function SideBarLinks({ name, Icon, href }: SideBarLinksType) {
  const pathName = usePathname();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
              { "border text-accent-foreground": pathName === href },
            )}
          >
            <Icon className="h-4 w-4 md:h-5 md:w-5" />
            <span className="sr-only">{name}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
