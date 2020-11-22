import Money from '.';

describe('Money', () => {
  describe('integer flow', () => {
    it('should create a money instance with expected amount', () => {
      const money = new Money(100);

      expect(money.getAmount()).toBe(100);
    });

    it('should add value once', () => {
      const money = new Money(100);

      money.add(200);

      expect(money.getAmount()).toBe(300);
    });

    it('should add value multiple times', () => {
      const money = new Money(100);

      money.add(200)
        .add(250)
        .add(1075);

      expect(money.getAmount()).toBe(1625);
    });

    it('should subtract value once', () => {
      const money = new Money(100);

      money.subtract(5);

      expect(money.getAmount()).toBe(95);
    });

    it('should subtract value multiple times', () => {
      const money = new Money(100);

      money.subtract(5)
        .subtract(4)
        .subtract(3);

      expect(money.getAmount()).toBe(88);
    });

    it('should multiply value once', () => {
      const money = new Money(100);

      money.multiply(5);

      expect(money.getAmount()).toBe(500);
    });

    it('should multiply value multiple times', () => {
      const money = new Money(100);

      money.multiply(5)
        .multiply(4)
        .multiply(3);

      expect(money.getAmount()).toBe(6000);
    });

    it('should divide value once', () => {
      const money = new Money(100);

      money.divide(5);

      expect(money.getAmount()).toBe(20);
    });

    it('should divide value multiple times', () => {
      const money = new Money(100);

      money.divide(5)
        .divide(4)
        .divide(5);

      expect(money.getAmount()).toBe(1);
    });
  });

  describe('float flow', () => {
    it('should create a money instance with expected amount', () => {
      const money = new Money(0.25);

      expect(money.getAmount()).toBe(0.25);
    });

    it('should add value once', () => {
      const money = new Money(0.25);

      money.add(0.32);

      expect(money.getAmount()).toBe(0.57);
    });

    it('should add value multiple times', () => {
      const money = new Money(0.25);

      money.add(0.25)
        .add(0.33)
        .add(5.37);

      expect(money.getAmount()).toBe(6.2);
    });

    it('should subtract value once', () => {
      const money = new Money(0.25);

      money.subtract(0.05);

      expect(money.getAmount()).toBe(0.20);
    });

    it('should subtract value multiple times', () => {
      const money = new Money(0.25);

      money.subtract(0.05)
        .subtract(0.04)
        .subtract(0.03);

      expect(money.getAmount()).toBe(0.13);
    });

    it('should multiply value once', () => {
      const money = new Money(0.25);

      money.multiply(5);

      expect(money.getAmount()).toBe(1.25);
    });

    it('should multiply value multiple times', () => {
      const money = new Money(0.25);

      money.multiply(5)
        .multiply(4)
        .multiply(3);

      expect(money.getAmount()).toBe(15);
    });

    it('should divide value once', () => {
      const money = new Money(0.25);

      money.divide(5);

      expect(money.getAmount()).toBe(0.05);
    });

    it('should divide value multiple times', () => {
      const money = new Money(0.25);

      money.divide(5)
        .divide(5);

      expect(money.getAmount()).toBe(0.01);
    });
  });
});
