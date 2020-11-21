// TODO - Create a product generic class

class Consult {
  constructor() {
    this.id = 'CONSULT';
    this.unitPrice = 0.24;
  }

  calculatePurchasePrice(numberOfItems) {
    return this.unitPrice * numberOfItems;
  }

  getId() {
    return this.id;
  }

  getInfo() {
    return this.id;
  }
}

const consult = new Consult();
export default consult;
