"use client";

import { useSession } from "next-auth/react";
import Logout from "../../../components/account/Logout";
import { Card } from "@/components/ui/card";
import UpdateAccount from "@/components/account/UserAccount";

const UserDetails = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="container ">
      <div className="mx-auto flex flex-col items-start justify-between gap-8 md:container md:flex-row md:items-center">
        {/* Order History */}
        <Card>
          <div className="mt-8 w-full pr-8 md:w-2/4">
            <h2 className="mb-4 text-xl font-bold dark:text-gray-100">
              Order History
            </h2>
          </div>
        </Card>

        {/* Account Details */}
        <div className="sticky top-0 h-full w-full md:w-1/3">
          <h2 className="mb-4 text-xl font-bold dark:text-gray-100">
            Account Details
          </h2>
          <div className="rounded border border-gray-300 p-4">
            <p className="pb-4">{session?.user?.name}</p>
            <p className="">{session?.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
