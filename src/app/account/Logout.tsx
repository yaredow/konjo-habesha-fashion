"use client";

import { signOut } from "next-auth/react";
import { IoIosLogOut } from "react-icons/io";

function Logout() {
  const handleLogout = () => {
    signOut({ callbackUrl: "http://localhost:3000" });
  };

  return (
    <div className=" mb-2 mt-4 flex items-center gap-1 dark:text-gray-100">
      <IoIosLogOut className="text-xl text-red-500 dark:text-white" />
      <button
        className="hover:text-blue-500 dark:hover:text-blue-400"
        onClick={handleLogout}
      >
        logout
      </button>
    </div>
  );
}

export default Logout;
