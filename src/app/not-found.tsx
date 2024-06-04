"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function PageNotFound() {
  const router = useRouter();
  return (
    <section className=" mx-6 my-12 md:mx-12 ">
      <div className="mx-auto flex min-h-screen flex-col px-6 md:min-h-[85vh] md:flex-row md:items-center md:justify-center ">
        <div className="w-full lg:w-1/2">
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
            404 error
          </p>
          <h1 className="mt-3 text-2xl font-semibold md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4">
            Sorry, the page you are looking for doesn&apos;t exist.Here are some
            helpful links:
          </p>

          <div className="mt-6 flex items-center gap-x-3">
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="text-smtransition-colors flex w-1/2 items-center justify-center gap-x-2 rounded-lg border  px-5 py-2 duration-200 sm:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>Go back</span>
            </Button>

            <Button
              onClick={() => router.push("/")}
              className="w-1/2 shrink-0 rounded-lg px-5 py-2 text-sm tracking-wide transition-colors duration-200 sm:w-auto"
            >
              Take me home
            </Button>
          </div>
        </div>

        <div className="relative mt-12 w-full lg:mt-0 lg:w-1/2">
          <img
            className="w-full max-w-lg lg:mx-auto"
            src="https://merakiui.com/images/components/illustration.svg"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default PageNotFound;
