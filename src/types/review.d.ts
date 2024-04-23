export interface Review {
  review: string;
  title: string;
  rating: number;
  product: {
    productId: string;
  };
  user: {
    _id: string;
    fullName: string;
  };
  order: {
    id: string;
  };
  likes: number;
  dislikes: number;
  createdAt: {
    $date: string;
  };
  images: string[];
  __v: number;
}
