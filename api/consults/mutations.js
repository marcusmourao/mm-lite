import state from './state';

function createNewConsult() {
  return Symbol('consult');
}

export function getAvailableConsults() {
  return state.available;
}

export function getUsedConsults() {
  return state.used;
}

export function addConsults(numberOfConsults) {
  const consults = new Array(numberOfConsults).fill(createNewConsult());
  state.available = [
    ...state.available,
    ...consults,
  ];
}

export function consumeConsult() {
  const [consumedConsult] = getAvailableConsults();
  state.available = state.available.slice(1);
  state.used = [
    ...state.used,
    consumedConsult,
  ];
}
