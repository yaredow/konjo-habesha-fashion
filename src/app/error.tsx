"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className=" flex items-center justify-between">
      <h2>Something went wrong!</h2>
      <h1>{error.message}</h1>
      <p>Please try againor contact support if the problem persist</p>
      <div className=" flex flex-row gap-8">
        <Button onClick={() => reset()}>Try again</Button>
        <Button variant="outline" onClick={() => router.replace("/")}></Button>
      </div>
    </div>
  );
}

export default error;
