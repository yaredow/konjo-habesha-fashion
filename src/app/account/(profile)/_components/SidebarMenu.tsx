"use client";

import {
  DownloadIcon,
  LocateIcon,
  InboxIcon,
  SettingsIcon,
  CameraIcon,
  LogOutIcon,
} from "lucide-react";

import { SideBarLinks } from "@/components/dashboard/SideBar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { getInitials } from "@/utils/formatName";
import { useRef, useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { uploadUserProfileImage } from "@/server/actions/account/upload-profile-image";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

export default function SideBarMenu() {
  const [isLoading, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const user = session?.user;
  const path = usePathname();
  const isSetting = path === "/account/settings" ? true : false;

  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/signin" });
  };

  // Trigger file input click when button is clicked
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Handle the file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
      formData.append("userId", user?.id as string);
      startTransition(() => {
        uploadUserProfileImage(formData).then((data) => {
          if (data.success) {
            toast({
              description: data.success,
            });
          } else {
            toast({
              variant: "destructive",
              description: data.error,
            });
          }
        });
      });
    }
  };

  return (
    <div className="flex w-full flex-col bg-muted/40">
      <aside className="fixed left-0 z-10 mt-4 hidden w-32 flex-col  bg-background sm:flex">
        <nav className="flex flex-col items-center gap-8 px-2 sm:py-5">
          <div className=" flex flex-col items-center gap-4">
            <div className="relative h-[60px] w-[60px]">
              <Avatar
                className={cn("h-full w-full rounded-full", {
                  "opacity-60": isLoading,
                })}
              >
                <AvatarImage alt="User Avatar" src={user?.image || ""} />
                <AvatarFallback className="text-2xl font-semibold">
                  {user ? getInitials(user.name as string) : ""}
                </AvatarFallback>
              </Avatar>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              {isSetting ? (
                <Button
                  className="absolute bottom-0 right-0 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-white bg-white p-1 transition-colors dark:border-gray-950"
                  size="icon"
                  variant="outline"
                  onClick={handleButtonClick} // Trigger file input click when button is clicked
                >
                  <CameraIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="sr-only">Upload Avatar</span>
                </Button>
              ) : null}
            </div>
          </div>

          <SideBarLinks name="Orders" Icon={InboxIcon} href="/account/order" />
          <SideBarLinks
            name="Downloads"
            Icon={DownloadIcon}
            href="/account/download"
          />
          <SideBarLinks
            name="Addresses"
            Icon={LocateIcon}
            href="/account/address"
          />
          <SideBarLinks
            name="Settings"
            Icon={SettingsIcon}
            href="/account/settings"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">
                  <LogOutIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent onClick={handleSignOut} side="right">
                sign out
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
    </div>
  );
}
