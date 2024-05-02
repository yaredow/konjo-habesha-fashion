"use client";

import UpdateUserData from "@/components/account/UpdateUserData";
import UpdateUserPassword from "@/components/account/UpdateUserPassword";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";

export default function setting() {
  return (
    <div>
      <h1 className=" mb-8 text-center text-3xl font-semibold">
        Update your account
      </h1>
      <Tabs defaultValue="account" className=" my-4 w-[500px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <UpdateUserData />
        </TabsContent>

        <TabsContent value="password">
          <UpdateUserPassword />
        </TabsContent>
      </Tabs>
    </div>
  );
}
