"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";

export default function Social() {
  return (
    <>
      {/* <div className="mb-8 flex items-center">
        <hr className="border-1 w-full flex-grow rounded-full" />
        <div className="mx-4 text-xs font-normal">OR LOGIN WITH</div>
        <hr className="border-1 w-full rounded-full" />
      </div> */}

      <div className="flex w-full flex-row items-center justify-between space-x-2">
        <Button
          size="lg"
          className="w-1/2"
          variant="outline"
          onClick={() => {}}
        >
          <FcGoogle className=" h-5 w-5" />
        </Button>

        <Button
          size="lg"
          className="w-1/2"
          variant="outline"
          onClick={() => {}}
        >
          <FaGithub className=" h-5 w-5" />
        </Button>
      </div>
    </>
  );
}
