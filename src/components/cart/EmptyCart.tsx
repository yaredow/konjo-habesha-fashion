import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";

function EmptyCart() {
  const router = useRouter();
  return (
    <div className="flex h-full min-h-[75vh] flex-col items-center justify-center">
      <div>
        <Image
          height={200}
          width={200}
          src="/images/cart/empty-cart.png"
          alt="an image of an empty cart"
        />
      </div>
      <div className="mb-4 mt-4 dark:text-gray-100">
        <p className=" font-custom text-lg font-semibold">Your cart is empty</p>
      </div>
      <div className="mt-6">
        <Button
          onClick={() => {
            router.replace("/");
          }}
          className="button"
        >
          Keep Browsing
        </Button>
      </div>
    </div>
  );
}

export default EmptyCart;
