import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  console.log(isLoggedIn);
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
