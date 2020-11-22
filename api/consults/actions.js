import * as mutations from './mutations';

const MIN_VALUE_TO_CONSUME_AN_CONSULT = 1;
const INSUFFICIENT_NUMBER_OF_CONSULTS_MESSAGE = 'insufficient number of consults available';

export async function getConsultsTotals() {
  const availableConsults = mutations.getAvailableConsults();
  const usedConsults = mutations.getUsedConsults();
  return {
    available: availableConsults.length,
    used: usedConsults.length,
  };
}

export async function getTotalNumberOfConsults() {
  const { available, used } = await getConsultsTotals();
  return available + used;
}

export async function addConsults(numberOfConsults) {
  return mutations.addConsults(numberOfConsults);
}

export async function useConsult() {
  const { length } = mutations.getAvailableConsults();

  if (length >= MIN_VALUE_TO_CONSUME_AN_CONSULT) {
    return mutations.consumeConsult();
  }

  return Promise.reject(INSUFFICIENT_NUMBER_OF_CONSULTS_MESSAGE);
}
