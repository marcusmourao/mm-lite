import { shallowMount } from '@vue/test-utils';
import { purchaseConsults } from '../purchase-consults-lib';
import { PurchaseConsultsForm, PurchasesConsultsSummary } from '../purchase-consults-components';
import { PurchaseForm } from '../purchase-componens';
import MmHeading from '../../../components/heading';
import BuyConsultsView from './BuyConsultsView.vue';

jest.mock('../purchase-consults-lib', () => ({
  purchaseConsults: jest.fn(),
}));

function getRouterMock() {
  return {
    push: jest.fn(),
  };
}

function getNumberOfConsultsMock() {
  return 10;
}

async function propagateEvents(wrapper) {
  await wrapper.vm.$nextTick();
  await wrapper.vm.$nextTick();
  await wrapper.vm.$nextTick();
}

function getPurchaseMock() {
  return {
    name: 'Mock name',
    identifier: 'Mock identifier',
    cardNumber: 'mock card number',
    expirationDate: 'mock expiration date',
    verificationCode: 'mock verification code',
  };
}

function getPurchaseMapMock() {
  return {
    customerInfo: {
      identifier: 'Mock identifier',
      name: 'Mock name',
    },
    numberOfItems: 10,
    paymentInfo: {
      cardNumber: 'mock card number',
      expirationDate: 'mock expiration date',
      verificationCode: 'mock verification code',
    },
  };
}

function shallowMountComponent() {
  return shallowMount(BuyConsultsView, {
    mocks: {
      $router: getRouterMock(),
    },
  });
}

describe('BuyConsultsView', () => {
  it('should render page title', async () => {
    const wrapper = shallowMountComponent();

    const title = wrapper.findComponent(MmHeading);

    expect(title.text()).toBe('Comprar consultas');
  });

  it('should render purchase consults form when number of consults is not set', () => {
    const wrapper = shallowMountComponent();

    const purchaseConsultsForm = wrapper.findComponent(PurchaseConsultsForm);

    expect(purchaseConsultsForm.isVisible()).toBe(true);
  });

  it('should update purchase summary when number of consults change', async () => {
    const wrapper = shallowMountComponent();

    const purchaseConsultsForm = wrapper.findComponent(PurchaseConsultsForm);
    const purchaseSummary = wrapper.findComponent(PurchasesConsultsSummary);
    purchaseConsultsForm.vm.$emit('number-of-consults-change', getNumberOfConsultsMock());

    await propagateEvents(wrapper);

    expect(purchaseSummary.isVisible()).toBe(true);
    expect(purchaseSummary.props().numberOfConsults).toBe(getNumberOfConsultsMock());
  });

  it('should render purchase consults form when purchase form trigger cancel event', async () => {
    const wrapper = shallowMountComponent();

    const purchaseConsultsForm = wrapper.findComponent(PurchaseConsultsForm);
    purchaseConsultsForm.vm.$emit('select-number-of-consults', getNumberOfConsultsMock());
    await propagateEvents(wrapper);

    const purchaseForm = wrapper.findComponent(PurchaseForm);
    purchaseForm.vm.$emit('cancel');
    await propagateEvents(wrapper);

    expect(purchaseForm.exists()).toBe(false);
    expect(wrapper.findComponent(PurchaseConsultsForm).isVisible()).toBe(true);
  });

  it('should render purchase form when select number of consults', async () => {
    const wrapper = shallowMountComponent();

    const purchaseConsultsForm = wrapper.findComponent(PurchaseConsultsForm);
    purchaseConsultsForm.vm.$emit('select-number-of-consults', getNumberOfConsultsMock());
    await propagateEvents(wrapper);

    const purchaseForm = wrapper.findComponent(PurchaseForm);

    expect(purchaseForm.isVisible()).toBe(true);
    expect(purchaseConsultsForm.exists()).toBe(false);
  });

  it('should purchase consults on purchase form submit', async () => {
    purchaseConsults.mockResolvedValue();
    const wrapper = shallowMountComponent();

    const purchaseConsultsForm = wrapper.findComponent(PurchaseConsultsForm);
    purchaseConsultsForm.vm.$emit('select-number-of-consults', getNumberOfConsultsMock());
    await propagateEvents(wrapper);
    const purchaseForm = wrapper.findComponent(PurchaseForm);
    await purchaseForm.props().onSubmit(getPurchaseMock());

    expect(purchaseConsults).toHaveBeenCalledTimes(1);
    expect(purchaseConsults).toHaveBeenCalledWith(getPurchaseMapMock());
  });
});
