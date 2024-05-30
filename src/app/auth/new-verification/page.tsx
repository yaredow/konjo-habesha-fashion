import Spinner from "@/components/Spinner";
import VerifiyEmailForm from "@/components/forms/VerifiyEmailForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <VerifiyEmailForm />
    </Suspense>
  );
}
