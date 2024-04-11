import { toast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addItem, getCart } from "@/store/slices/cartSlice";
import { CartItem, Product } from "../../../types/product";
export default function useAddToCart(product: Product) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(getCart);
  const { images, _id, sizes, name, category, price } = product;
  const handleAddToCart = () => {
    const isProductInCart = cart.some((it) => it._id === _id);

    const newProduct: CartItem = {
      _id,
      sizes,
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
