import Product from '../../../../core/product';
import Money from '../../../../core/money';
import { getTotalNumberOfConsults } from '../../../consults/actions';

const MAJOR_DISCOUNT_LIMIT = 1000;
const MINOR_DISCOUNT_LIMIT = MAJOR_DISCOUNT_LIMIT + 1000;
const DISCOUNT_PER_UNIT_ON_MAJOR_DISCOUNT = 0.15;
const DISCOUNT_PER_UNIT_ON_MINOR_DISCOUNT = 0.08;
const MAJOR_DISCOUNT_DESCRIPTION = 'R$ 0.09/uni nas primeiras 1.000 consultas.';
const MINOR_DISCOUNT_DESCRIPTION = 'R$ 0.16/uni nas primeiras 1.000 consultas.';

async function isMajorDiscountApplicable() {
  const totalOfConsults = await getTotalNumberOfConsults();
  return totalOfConsults < MAJOR_DISCOUNT_LIMIT;
}

async function isMinorDiscountApplicable(numberOfUnits) {
  const totalOfConsults = await getTotalNumberOfConsults();
  return (totalOfConsults + numberOfUnits) > MAJOR_DISCOUNT_LIMIT
    && totalOfConsults < MINOR_DISCOUNT_LIMIT;
}

async function getMajorDiscount(numberOfUnits) {
  const discountPerUnit = DISCOUNT_PER_UNIT_ON_MAJOR_DISCOUNT;
  const totalOfConsults = await getTotalNumberOfConsults();
  const numberOfUnitsAllowedToReceiveDiscount = MAJOR_DISCOUNT_LIMIT - totalOfConsults;
  const numberOfItemsWithDiscount = Math.min(numberOfUnitsAllowedToReceiveDiscount, numberOfUnits);
  const discountValue = new Money(discountPerUnit)
    .multiply(numberOfItemsWithDiscount)
    .getAmount();

  return {
    discountValue,
    numberOfItemsWithDiscount,
  };
}

async function getMinorDiscount(numberOfUnits) {
  const discountPerUnit = DISCOUNT_PER_UNIT_ON_MINOR_DISCOUNT;
  const majorDiscount = await getMajorDiscount(numberOfUnits, true);
  const numberOfUnitsAfterMajorDiscount = numberOfUnits - majorDiscount.numberOfItemsWithDiscount;

  const maxNumberOfUnitsAllowedToReceiveDiscount = (MINOR_DISCOUNT_LIMIT - MAJOR_DISCOUNT_LIMIT);

  const numberOfItemsWithDiscount = Math.min(
    maxNumberOfUnitsAllowedToReceiveDiscount,
    numberOfUnitsAfterMajorDiscount,
  );

  const discountValue = new Money(discountPerUnit)
    .multiply(numberOfItemsWithDiscount)
    .getAmount();

  return {
    discountValue,
    numberOfItemsWithDiscount,
  };
}
const consult = new Product({
  id: 'CONSULT',
  unitPrice: 0.24,
  discountRules: [
    {
      description: MAJOR_DISCOUNT_DESCRIPTION,
      isApplicable: () => isMajorDiscountApplicable(),
      getDiscountValue: (numberOfUnits) => getMajorDiscount(numberOfUnits),
    },

    {
      description: MINOR_DISCOUNT_DESCRIPTION,
      isApplicable: (numberOfUnits) => isMinorDiscountApplicable(numberOfUnits),
      getDiscountValue: (numberOfUnits) => getMinorDiscount(numberOfUnits),
    },
  ],
});

export default consult;
