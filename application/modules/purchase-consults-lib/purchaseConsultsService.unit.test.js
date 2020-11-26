import { calculatePurchasePrice, purchaseItem } from '../../../api/purchases/actions';
import { addConsults } from '../../../api/consults/actions';
import { getProductById } from '../../../api/products/actions';
import { purchaseConsults, calculateConsultsPurchasePrice, getConsultProduct } from '.';

function getNumberOfItemsMock() {
  return 10;
}

function getProductMock() {
  return {
    mock: true,
  };
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
jest.mock('../../../api/products/actions');

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

  it('should get consult product', async () => {
    getProductById.mockReturnValue(getProductMock());

    const consult = await getConsultProduct();

    expect(consult).toEqual(getProductMock());
    expect(getProductById).toHaveBeenCalledTimes(1);
    expect(getProductById).toHaveBeenCalledWith('CONSULT');
  });
});
