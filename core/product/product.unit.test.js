import Product from '.';
import Money from '../money';

const getDiscountPerUnitMock = () => 0.16;
const getProductIdMock = () => 'mock id';
const getUnitPriceMock = () => 0.24;
const getEmptyDiscountRules = () => [];
const getNumberOfUnitsMock = () => 97;
function isApplicableAsync(value) {
  return Promise.resolve(value);
}
function getAsyncDiscountCalculationMock(numberOfItems) {
  const value = new Money(getDiscountPerUnitMock())
    .multiply(numberOfItems)
    .getAmount();
  return Promise.resolve(value);
}
const getApplicableAsyncDiscountRuleMock = () => ({
  isApplicable: () => isApplicableAsync(true),
  getDiscountValue: (numberOfItems) => getAsyncDiscountCalculationMock(numberOfItems),
});

const getNotApplicableAsyncDiscountRuleMock = () => ({
  isApplicable: () => isApplicableAsync(false),
  getDiscountValue: (numberOfItems) => getAsyncDiscountCalculationMock(numberOfItems),
});

describe('Product', () => {
  it('should get product id', () => {
    const product = new Product({
      id: getProductIdMock(),
      unitPrice: getUnitPriceMock(),
      discountRules: getEmptyDiscountRules(),
    });

    expect(product.getId()).toBe(getProductIdMock());
  });

  it('should calculate product discount when discount rules are an empty array', async () => {
    const product = new Product({
      id: getProductIdMock(),
      unitPrice: getUnitPriceMock(),
      discountRules: getEmptyDiscountRules(),
    });

    expect(await product.calculateDiscount(getNumberOfUnitsMock())).toBe(0);
  });

  it('should calculate product discount when discount rules has async rules', async () => {
    const product = new Product({
      id: getProductIdMock(),
      unitPrice: getUnitPriceMock(),
      discountRules: [getApplicableAsyncDiscountRuleMock()],
    });

    expect(await product.calculateDiscount(getNumberOfUnitsMock())).toBe(15.52);
  });

  it('should calculate product discount when discount rules has async rules but it is not applicable', async () => {
    const product = new Product({
      id: getProductIdMock(),
      unitPrice: getUnitPriceMock(),
      discountRules: [getNotApplicableAsyncDiscountRuleMock()],
    });

    expect(await product.calculateDiscount(getNumberOfUnitsMock())).toBe(0);
  });

  it('should calculate purchase price when discount rules are an empty array', async () => {
    const product = new Product({
      id: getProductIdMock(),
      unitPrice: getUnitPriceMock(),
      discountRules: getEmptyDiscountRules(),
    });

    expect(await product.calculatePurchasePrice(getNumberOfUnitsMock())).toBe(23.28);
  });

  it('should calculate purchase price when discount rules has async rules', async () => {
    const product = new Product({
      id: getProductIdMock(),
      unitPrice: getUnitPriceMock(),
      discountRules: [getApplicableAsyncDiscountRuleMock()],
    });

    expect(await product.calculatePurchasePrice(getNumberOfUnitsMock())).toBe(7.76);
  });

  it('should calculate purchase price when discount rules has async rules but it is not applicable', async () => {
    const product = new Product({
      id: getProductIdMock(),
      unitPrice: getUnitPriceMock(),
      discountRules: [getNotApplicableAsyncDiscountRuleMock()],
    });

    expect(await product.calculatePurchasePrice(getNumberOfUnitsMock())).toBe(23.28);
  });
});
