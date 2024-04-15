import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function useGetCheckoutSession() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const { isPending, mutate: fetchUrl } = useMutation({
    mutationFn: async () => {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")!);
      const user = session?.user;
      const res = await fetch(
        "http://localhost:3000/api/checkout/checkout-session",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ cartItems, user }),
        },
      );

      const data = res.json();

      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["checkoutUrl"], data.session.url);
      window.location.assign(data.session.url);
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        description: err.message || "An error occurred",
      });
    },
  });

  return { isPending, fetchUrl };
}
