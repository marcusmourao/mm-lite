import { shallowMount } from '@vue/test-utils';
import { getButtonComponentByText, getInputComponentByLabel } from '../../../tests/utils';
import { PurchaseForm } from '.';

const getIdentifierMock = () => '88427509000166';
const getCardNameMock = () => 'Mock card name';
const getCardNumberMock = () => '5205236988655355';
const getExpirationDateMock = () => '112028';
const getVerificationCodeMock = () => '822';
const getOnSubmitMock = () => jest.fn().mockResolvedValue();

async function fillFormWithPurchaseInputs(wrapper) {
  const identifierInput = getInputComponentByLabel(wrapper, 'CNPJ', 'MmMaskedInput');
  const nameInput = getInputComponentByLabel(wrapper, 'Titular do cartão');
  const cardNumberInput = getInputComponentByLabel(wrapper, 'Número do cartão', 'MmMaskedInput');
  const expirationDateInput = getInputComponentByLabel(wrapper, 'Data de vencimento', 'MmMaskedInput');
  const verificationCodeInput = getInputComponentByLabel(wrapper, 'CVV', 'MmMaskedInput');

  identifierInput.vm.$emit('input', getIdentifierMock());
  nameInput.vm.$emit('input', getCardNameMock());
  cardNumberInput.vm.$emit('input', getCardNumberMock());
  expirationDateInput.vm.$emit('input', getExpirationDateMock());
  verificationCodeInput.vm.$emit('input', getVerificationCodeMock());

  await wrapper.vm.$nextTick();
}

async function shallowMountComponent(props) {
  const wrapper = shallowMount(PurchaseForm, {
    propsData: {
      ...props,
    },
  });
  await wrapper.vm.$nextTick();
  return wrapper;
}

describe('PurchaseForm', () => {
  it('should render purchase form', async () => {
    const onSubmit = getOnSubmitMock();
    const wrapper = await shallowMountComponent({ onSubmit });

    const form = wrapper.findComponent({ name: 'MmForm' });
    await form.props().onSubmit();

    expect(form.isVisible()).toBe(true);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should submit purchase form', async () => {
    const onSubmit = getOnSubmitMock();
    const wrapper = await shallowMountComponent({ onSubmit });

    const form = wrapper.findComponent({ name: 'MmForm' });
    await fillFormWithPurchaseInputs(wrapper);
    await form.props().onSubmit();

    expect(form.isVisible()).toBe(true);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      identifier: getIdentifierMock(),
      name: getCardNameMock(),
      cardNumber: getCardNumberMock(),
      expirationDate: getExpirationDateMock(),
      verificationCode: getVerificationCodeMock(),
    });
  });

  it('should render trigger cancel event when click on cancel button', async () => {
    const onSubmit = getOnSubmitMock();
    const wrapper = await shallowMountComponent({ onSubmit });

    const cancelButton = getButtonComponentByText(wrapper, 'Cancelar', 'MmButton');
    cancelButton.vm.$emit('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().cancel.length).toBe(1);
  });

  it('should render expected submit button', async () => {
    const onSubmit = getOnSubmitMock();
    const wrapper = await shallowMountComponent({ onSubmit });

    const submitButton = getButtonComponentByText(wrapper, 'Finalizar compra');

    expect(submitButton.isVisible()).toBe(true);
  });
});
