import { filterCategories } from "../types/enum";
import { ProductFilter, Option } from "../types/filter";
import { Product } from "../types/product";

export const getFilter = (products: Product[]): ProductFilter[] => {
  const uniqueColor = [
    ...new Set(products.map((product) => product.color)),
  ].map((color) => {
    const colorOption: Option = {
      label: color,
      value: color,
      checked: false,
    };
    return colorOption;
  });
  const uniqueCaterogy = [
    ...new Set(products.map((product) => product.category)),
  ].map((color) => {
    const colorOption: Option = {
      label: color,
      value: color,
      checked: false,
    };
    return colorOption;
  });
  const filter: ProductFilter[] = [
    {
      id: Math.random().toString(),
      name: filterCategories.Category,
      options: uniqueCaterogy,
    },
    {
      id: Math.random().toString(),
      name: filterCategories.Color,
      options: uniqueColor,
    },
  ];
  return filter;
};
