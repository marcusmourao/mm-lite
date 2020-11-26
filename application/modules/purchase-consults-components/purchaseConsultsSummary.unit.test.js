import { shallowMount } from '@vue/test-utils';
import { calculateConsultsPurchasePrice, getConsultProduct } from '../purchase-consults-lib';
import MmParagraph from '../../../components/paragraph';
import { PurchasesConsultsSummary } from '.';

jest.mock('../purchase-consults-lib');

const getNumberOfConsultsMock = () => 10;
const getConsultsProductMock = () => ({
  unitPrice: 0.24,
});
const getPurchasePriceMock = () => ({
  purchaseValue: 2.40,
  discounts: [],
});

function shallowMountComponent(props) {
  return shallowMount(PurchasesConsultsSummary, {
    propsData: {
      ...props,
    },
  });
}

describe('PurchaseConsultsSummary', () => {
  beforeEach(() => {
    getConsultProduct.mockReset();
    calculateConsultsPurchasePrice.mockReset();
    getConsultProduct.mockResolvedValue(getConsultsProductMock());
    calculateConsultsPurchasePrice.mockResolvedValue(getPurchasePriceMock());
  });

  it('should get consults price on mount', async () => {
    const numberOfConsults = getNumberOfConsultsMock();
    const wrapper = shallowMountComponent({ numberOfConsults });
    await wrapper.vm.$nextTick();

    expect(getConsultProduct).toHaveBeenCalledTimes(1);
  });

  it('should calculate purchase price on mount consults price on mount', async () => {
    const numberOfConsults = getNumberOfConsultsMock();
    const wrapper = shallowMountComponent({ numberOfConsults });
    await wrapper.vm.$nextTick();

    expect(calculateConsultsPurchasePrice).toHaveBeenCalledTimes(1);
    expect(calculateConsultsPurchasePrice).toHaveBeenCalledWith(getNumberOfConsultsMock());
  });

  it('should recalculate purchase price when number of consults change', async () => {
    const numberOfConsults = getNumberOfConsultsMock();
    const wrapper = shallowMountComponent({ numberOfConsults });
    await wrapper.vm.$nextTick();

    expect(calculateConsultsPurchasePrice).toHaveBeenCalledTimes(1);
    expect(calculateConsultsPurchasePrice).toHaveBeenCalledWith(getNumberOfConsultsMock());

    wrapper.setProps({ numberOfConsults: 20 });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(calculateConsultsPurchasePrice).toHaveBeenCalledTimes(2);
    expect(calculateConsultsPurchasePrice).toHaveBeenLastCalledWith(20);
  });

  it('should render error message when it is not able to calculate purchase price', async () => {
    calculateConsultsPurchasePrice.mockRejectedValue();
    const numberOfConsults = getNumberOfConsultsMock();
    const wrapper = shallowMountComponent({ numberOfConsults });
    await wrapper.vm.$nextTick();

    const errorMessage = wrapper.findComponent(MmParagraph);
    expect(errorMessage.text()).toBe('Ops, algo deu errado ao calcular o preço da sua compra');
  });
});
