import Spinner from "@/components/Spinner";
import SearchComp from "../../../search-comp";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <SearchComp />
    </Suspense>
  );
}
