import { toast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem, getCart } from "@/store/slices/cartSlice";
import { CartItem, Product } from "../../../types/product";

export default function useAddToCart(cartFilter: CartItem) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(getCart);

  if (cartFilter === null) {
    toast({
      variant: "destructive",
      description: "Product details are not ready yet",
    });
    return;
  }

  const { _id, size, images, name, category, price } = cartFilter;

  const handleAddToCart = () => {
    const isProductInCart = cart.some((item: CartItem) => item._id === _id);

    const newProduct: CartItem = {
      _id,
      size,
      images,
      name,
      category,
      quantity: 1,
      price,
      totalPrice: undefined,
    };

    if (!isProductInCart) {
      dispatch(addItem(newProduct));
    } else {
      toast({
        variant: "destructive",
        description: "Item already exists",
      });
    }
  };

  return { handleAddToCart };
}
