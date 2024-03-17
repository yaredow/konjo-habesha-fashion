type Product = {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  images: { url: string; value: string }[];
  stockQuantity: number;
  unitsSold: number;
  productAddedDate: Date;
  isFeatured: boolean;
  inStock: boolean;
  sizes: [string];
};
