import Money from '../money';

function getSumOfDiscounts(list) {
  return list.reduce((discountTotal, currentItem) => new Money(discountTotal)
    .add(currentItem.discountValue).getAmount(), 0);
}

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
    const valueWithoutDiscount = new Money(this.unitPrice).multiply(numberOfUnits);
    const listOfDiscounts = await this.calculateDiscount(numberOfUnits);
    const totalOfDiscounts = getSumOfDiscounts(listOfDiscounts);
    const purchaseValue = valueWithoutDiscount
      .subtract(totalOfDiscounts)
      .getAmount();

    return {
      purchaseValue,
      discounts: listOfDiscounts,
    };
  }

  calculateDiscount(numberOfUnits) {
    return this.discountRules
      .reduce(async (accumulator, currentDiscountRule) => {
        const accumulatorValue = await accumulator;
        const isApplicable = await currentDiscountRule.isApplicable(numberOfUnits);
        if (isApplicable) {
          const discount = await currentDiscountRule.getDiscountValue(numberOfUnits);
          return [
            ...accumulatorValue,
            {
              ...discount,
              description: currentDiscountRule.description,
            },
          ];
        }
        return Promise.resolve([...accumulatorValue]);
      }, Promise.resolve([]));
  }
}

export default Product;
