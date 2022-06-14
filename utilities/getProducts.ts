import { Product } from "../types/product";
import { faker } from "@faker-js/faker";
export const getproducts = async () => {
  const products: {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
  }[] = await fetch("https://fakestoreapi.com/products").then((res) =>
    res.json()
  );
  const result: Product[] = products.map((prod) => {
    const product: Product = {
      id: faker.datatype.uuid(),
      title: prod.title,
      description: prod.description,
      category: prod.category,
      image: prod.image,
      price: prod.price,
      quantity: parseInt(
        faker.random.numeric(1, { bannedDigits: ["0,3,5,8,9"] })
      ),
      color: faker.color.human(),
    };
    return product;
  });
  console.log("result", result);
  return result;
};
