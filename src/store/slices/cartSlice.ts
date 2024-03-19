import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Retrieve cart items from local storage or use an empty array if none exists
const cartItems: CartItem[] = JSON.parse(
  localStorage.getItem("cartItems") || "[]",
);

const initialState: CartState = {
  cart: cartItems,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      newItem.totalPrice = newItem.price * newItem.quantity;
      state.cart.push(newItem);
      // Update local storage whenever the cart items change
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
      // Update local storage whenever the cart items change
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    increaseItemQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cart.find((item) => item._id === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.price * item.quantity;
      }
      // Update local storage whenever the cart items change
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    decreaseItemQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cart.find((item) => item._id === action.payload);
      if (item) {
        if (item.quantity === 1) {
          const index = state.cart.findIndex(
            (cartItem) => cartItem._id === action.payload,
          );
          if (index !== -1) {
            state.cart.splice(index, 1);
          }
        } else {
          item.quantity--;
          item.totalPrice = item.price * item.quantity;
        }
      }
      // Update local storage whenever the cart items change
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      // Update local storage whenever the cart items change
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export const getCart = (state: { cart: CartState }) => state.cart.cart ?? [];
export const getTotalCartQuantity = (state: { cart: CartState }) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
export const getTotalCartPrice = (state: { cart: CartState }) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice!, 0);
export const getCurrentQuantityById =
  (id: string) => (state: { cart: CartState }) =>
    state.cart.cart.find((item) => item._id === id)?.quantity ?? 0;

export default cartSlice.reducer;
