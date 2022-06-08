import { Product } from "../types/product";
import { faker } from "@faker-js/faker";
export const getproducts = async () => {
  const result: Product[] = [...Array(20)].map(() => {
    const product: Product = {
      id: faker.datatype.uuid(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      image: faker.image.abstract(640, 480, true),
      price: faker.commerce.price(),
      quantity: parseInt(
        faker.random.numeric(1, { bannedDigits: ["0,3,5,8,9"] })
      ),
    };
    return product;
  });
  return result;
};
