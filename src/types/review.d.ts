import mongoose from "mongoose";

export interface Review {
  review: string;
  title: string;
  rating: number;
  product: {
    _id: mongoose.Types.objectId;
    name: string;
  };
  user: {
    _id: mongoose.Types.ObjectId;
    fullName: string;
  };
  order: {
    id: string;
  };
  likes: string[];
  dislikes: string[];
  createdAt: {
    $date: string;
  };
  images: string[];
  __v: number;
}
