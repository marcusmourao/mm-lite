import { calculatePurchasePrice, purchaseItem } from '../../../api/purchases/actions';
import { addConsults } from '../../../api/consults/actions';
import { purchaseConsults, calculateConsultsPurchasePrice } from '.';

function getNumberOfItemsMock() {
  return 10;
}

function getPurchaseMock() {
  return {
    numberOfItems: getNumberOfItemsMock(),
    customerInfo: 'mock customer info',
    paymentInfo: 'mock payment info',
  };
}

function getPurchasePriceMock() {
  return {
    purchaseValue: 1000,
    discounts: [{ description: 'mock description', discountValue: 10, numberOfItemsWithDiscount: 10 }],
  };
}

jest.mock('../../../api/purchases/actions');
jest.mock('../../../api/consults/actions');

describe('purchaseConsultsService', () => {
  it('should calculate purchase price', async () => {
    calculatePurchasePrice.mockResolvedValue(getPurchasePriceMock());
    const response = await calculateConsultsPurchasePrice(getNumberOfItemsMock());

    expect(calculatePurchasePrice).toHaveBeenCalledTimes(1);
    expect(calculatePurchasePrice).toHaveBeenCalledWith({
      numberOfItems: getNumberOfItemsMock(),
      productId: 'CONSULT',
    });
    expect(response).toEqual(getPurchasePriceMock());
  });

  it('should purchase consults', async () => {
    purchaseItem.mockResolvedValue();
    addConsults.mockResolvedValue();
    await purchaseConsults(getPurchaseMock());

    expect(purchaseItem).toHaveBeenCalledTimes(1);
    expect(purchaseItem).toHaveBeenCalledWith({
      productId: 'CONSULT',
      ...getPurchaseMock(),
    });
    expect(addConsults).toHaveBeenCalledWith(getNumberOfItemsMock());
  });
});
