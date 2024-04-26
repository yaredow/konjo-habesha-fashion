"use client";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import UpdateUserPassword from "./UpdateUserPassword";
import UpdateUserData from "./UpdateUserData";
import { useSession } from "next-auth/react";

function UpdateAccount() {
  const { data: session } = useSession();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Update</Button>
      </DialogTrigger>
      <DialogContent className="flex items-center justify-center sm:max-w-[425px] md:max-w-[540px]">
        <
      </DialogContent>
    </Dialog>
  );
}

export default UpdateAccount;
