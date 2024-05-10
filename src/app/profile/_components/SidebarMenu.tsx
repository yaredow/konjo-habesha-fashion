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

export default function SideBarMenu() {
  return (
    <div className="m flex w-full flex-col bg-muted/40">
      <aside className="fixed left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <SideBarLinks
            name="Dashboard"
            Icon={LayoutDashboardIcon}
            href="/admin/dashboard"
          />

          <SideBarLinks
            name="Orders"
            Icon={InboxIcon}
            href="/admin/dashboard/order"
          />
          <SideBarLinks
            name="Downloads"
            Icon={DownloadIcon}
            href="/admin/dashboard/products"
          />
          <SideBarLinks name="Addresses" Icon={LocateIcon} href="#" />
          <SideBarLinks name="Settings" Icon={SettingsIcon} href="#" />
          <Button variant="ghost">
            <LogOutIcon />
          </Button>
        </nav>
      </aside>
    </div>
  );
}
