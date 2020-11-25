import { calculatePurchasePrice, getPurchases, purchaseItem } from './actions';

const getNumberOfItemsMock = () => 100;
const getEmptyPurchasesMock = () => [];
const getProductIdMock = () => 'CONSULT';
const getInvalidProductId = () => 'invalid';
const getPaymentInfoMock = () => ({
  cardLastDigits: '1234',
  issuer: 'issuer mock',
});
const getCustomerInfoMock = () => ({
  identifier: '1234567890',
});
const getExpectedPurchaseMock = () => ({
  customerInfo: {
    identifier: '1234567890',
  },
  numberOfItems: 100,
  paymentInfo: {
    cardLastDigits: '1234',
    issuer: 'issuer mock',
  },
  productInfo: 'CONSULT',
  value: 9,
});

describe('purchases::actions', () => {
  it('should get purchases', async () => {
    const purchases = await getPurchases();
    expect(purchases).toEqual(getEmptyPurchasesMock());
  });

  it('should calculate purchase price', async () => {
    const purchasePrice = await calculatePurchasePrice({
      numberOfItems: getNumberOfItemsMock(),
      productId: getProductIdMock(),
    });

    expect(purchasePrice).toMatchObject({
      discounts: [{ discountValue: 15, numberOfItemsWithDiscount: 100 }],
      purchaseValue: 9,
    });
  });

  it('should fail when try to calculate purchase prince of an invalid item', async () => {
    await expect(calculatePurchasePrice({
      productId: getInvalidProductId(),
      numberOfItems: getNumberOfItemsMock(),
    })).rejects.toBe('Unable to calculate purchase price');
  });

  it('should purchase an item', async () => {
    await purchaseItem({
      productId: getProductIdMock(),
      numberOfItems: getNumberOfItemsMock(),
      paymentInfo: getPaymentInfoMock(),
      customerInfo: getCustomerInfoMock(),
    });

    const purchases = await getPurchases();
    expect(purchases).toEqual([getExpectedPurchaseMock()]);
  });

  it('should fail when try to purchase an invalid item', async () => {
    await expect(purchaseItem({
      productId: getInvalidProductId(),
      numberOfItems: getNumberOfItemsMock(),
      paymentInfo: getPaymentInfoMock(),
      customerInfo: getCustomerInfoMock(),
    })).rejects.toBe('Unable to purchase this item');
  });
});
