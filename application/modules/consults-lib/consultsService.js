import { getConsultsTotals as getConsultsTotalsAction } from '../../../api/consults/actions';

// eslint-disable-next-line import/prefer-default-export
export function getConsultsTotals() {
  return getConsultsTotalsAction().then(({ used, available }) => ({
    used,
    available,
    total: used + available,
  }));
}
