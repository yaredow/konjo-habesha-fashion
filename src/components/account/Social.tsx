"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";

export default function Social() {
  return (
    <div className=" flex flex-col">
      <div className="mb-8 flex flex-grow items-center">
        <hr className="border-1 w-full flex-grow rounded-full" />
        <div className="mx-4 text-xs font-normal">OR LOGIN WITH</div>
        <hr className="border-1 w-full rounded-full" />
      </div>

      <div className="w-full flex-grow flex-row items-center justify-between">
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
    </div>
  );
}
