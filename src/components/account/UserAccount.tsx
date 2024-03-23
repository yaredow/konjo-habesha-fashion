"use client";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import UpdateUserPassword from "./UpdateUserPassword";
import UpdateUserData from "./UpdateUserData";

function UpdateAccount({ email }: { email: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Update</Button>
      </DialogTrigger>
      <DialogContent className="flex items-center justify-center sm:max-w-[425px] md:max-w-[540px]">
        <Tabs defaultValue="account" className=" my-4 w-[500px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <UpdateUserData email={email} />
          </TabsContent>

          <TabsContent value="password">
            <UpdateUserPassword email={email} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateAccount;
