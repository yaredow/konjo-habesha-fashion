export const itemsPerPage = 8;

export const productCategories = ["trending", "featured", "new-arrival"];

export const navLinks = [
  { path: "/", name: "Home" },
  { path: "/shop", name: "Shope" },
  { path: "/contact", name: "Contact" },
];

export const qucikAccessLinks = [
  { path: "/search", name: "Search" },
  { path: "/terms", name: "Terms of Service" },
  { path: "/shipping-and-returns", name: "Shipping & Returns" },
  { path: "/privacy-policy", name: "Privacy Policy" },
  { path: "/contact", name: "Contact Us" },
  { path: "About-us", name: "About Us" },
];

export const groupObject = {
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
