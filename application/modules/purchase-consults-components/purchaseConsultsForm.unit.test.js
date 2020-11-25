import { shallowMount } from '@vue/test-utils';
import { getInputComponentByLabel, getButtonComponentByText } from '../../../tests/utils';
import { PurchaseConsultsForm } from '.';

const getRouterMock = () => ({
  push: jest.fn(),
});

function shallowMountComponent(routerMock) {
  return shallowMount(PurchaseConsultsForm, {
    mocks: {
      $router: routerMock || getRouterMock(),
    },
  });
}

const getNumberOfConsultsMock = () => 10;

describe('PurchaseConsultsForm', () => {
  it('should render number input as expected', async () => {
    const wrapper = await shallowMountComponent();

    const numberInput = getInputComponentByLabel(wrapper, 'Número de consultas', 'MmNumberInput');

    expect(numberInput.attributes().min).toBe('1');
    expect(numberInput.props().customValidations[0].errorMessage).toBe('Insira ao menos uma unidade');
  });

  it('should validate number of consults number input', async () => {
    const wrapper = await shallowMountComponent();

    const numberInput = getInputComponentByLabel(wrapper, 'Número de consultas', 'MmNumberInput');
    const [customValidation] = numberInput.props().customValidations;

    expect(customValidation.validate(1)).toBe(true);
    expect(customValidation.validate(0)).toBe(false);
  });

  it('should emit "number-of-consults-change" event when update to a valid number', async () => {
    const wrapper = await shallowMountComponent();

    const numberInput = getInputComponentByLabel(wrapper, 'Número de consultas', 'MmNumberInput');
    numberInput.vm.$emit('input', getNumberOfConsultsMock());

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('number-of-consults-change').length).toBe(1);
    expect(wrapper.emitted('number-of-consults-change')).toEqual([[getNumberOfConsultsMock()]]);
  });

  it('should not emit "number-of-consults-change" event when update to a invalid number', async () => {
    const wrapper = await shallowMountComponent();

    const numberInput = getInputComponentByLabel(wrapper, 'Número de consultas', 'MmNumberInput');
    numberInput.vm.$emit('input', 0);

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('number-of-consults-change')).toBe(undefined);
  });

  it('should submit purchase consults form', async () => {
    const wrapper = await shallowMountComponent();

    const form = wrapper.findComponent({ name: 'MmForm' });
    const numberInput = getInputComponentByLabel(wrapper, 'Número de consultas', 'MmNumberInput');
    numberInput.vm.$emit('input', getNumberOfConsultsMock());

    await form.props().onSubmit();

    expect(wrapper.emitted('select-number-of-consults').length).toBe(1);
    expect(wrapper.emitted('select-number-of-consults')).toEqual([[getNumberOfConsultsMock()]]);
  });

  it('should redirect to ConsultsView when click on back button', async () => {
    const router = getRouterMock();
    const wrapper = await shallowMountComponent(router);

    const backButton = getButtonComponentByText(wrapper, 'Voltar', 'MmButton');
    backButton.vm.$emit('click');
    await wrapper.vm.$nextTick();

    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith({ name: 'ConsultsView' });
  });

  it('should render expected submit button', async () => {
    const router = getRouterMock();
    const wrapper = await shallowMountComponent(router);

    const submitButton = getButtonComponentByText(wrapper, 'Avançar');

    expect(submitButton.isVisible()).toBe(true);
  });
});
