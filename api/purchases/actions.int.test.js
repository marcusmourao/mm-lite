import { calculatePurchasePrice, getPurchases, purchaseItem } from './actions';

const getNumberOfItemsMock = () => 100;
const getEmptyPurchasesMock = () => [];
const getProductIdMock = () => 'CONSULT';
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
  value: 24,
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

    expect(purchasePrice).toBe(24);
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
});
