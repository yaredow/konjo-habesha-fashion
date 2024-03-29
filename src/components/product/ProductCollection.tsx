"use client";

import { useState } from "react";
import ProductPagination from "../ProductPagination";
import ProductItem from "./ProductItem";
import { ITEMS_PERPAGE } from "@/lib/utils/constants";
import { Product } from "../../../type";

function ProductCollection({ products }: { products: Product[] }) {}

export default ProductCollection;
