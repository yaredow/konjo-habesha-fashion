import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { Button } from "../ui/button";
import { signIn } from "@/auth";

export default function Social() {
  return (
    <div className="flex w-full flex-row items-center justify-between space-x-2">
      <form
        className="w-full items-center"
        action={async () => {
          "use server";
          await signIn("google", {
            redirectTo: "http://localhost:300/account/profile",
          });
        }}
      >
        <Button type="submit" size="lg" className=" w-full" variant="outline">
          <FcGoogle className=" h-5 w-5" />
        </Button>
      </form>

      <form
        className="w-full items-center"
        action={async () => {
          "use server";

          await signIn("facebook", {
            redirectTo: "http://localhost:3000/account/profile",
          });
        }}
      >
        <Button type="submit" size="lg" className=" w-full" variant="outline">
          <FaFacebook className=" h-5 w-5 text-blue-500 dark:text-blue-400" />
        </Button>
      </form>
    </div>
  );
}
