export default function CheckoutCancel() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="mb-4 text-2xl font-bold">Order Cancellation</p>
        <p className="mb-8 text-gray-600">
          Your order has been canceled. If you have any concerns, please contact
          us at{" "}
          <a
            href="mailto:orders@example.com"
            className="text-blue-500 hover:underline"
          >
            orders@example.com
          </a>
        </p>
        <p className="text-gray-400">
          We hope to serve you again in the future.
        </p>
      </div>
    </div>
  );
}
