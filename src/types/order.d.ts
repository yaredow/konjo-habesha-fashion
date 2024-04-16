type Product = {
  productId: string;
  name: string;
  quantity: number;
};

type Adress = {
  city: string;
  country: string;
  line1: string;
  line2: string;
  postalCode: string;
  state: string;
};

type Shipping = {
  name: string;
  phone: string;
  address: Adress;
  city: string;
  country: string;
  email: string;
};

type Order = {
  userId: string;
  customerId: string;
  paymentIntentId?: string;
  products: Product[];
  subtotal: number;
  shipping: Shipping;
  delivery_status: string;
  payment_status: string;
  createdAt?: Date;
  updatedAt?: Date;
};
