export const ITEMS_PERPAGE = 8;

export const NAV_LINKS = [
  { path: "/", name: "Home" },
  { path: "/shop", name: "Shop" },
  { path: "/contact", name: "Contact" },
];

export const QUICK_ACCESS_LINKS = [
  { path: "/search", name: "Search" },
  { path: "/terms", name: "Terms of Service" },
  { path: "/shipping-and-returns", name: "Shipping & Returns" },
  { path: "/privacy-policy", name: "Privacy Policy" },
  { path: "/contact", name: "Contact Us" },
  { path: "About-us", name: "About Us" },
];

export const GROUP_OBJECTS = {
  _id: "$_id",
  name: { $first: "$name" },
  price: { $first: "$price" },
  productAddedDate: { $first: "$productAddedDate" },
  description: { $first: "$description" },
  images: { $first: "$images" },
  stockQuantity: { $first: "$stockQuantity" },
  unitsSold: { $first: "$unitsSold" },
  isFeatured: { $first: "$isFeatured" },
  inStock: {
    $first: {
      $cond: {
        if: { $gt: ["$stockQuantity", 0] },
        then: true,
        else: false,
      },
    },
  },
  category: { $first: "$category" },
  sizes: { $first: "$sizes" },
};
