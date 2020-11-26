import Dinero from 'dinero.js';

Dinero.globalLocale = 'pt-BR';
Dinero.defaultCurrency = 'BRL';

function convertValue(value) {
  const localValue = Math.round(value * 100);
  return Dinero({ amount: localValue, precision: 2 });
}

class Money {
  constructor(value) {
    this.money = convertValue(value);
  }

  add(value) {
    this.money = this.money.add(convertValue(value));
    return this;
  }

  subtract(value) {
    this.money = this.money.subtract(convertValue(value));
    return this;
  }

  multiply(value) {
    this.money = this.money.multiply(value);
    return this;
  }

  divide(value) {
    this.money = this.money.divide(value);
    return this;
  }

  getAmount() {
    return (this.money.getAmount()) / 100;
  }

  toFormat({ withSymbol } = {}) {
    const mask = withSymbol ? '$0,0.00' : '0,0.00';
    return this.money.toFormat(mask);
  }
}

export default Money;
