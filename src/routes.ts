export const publicRoutes = [
  "/",
  "/contact",
  "/cart",
  "/shop*",
  "/search",
  "/auth/new-verification",
  "/dashboard",
  "/dashboard/product",
  "/dashboard/user",
  "/dashboard/order",
  "/api/stripe/webhook",
  "/",
];

export const authRoutes = [
  "/auth/signin",
  "/auth/register",
  "/auth/error",
  "/auth/forget-password",
  "/auth/reset-password",
];

export const apiAuthPrefix = ["/api/auth", "/api/product"];

export const DEFAULT_LOGIN_REDIRECT = "/profile/dashboard";
