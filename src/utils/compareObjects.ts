import { Product } from "@prisma/client";
import _ from "lodash";

export default function compareObject(obj1: Product, obj2: Product) {
  const obj1WithoutImages = _.omit(obj1, "images");
  const obj2WithoutImages = _.omit(obj2, "images");

  return _.isEqual(obj1WithoutImages, obj2WithoutImages);
}
