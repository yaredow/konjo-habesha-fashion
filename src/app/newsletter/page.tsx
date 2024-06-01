import Spinner from "@/components/Spinner";
import NewsLetter from "@/components/newsletter";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <NewsLetter />;
    </Suspense>
  );
}
