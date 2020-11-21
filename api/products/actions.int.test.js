import PRODUCTS from './available-products';
import { getAllAvailableProducts, getProductById } from './actions';

const CONSULT_PRODUCT_ID = 'CONSULT';

describe('products::actions', () => {
  it('should get product by id', async () => {
    const product = await getProductById(CONSULT_PRODUCT_ID);

    expect(product.getId()).toBe(CONSULT_PRODUCT_ID);
  });

  it('should reject with error when can not find product by id', async () => {
    await expect(getProductById('invalid')).rejects.toBe('Can not find product with id "invalid"');
  });

  it('should get all available products', async () => {
    const allProducts = await getAllAvailableProducts();
    expect(allProducts).toEqual(PRODUCTS);
  });
});
