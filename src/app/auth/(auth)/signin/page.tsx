import Spinner from "@/components/Spinner";
import CardWrapper from "@/components/auth/CardWrapper";
import LoginForm from "@/components/forms/LoginForm";
import { Suspense } from "react";

export const metadata = {
  title: "Sign In - Konjo Habesha Fashion",
  description:
    "Sign in to your account on Konjo Habesha Fashion to access your profile, orders, and more.",
  keywords: ["e-commerce", "sign in", "login", "your site"],
  authors: [
    {
      name: "Konjo Habesha Fashion",
      url: "https://www.konjohasbeshafashion.com",
    },
  ],
  openGraph: {
    title: "Sign In - Konjo Habesha Fashion",
    description:
      "Sign in to your account on Konjo Habesha Fashion to access your profile, orders, and more.",
    url: "https://www.your-ecommerce-site.com/signin",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yoursite",
    title: "Sign In - Konjo Habesha Fashion",
    description:
      "Sign in to your account on Konjo Habesha Fashion to access your profile, orders, and more.",
    image: "https://www.your-ecommerce-site.com/images/og-image.jpg",
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function Page() {
  return (
    <main className=" my-auto flex items-center justify-center">
      <CardWrapper
        title="Sign In"
        description="Provide your credentials to log in"
        isLogin={true}
        showSocial={true}
        backButtonHref="/"
        backButtonLabel="Go back to home"
      >
        <Suspense fallback={<Spinner />}>
          <LoginForm />
        </Suspense>
      </CardWrapper>
    </main>
  );
}
