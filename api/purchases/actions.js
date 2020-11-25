import { getProductById } from '../products/actions';
import * as mutations from './mutations';

const CALCULATE_PURCHASE_PRICE_ERROR_MESSAGE = 'Unable to calculate purchase price';
const PURCHASE_ERROR_MESSAGE = 'Unable to purchase this item';

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
    const { purchaseValue } = await product.calculatePurchasePrice(numberOfItems);
    return mutations.createNewPurchase({
      productInfo: product.getInfo(),
      customerInfo,
      paymentInfo,
      numberOfItems,
      value: purchaseValue,
    });
  } catch (e) {
    return Promise.reject(PURCHASE_ERROR_MESSAGE);
  }
}

export async function getPurchases() {
  return mutations.getPurchases();
}
