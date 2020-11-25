import consult from './consult';
import { getTotalNumberOfConsults } from '../../../consults/actions';

jest.mock('../../../consults/actions');

describe('product::consult', () => {
  beforeEach(() => {
    getTotalNumberOfConsults.mockReset();
  });

  describe('when user do not have bought any consult yet', () => {
    it('should calculate purchase price for 1 unit', async () => {
      getTotalNumberOfConsults.mockResolvedValue(0);
      const { purchaseValue } = await consult.calculatePurchasePrice(1);

      expect(purchaseValue).toEqual(0.09);
    });

    it('should calculate purchase price for 2 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(0);
      const { purchaseValue } = await consult.calculatePurchasePrice(2);

      expect(purchaseValue).toBe(0.18);
    });

    it('should calculate purchase price for 1000 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(0);
      const { purchaseValue } = await consult.calculatePurchasePrice(1000);

      expect(purchaseValue).toBe(90);
    });

    it('should calculate purchase price for 2000 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(0);
      const { purchaseValue } = await consult.calculatePurchasePrice(2000);

      expect(purchaseValue).toBe(250);
    });

    it('should calculate purchase price for 2500 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(0);
      const { purchaseValue } = await consult.calculatePurchasePrice(2500);

      expect(purchaseValue).toBe(370);
    });

    it('should calculate purchase price for 10000 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(0);
      const { purchaseValue } = await consult.calculatePurchasePrice(10000);

      expect(purchaseValue).toBe(2170);
    });
  });

  describe('when user have bought less than major discount limit', () => {
    it('should calculate purchase price for 1 unit', async () => {
      getTotalNumberOfConsults.mockResolvedValue(500);
      const { purchaseValue } = await consult.calculatePurchasePrice(1);

      expect(purchaseValue).toBe(0.09);
    });

    it('should calculate purchase price for 2 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(500);
      const { purchaseValue } = await consult.calculatePurchasePrice(2);

      expect(purchaseValue).toBe(0.18);
    });

    it('should calculate purchase price for 1000 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(500);
      const { purchaseValue } = await consult.calculatePurchasePrice(1000);

      expect(purchaseValue).toBe(125);
    });

    it('should calculate purchase price for 2000 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(500);
      const { purchaseValue } = await consult.calculatePurchasePrice(2000);

      expect(purchaseValue).toBe(325);
    });

    it('should calculate purchase price for 2500 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(500);
      const { purchaseValue } = await consult.calculatePurchasePrice(2500);

      expect(purchaseValue).toBe(445);
    });

    it('should calculate purchase price for 10000 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(500);
      const { purchaseValue } = await consult.calculatePurchasePrice(10000);

      expect(purchaseValue).toBe(2245);
    });
  });

  describe('when user have bought major discount limit', () => {
    it('should calculate purchase price for 1 unit', async () => {
      getTotalNumberOfConsults.mockResolvedValue(1000);
      const { purchaseValue } = await consult.calculatePurchasePrice(1);

      expect(purchaseValue).toBe(0.16);
    });

    it('should calculate purchase price for 2 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(1000);
      const { purchaseValue } = await consult.calculatePurchasePrice(2);

      expect(purchaseValue).toBe(0.32);
    });

    it('should calculate purchase price for 1000 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(1000);
      const { purchaseValue } = await consult.calculatePurchasePrice(1000);

      expect(purchaseValue).toBe(160);
    });

    it('should calculate purchase price for 2000 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(1000);
      const { purchaseValue } = await consult.calculatePurchasePrice(2000);

      expect(purchaseValue).toBe(400);
    });

    it('should calculate purchase price for 2500 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(1000);
      const { purchaseValue } = await consult.calculatePurchasePrice(2500);

      expect(purchaseValue).toBe(520);
    });

    it('should calculate purchase price for 10000 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(1000);
      const { purchaseValue } = await consult.calculatePurchasePrice(10000);

      expect(purchaseValue).toBe(2320);
    });
  });

  describe('when user have bought more than discounts limits', () => {
    it('should calculate purchase price for 1 unit', async () => {
      getTotalNumberOfConsults.mockResolvedValue(2000);
      const { purchaseValue } = await consult.calculatePurchasePrice(1);

      expect(purchaseValue).toBe(0.24);
    });

    it('should calculate purchase price for 2 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(2000);
      const { purchaseValue } = await consult.calculatePurchasePrice(2);

      expect(purchaseValue).toBe(0.48);
    });

    it('should calculate purchase price for 1000 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(2000);
      const { purchaseValue } = await consult.calculatePurchasePrice(1000);

      expect(purchaseValue).toBe(240);
    });

    it('should calculate purchase price for 2000 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(2000);
      const { purchaseValue } = await consult.calculatePurchasePrice(2000);

      expect(purchaseValue).toBe(480);
    });

    it('should calculate purchase price for 2500 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(2000);
      const { purchaseValue } = await consult.calculatePurchasePrice(2500);

      expect(purchaseValue).toBe(600);
    });

    it('should calculate purchase price for 10000 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(2000);
      const { purchaseValue } = await consult.calculatePurchasePrice(10000);

      expect(purchaseValue).toBe(2400);
    });
  });
});
