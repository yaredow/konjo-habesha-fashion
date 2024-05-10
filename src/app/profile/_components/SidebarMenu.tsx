"use client";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  LayoutDashboardIcon,
  ViewIcon,
  DownloadIcon,
  LocateIcon,
  InboxIcon,
  SettingsIcon,
  CameraIcon,
  LogOutIcon,
} from "lucide-react";

import { SideBarLinks } from "@/components/dashboard/SideBar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipProvider } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { getInitials } from "@/utils/formatName";

export default function SideBarMenu() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex w-full flex-col bg-muted/40">
      <aside className="fixed left-0 z-10 mt-4 hidden w-32 flex-col  bg-background sm:flex">
        <nav className="flex flex-col items-center gap-8 px-2 sm:py-5">
          <div className=" flex flex-col items-center gap-4">
            <div key="1" className="relative h-[60px] w-[60px]">
              <Avatar className="h-full w-full rounded-full">
                <AvatarImage alt="User Avatar" src="" />
                <AvatarFallback className=" text-2xl font-semibold">
                  {getInitials((user?.name as string) || "")}
                </AvatarFallback>
              </Avatar>

              <Button
                className="absolute bottom-0 right-0 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-white bg-white p-1 transition-colors dark:border-gray-950"
                size="icon"
                variant="outline"
              >
                <CameraIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Upload Avatar</span>
              </Button>
            </div>
          </div>
          <SideBarLinks
            name="Dashboard"
            Icon={LayoutDashboardIcon}
            href="/profile/dashboard"
          />

          <SideBarLinks name="Orders" Icon={InboxIcon} href="/profile/order" />
          <SideBarLinks
            name="Downloads"
            Icon={DownloadIcon}
            href="/profile/download"
          />
          <SideBarLinks
            name="Addresses"
            Icon={LocateIcon}
            href="/profile/address"
          />
          <SideBarLinks
            name="Settings"
            Icon={SettingsIcon}
            href="/profile/settings"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">
                  <LogOutIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
    </div>
  );
}
