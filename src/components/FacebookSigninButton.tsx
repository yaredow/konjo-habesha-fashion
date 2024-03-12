import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

function FacebookSigninButton() {
  const loginWithFb = () => {
    signIn("facebook", { callbackUrl: "http://localhost:300" });
  };
  return (
    <Button
      onClick={loginWithFb}
      variant="outline"
      className="flex items-center rounded-sm border px-6 text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
    >
      <svg
        className="mr-2 h-8 w-8"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="48px"
        height="48px"
      >
        <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z" />
        <path
          fill="#fff"
          d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.52-0.194V29.036z"
        />
      </svg>
      <span>
        <span>Continue with Facebook</span>
      </span>
    </Button>
  );
}

export default FacebookSigninButton;
