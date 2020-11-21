import Product from '../../../../core/product';
import Money from '../../../../core/money';
import { getTotalNumberOfConsults } from '../../../consults/actions';

const MAJOR_DISCOUNT_LIMIT = 1000;
const MINOR_DISCOUNT_LIMIT = MAJOR_DISCOUNT_LIMIT + 1000;
const DISCOUNT_PER_UNIT_ON_MAJOR_DISCOUNT = 0.15;
// const DISCOUNT_PER_UNIT_ON_MAJOR_DISCOUNT = 0.08;

async function isMajorDiscountApplicable() {
  const totalOfConsults = await getTotalNumberOfConsults();
  return totalOfConsults < MAJOR_DISCOUNT_LIMIT;
}

async function getMajorDiscountValue(numberOfUnits) {
  const discountPerUnit = DISCOUNT_PER_UNIT_ON_MAJOR_DISCOUNT;
  const totalOfConsults = await getTotalNumberOfConsults();
  const numberOfUnitsAllowedToReceiveDiscount = MAJOR_DISCOUNT_LIMIT - totalOfConsults;
  const numberOfItemsWithDiscount = numberOfUnitsAllowedToReceiveDiscount < numberOfUnits
    ? numberOfUnitsAllowedToReceiveDiscount : numberOfUnits;
  return new Money(discountPerUnit)
    .multiply(numberOfItemsWithDiscount)
    .getAmount();
}

// function isMinorDiscountApplicable(totalOfConsults, numberOfItemsRequired) {
//   return (totalOfConsults + numberOfItemsRequired) > MAJOR_DISCOUNT_LIMIT
//     && totalOfConsults < MINOR_DISCOUNT_LIMIT;
// }

const consult = new Product({
  id: 'CONSULT',
  unitPrice: 0.24,
  discountRules: [
    {
      isApplicable: () => isMajorDiscountApplicable,
      getDiscountValue: (numberOfUnits) => getMajorDiscountValue(numberOfUnits),
    },
  ],
});

export default consult;
