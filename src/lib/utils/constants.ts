export const ITEMS_PERPAGE = 8;

export const NAV_LINKS = [
  { path: "/", name: "Home" },
  { path: "/shop", name: "Shop" },
  { path: "/contact", name: "Contact" },
] as const;

export const QUICK_ACCESS_LINKS = [
  { path: "/search", name: "Search" },
  { path: "/terms", name: "Terms of Service" },
  { path: "/shipping-and-returns", name: "Shipping & Returns" },
  { path: "/privacy-policy", name: "Privacy Policy" },
  { path: "/contact", name: "Contact Us" },
  { path: "About-us", name: "About Us" },
] as const;

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

export const SORT_OPTIONS = [
  {
    value: "name-asc",
    label: "Sort by name (A-Z)",
  },
  {
    value: "name-desc",
    label: "Sort by name (Z-A)",
  },
  {
    value: "price-asc",
    label: "Sort by price (low first)",
  },
  {
    value: "price-desc",
    label: "Sort by price (high first)",
  },
] as const;

export const FILTER_OPTIONS = [
  { value: "all", selected: true, label: "All" },
  { value: "men", selected: false, label: "Men" },
  { value: "women", selected: false, label: "Women" },
  { value: "kids", selected: false, label: "Kids" },
] as const;

export const SIZE_FILTERS = {
  id: "size",
  name: "Size",
  options: [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
  ],
} as const;

export const PRICE_FILTERS = {
  id: "price",
  name: "Price",
  options: [
    { value: [0, 100], label: "Any price" },
    {
      value: [0, 20],
      label: "Under 20€",
    },
    {
      value: [0, 40],
      label: "Under 40€",
    },
    // custom option defined in JSX
  ],
} as const;

export const AVAILABLE_SIZES = ["S", "M", "L", "XL", "XXL"] as const;
export const AVAILABLE_SORT = ["none", "price-asc", "price-desc"] as const;
export const DEFAULT_CUSTOM_PRICE = [0, 100] as [number, number];
