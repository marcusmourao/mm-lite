import PRODUCTS from './available-products';

export async function getAllAvailableProducts() {
  return PRODUCTS;
}

export async function getProductById(id) {
  const product = PRODUCTS.find((item) => item.getId() === id);
  if (!product) {
    const errorMessage = `Can not find product with id "${id}"`;
    return Promise.reject(errorMessage);
  }
  return product;
}
