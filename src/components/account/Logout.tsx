"use client";

import { signOut } from "next-auth/react";
import { IoIosLogOut } from "react-icons/io";
import { Button } from "../ui/button";

function Logout() {
  const handleLogout = () => {
    signOut({ callbackUrl: "http://localhost:3000" });
  };

  return (
    <div className=" mb-2 mt-4 flex items-center gap-1 dark:text-gray-100">
      <Button
        variant="link"
        className="hover:text-blue-500 dark:hover:text-blue-400"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
}

export default Logout;
