export interface Review {
  review: string;
  title: string;
  rating: number;
  product: {
    _id: string;
    name: string;
  };
  user: {
    _id: string;
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
