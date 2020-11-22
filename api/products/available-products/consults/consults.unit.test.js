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
      const price = await consult.calculatePurchasePrice(1);

      expect(price).toBe(0.09);
    });

    it('should calculate purchase price for 2 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(0);
      const price = await consult.calculatePurchasePrice(2);

      expect(price).toBe(0.18);
    });

    it('should calculate purchase price for 1000 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(0);
      const price = await consult.calculatePurchasePrice(1000);

      expect(price).toBe(90);
    });

    it('should calculate purchase price for 2000 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(0);
      const price = await consult.calculatePurchasePrice(2000);

      expect(price).toBe(250);
    });

    it('should calculate purchase price for 2500 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(0);
      const price = await consult.calculatePurchasePrice(2500);

      expect(price).toBe(370);
    });

    it('should calculate purchase price for 10000 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(0);
      const price = await consult.calculatePurchasePrice(10000);

      expect(price).toBe(2170);
    });
  });

  describe('when user have bought less than major discount limit', () => {
    it('should calculate purchase price for 1 unit', async () => {
      getTotalNumberOfConsults.mockResolvedValue(500);
      const price = await consult.calculatePurchasePrice(1);

      expect(price).toBe(0.09);
    });

    it('should calculate purchase price for 2 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(500);
      const price = await consult.calculatePurchasePrice(2);

      expect(price).toBe(0.18);
    });

    it('should calculate purchase price for 1000 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(500);
      const price = await consult.calculatePurchasePrice(1000);

      expect(price).toBe(165);
    });

    it('should calculate purchase price for 2000 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(500);
      const price = await consult.calculatePurchasePrice(2000);

      expect(price).toBe(325);
    });

    it('should calculate purchase price for 2500 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(500);
      const price = await consult.calculatePurchasePrice(2500);

      expect(price).toBe(445);
    });

    it('should calculate purchase price for 10000 units', async () => {
      getTotalNumberOfConsults.mockResolvedValue(500);
      const price = await consult.calculatePurchasePrice(10000);

      expect(price).toBe(2245);
    });
  });
});
