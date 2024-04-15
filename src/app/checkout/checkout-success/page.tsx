"use client";

import { useRouter } from "next/navigation";

function CheckoutSuccess() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="">
        <div className="bg-white p-6  md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className="mx-auto my-6 h-16 w-16 text-green-600"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="text-center text-base font-bold text-gray-900 md:text-2xl">
              Payment Done!
            </h3>
          </div>
        </div>
      </div>
      <div className="">
        <div className="text-center">
          <p className="mb-4 text-2xl font-semibold">
            Thank you for your purchase!
          </p>
          <p className="mb-8 text-gray-600">
            We appreciate your business. If you have any questions, please email{" "}
            <a
              href="mailto:orders@example.com"
              className="text-blue-500 hover:underline"
            >
              orders@example.com
            </a>
          </p>
          <p className="text-gray-400">
            Your order details and confirmation have been sent to your email
            address.
          </p>
        </div>
      </div>
      <button
        onClick={() => router.replace("/")}
        className="button mt-4 items-center"
      >
        Home
      </button>
    </div>
  );
}

export default CheckoutSuccess;
