import Spinner from "@/components/Spinner";
import PasswordResetForm from "@/components/forms/PasswordRestForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <PasswordResetForm />;
    </Suspense>
  );
}
