"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserIcon } from "lucide-react";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleLogout = () => {
    signOut({ callbackUrl: "https://konjo-habesha-fashion.vercel.app" });
  };
  return (
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
          {session ? (
            <Image
              src={
                session?.user.image ||
                "https://pbs.twimg.com/profile_images/1754602039311478784/EmA-O4v4_400x400.jpg"
              }
              alt="User profile picture"
              width={50}
              height={50}
              className="aspect-square rounded-full bg-background object-cover"
            />
          ) : (
            <UserIcon strokeWidth={1.5} />
          )}
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
          {session?.user?.role === "ADMIN" ? (
            <DropdownMenuItem>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      ) : null}
    </DropdownMenu>
  );
}
