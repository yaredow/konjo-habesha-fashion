import { useSession } from "next-auth/react";
import Spinner from "../Spinner";
import useGetCheckoutSession from "@/utils/hook/useGetCheckoutSession";
import { Button } from "../ui/button";

const CheckoutButton = () => {
  const { data: session, status } = useSession();
  const { isPending, fetchUrl } = useGetCheckoutSession();

  const handleCheckout = async () => {
    fetchUrl();
  };

  return (
    <Button
      variant="default"
      disabled={session?.user ? false : true}
      onClick={() => handleCheckout()}
    >
      {isPending ? (
        <Spinner />
      ) : session?.user ? (
        "Check out"
      ) : (
        "Login to checkout"
      )}
    </Button>
  );
};
export default CheckoutButton;
