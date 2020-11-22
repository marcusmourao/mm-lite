import { getProductById } from '../products/actions';
import * as mutations from './mutations';

const CALCULATE_PURCHASE_PRICE_ERROR_MESSAGE = 'Unable to calculate purchase price';

export async function calculatePurchasePrice({ productId, numberOfItems }) {
  try {
    const product = await getProductById(productId);
    return product.calculatePurchasePrice(numberOfItems);
  } catch (e) {
    return Promise.reject(CALCULATE_PURCHASE_PRICE_ERROR_MESSAGE);
  }
}

export async function purchaseItem({
  productId,
  numberOfItems,
  customerInfo,
  paymentInfo,
}) {
  try {
    const product = await getProductById(productId);
    const purchaseTotalPrice = await product.calculatePurchasePrice(numberOfItems);
    return mutations.createNewPurchase({
      productInfo: product.getInfo(),
      customerInfo,
      paymentInfo,
      numberOfItems,
      value: purchaseTotalPrice,
    });
  } catch (e) {
    return Promise.reject(CALCULATE_PURCHASE_PRICE_ERROR_MESSAGE);
  }
}

export async function getPurchases() {
  return mutations.getPurchases();
}
