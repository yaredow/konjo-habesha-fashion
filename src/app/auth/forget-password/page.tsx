import CardWrapper from "@/components/auth/CardWrapper";
import ForgetPasswordForm from "@/components/forms/ForgetPasswordForm";

export const metadata = {
  title: "Forget Password - Konjo Habesha Fashion",
  description:
    "Reset your password on Konjo Habesha Fashion to regain access to your account.",
  keywords: ["e-commerce", "forget password", "reset password", "your site"],
  authors: [
    {
      name: "Your E-commerce Site",
      url: "https://www.your-ecommerce-site.com",
    },
  ],
  openGraph: {
    title: "Forget Password - Konjo Habesha Fashion",
    description:
      "Reset your password on Konjo Habesha Fashion to regain access to your account.",
    url: "https://www.your-ecommerce-site.com/forget-password",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function page() {
  return (
    <main className="my-auto flex items-center justify-center">
      <CardWrapper
        title="Forgot your password"
        description="We will send you an email to reset your password."
        isLogin={false}
        showSocial={false}
        backButtonHref="/auth/signin"
        backButtonLabel="Go back to login"
      >
        <ForgetPasswordForm />
      </CardWrapper>
    </main>
  );
}
