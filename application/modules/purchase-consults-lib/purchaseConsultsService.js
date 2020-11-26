import { calculatePurchasePrice, purchaseItem } from '../../../api/purchases/actions';
import { addConsults } from '../../../api/consults/actions';
import { getProductById } from '../../../api/products/actions';

const CONSULTS_PRODUCT_ID = 'CONSULT';

export function calculateConsultsPurchasePrice(numberOfItems) {
  return calculatePurchasePrice({
    productId: CONSULTS_PRODUCT_ID,
    numberOfItems,
  });
}

export function getConsultProduct() {
  return getProductById(CONSULTS_PRODUCT_ID);
}

export function purchaseConsults({ numberOfItems, customerInfo, paymentInfo }) {
  return purchaseItem({
    productId: CONSULTS_PRODUCT_ID,
    numberOfItems,
    customerInfo,
    paymentInfo,
  }).then(() => addConsults(numberOfItems));
}
