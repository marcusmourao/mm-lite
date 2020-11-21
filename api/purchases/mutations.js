import state from './state';

export function createNewPurchase({
  productInfo,
  customerInfo,
  paymentInfo,
  numberOfItems,
  value,
}) {
  const purchase = {
    productInfo,
    customerInfo,
    paymentInfo,
    numberOfItems,
    value,
  };

  state.purchases = [
    ...state.purchases,
    purchase,
  ];
}

export function getPurchases() {
  return state.purchases;
}
