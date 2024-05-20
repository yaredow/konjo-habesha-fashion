import mongoose from "mongoose";
import { Dislike, Like, Order, Product, Review, User } from "@prisma/client";

export type ProductReviewType = Review & {
  product: Product;
  user: User;
  order: Order;
  likes: Like[];
  dislikes: Dislike[];
};
