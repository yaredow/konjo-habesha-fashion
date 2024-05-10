import { Button } from "@/components/ui/button";
import {
  LayoutDashboardIcon,
  ViewIcon,
  DownloadIcon,
  LocateIcon,
  InboxIcon,
  SettingsIcon,
  LogOutIcon,
  CameraIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SidebarMenu from "./_components/SidebarMenu";
import { auth } from "@/auth";
import { formatName, getInitials } from "@/utils/formatName";

export default async function Component() {
  const session = await auth();
  const user = session?.user;
  return (
    <main className="mx-8 my-8 md:mx-20 md:my-12">
      <div className="flex flex-row gap-16">
        <div className="flex w-1/5 flex-col space-y-20">
          <div className=" flex flex-row items-center justify-center gap-4">
            <div key="1" className="relative h-[80px] w-[80px]">
              <Avatar className="h-full w-full rounded-full">
                <AvatarImage alt="User Avatar" src={user?.image || ""} />
                <AvatarFallback>
                  {getInitials(user?.name as string)}
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
            <div className=" item-center">
              <h1 className="text-lg font-semibold">{user?.name}</h1>
              <Button variant="ghost">Logout</Button>
            </div>
          </div>

          <ul className="flex flex-col space-y-2">
            <SidebarMenu
              icon={LayoutDashboardIcon}
              link="#"
              label="Dashboard"
            />
            <SidebarMenu icon={ViewIcon} link="#" label="Orders" />
            <SidebarMenu icon={DownloadIcon} link="#" label="Downloads" />
            <SidebarMenu icon={LocateIcon} link="#" label="Addresses" />
            <SidebarMenu icon={InboxIcon} link="#" label="Inquiries" />
            <SidebarMenu icon={SettingsIcon} link="#" label="Account details" />
            <SidebarMenu icon={LogOutIcon} link="#" label="Logout" />
          </ul>
        </div>

        <div className="flex w-4/5 flex-col">
          <div className="mb-4 text-lg font-semibold">{`Hello ${formatName(user?.name as string)}`}</div>
          <p>
            From your account dashboard you can view your recent orders, manage
            your shipping and billing addresses, and edit your password and
            account details.
          </p>
        </div>
      </div>
    </main>
  );
}
