export const ITEMS_PERPAGE = 9;

export const NAV_LINKS = [
  { path: "/", name: "Home" },
  { path: "/dashboard", name: "Dashboard" },
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
  { value: "All", selected: true, label: "All" },
  { value: "Male", selected: false, label: "Men" },
  { value: "Female", selected: false, label: "Women" },
  { value: "Kids", selected: false, label: "Kids" },
] as const;

export const SIZE_FILTERS = {
  id: "size",
  name: "Size",
  options: [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
  ],
} as const;

export const PRICE_FILTERS = {
  id: "price",
  name: "Price",
  options: [
    { value: [0, 600], label: "Any price" },
    {
      value: [0, 400],
      label: "Under $400",
    },
    {
      value: [0, 200],
      label: "Under $200",
    },
    // custom option defined in JSX
  ],
} as const;

export const AVAILABLE_SIZES = ["S", "M", "L", "XL", "XXL"] as const;
export const AVAILABLE_CATEGORY = ["All", "Male", "Female", "Kids"] as const;
export const AVAILABLE_SORT = [
  "none",
  "price-asc",
  "price-desc",
  "name-asc",
  "name-desc",
] as const;
export const DEFAULT_CUSTOM_PRICE = [0, 600] as [number, number];

export const PRODUCT_STATUS_OPTIONS = [
  { name: "Active", value: "active" },
  { name: "Draft", value: "draft" },
  { name: "Archived", value: "archived" },
];

export const AVAILABLE_CATEGORIRES = ["Male", "Female", "Kids"];

export const AVAILABLE_DELIVARY_STATUS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
];

export const ORDER_DURATION = [
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Year", value: "year" },
];

export const AVAILABLE_ADMIN_PRODUCT_CATEGORIES = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" },
];
