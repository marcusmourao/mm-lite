import Money from '../money';

class Product {
  constructor({ id, unitPrice, discountRules }) {
    this.id = id;
    this.unitPrice = unitPrice;
    this.discountRules = discountRules;
  }

  getId() {
    return this.id;
  }

  getInfo() {
    return this.id;
  }

  async calculatePurchasePrice(numberOfUnits) {
    const purchaseValue = new Money(this.unitPrice).multiply(numberOfUnits);
    const discount = await this.calculateDiscount(numberOfUnits);
    return purchaseValue
      .subtract(discount)
      .getAmount();
  }

  calculateDiscount(numberOfUnits) {
    return this.discountRules.reduce(async (accumulator, currentDiscountRule) => {
      const isApplicable = await currentDiscountRule.isApplicable(numberOfUnits);
      if (isApplicable) {
        const accumulatorValue = await accumulator;
        const discountValue = await currentDiscountRule.getDiscountValue(numberOfUnits);
        return new Money(accumulatorValue)
          .add(discountValue)
          .getAmount();
      }
      return Promise.resolve(accumulator);
    }, Promise.resolve(0));
  }
}

export default Product;
