import * as consultsActions from '../../../api/consults/actions';
import { getConsultsTotals } from '.';

jest.mock('../../../api/consults/actions');

const getConsultsTotalsMock = () => ({
  used: 10,
  available: 50,
});

describe('consultsService', () => {
  describe('getConsultsTotals', () => {
    consultsActions.getConsultsTotals.mockResolvedValue(getConsultsTotalsMock());
    it('should get consults total', async () => {
      const consultsTotals = await getConsultsTotals();

      expect(consultsTotals.used).toBe(10);
      expect(consultsTotals.available).toBe(50);
      expect(consultsTotals.total).toBe(60);
    });
  });
});
