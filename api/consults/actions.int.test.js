import { getConsultsTotals, addConsults, useConsult } from './actions';

describe('consults::actions', () => {
  it('should get consults totals', async () => {
    const { available, used } = await getConsultsTotals();

    expect(available).toBe(0);
    expect(used).toBe(0);
  });

  it('should get consults totals after add some consults', async () => {
    await addConsults(2);
    const { available, used } = await getConsultsTotals();

    expect(available).toBe(2);
    expect(used).toBe(0);
  });

  it('should consume totals when it is available', async () => {
    await useConsult();
    const { available, used } = await getConsultsTotals();

    expect(available).toBe(1);
    expect(used).toBe(1);

    await useConsult();
    const consultsTotal = await getConsultsTotals();

    expect(consultsTotal.available).toBe(0);
    expect(consultsTotal.used).toBe(2);
  });

  it('should reject when is not possible to consume an consult', async () => {
    await expect(useConsult()).rejects.toBe('insufficient number of consults available');

    const { available, used } = await getConsultsTotals();

    expect(available).toBe(0);
    expect(used).toBe(2);
  });
});
