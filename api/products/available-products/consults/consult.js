import Product from '../../../../core/product';
import Money from '../../../../core/money';
import { getTotalNumberOfConsults } from '../../../consults/actions';

const MAJOR_DISCOUNT_LIMIT = 1000;
const MINOR_DISCOUNT_LIMIT = MAJOR_DISCOUNT_LIMIT + 1000;
const DISCOUNT_PER_UNIT_ON_MAJOR_DISCOUNT = 0.15;
const DISCOUNT_PER_UNIT_ON_MINOR_DISCOUNT = 0.08;

async function isMajorDiscountApplicable() {
  const totalOfConsults = await getTotalNumberOfConsults();
  return totalOfConsults < MAJOR_DISCOUNT_LIMIT;
}

async function isMinorDiscountApplicable(numberOfUnits) {
  const totalOfConsults = await getTotalNumberOfConsults();
  return (totalOfConsults + numberOfUnits) > MAJOR_DISCOUNT_LIMIT
    && totalOfConsults < MINOR_DISCOUNT_LIMIT;
}

async function getMajorDiscountValue(numberOfUnits) {
  const discountPerUnit = DISCOUNT_PER_UNIT_ON_MAJOR_DISCOUNT;
  const totalOfConsults = await getTotalNumberOfConsults();
  const numberOfUnitsAllowedToReceiveDiscount = MAJOR_DISCOUNT_LIMIT - totalOfConsults;
  const numberOfItemsWithDiscount = Math.min(numberOfUnitsAllowedToReceiveDiscount, numberOfUnits);
  return new Money(discountPerUnit)
    .multiply(numberOfItemsWithDiscount)
    .getAmount();
}

async function getMinorDiscountValue(numberOfUnits) {
  const totalOfConsults = await getTotalNumberOfConsults();
  const totalOfConsultsAfterMajorDiscount = (totalOfConsults - MAJOR_DISCOUNT_LIMIT);
  const discountPerUnit = DISCOUNT_PER_UNIT_ON_MINOR_DISCOUNT;
  let maxNumberOfUnitsAllowedToReceiveDiscount = (MINOR_DISCOUNT_LIMIT - MAJOR_DISCOUNT_LIMIT);
  const numberOfUnitsAfterMajorDiscount = numberOfUnits - MAJOR_DISCOUNT_LIMIT;

  if (totalOfConsultsAfterMajorDiscount > 0) {
    maxNumberOfUnitsAllowedToReceiveDiscount -= totalOfConsultsAfterMajorDiscount;
  }

  const numberOfItemsWithDiscount = Math.min(
    maxNumberOfUnitsAllowedToReceiveDiscount,
    numberOfUnitsAfterMajorDiscount,
  );

  return new Money(discountPerUnit)
    .multiply(numberOfItemsWithDiscount)
    .getAmount();
}

const consult = new Product({
  id: 'CONSULT',
  unitPrice: 0.24,
  discountRules: [
    {
      isApplicable: () => isMajorDiscountApplicable,
      getDiscountValue: (numberOfUnits) => getMajorDiscountValue(numberOfUnits),
    },

    {
      isApplicable: (numberOfUnits) => isMinorDiscountApplicable(numberOfUnits),
      getDiscountValue: (numberOfUnits) => getMinorDiscountValue(numberOfUnits),
    },
  ],
});

export default consult;
