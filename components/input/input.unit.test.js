import { mount } from '@vue/test-utils';
import MmField from '../field';
import MmInput from '.';

const getLabelMock = () => 'First Name';
const getCustomValidationsMock = () => [
  { validate: (value) => value === 'correct', errorMessage: 'Invalid value' },
];
const getRequiredMock = () => false;
const getPlaceholderMock = () => 'my placeholder';

function mountComponent(props) {
  return mount(MmInput, {
    propsData: {
      label: getLabelMock(),
      ...props,
    },
    provide() {
      return {
        fieldVm: {
          isRequired: false,
          setErrorMessage: jest.fn(),
          setValidation: jest.fn(),
          enableFeedbackValidation: jest.fn(),
        },
        formVm: { registerField: jest.fn() },
      };
    },
  });
}

function mountTemplate(props) {
  return mount({
    template: `
      <mm-field :label="label" :required="required">
        <mm-input
          v-model="value" 
          :placeholder="placeholder"
          :custom-validations="customValidations" />
      </mm-field>
    `,
    data() {
      return {
        value: '',
        label: getLabelMock(),
        customValidations: getCustomValidationsMock(),
        required: getRequiredMock(),
        placeholder: getPlaceholderMock(),
        ...props,
      };
    },
    components: {
      MmField,
      MmInput,
    },
    provide() {
      return {
        formVm: { registerField: jest.fn() },
      };
    },
  });
}

describe('mm-input', () => {
  it('should render component wrapper with expected css classes', () => {
    const wrapper = mountComponent();
    expect(wrapper.classes()).toContain('mm-input');
    wrapper.destroy();
  });

  it('should render an input with placeholder', () => {
    const wrapper = mountComponent({ placeholder: getPlaceholderMock() });
    const input = wrapper.findComponent(MmInput);
    expect(input.attributes().placeholder).toBe(getPlaceholderMock());
    wrapper.destroy();
  });

  it('should emit an input event with input value on input', async () => {
    const wrapper = mountTemplate();
    await wrapper.vm.$nextTick();
    const inputWrapper = wrapper.findComponent(MmInput);
    jest.spyOn(inputWrapper.vm, '$emit');
    const input = wrapper.find('input');
    input.setValue('mock input value');
    await wrapper.vm.$nextTick();
    expect(inputWrapper.vm.$emit).toHaveBeenCalledTimes(1);
    expect(inputWrapper.vm.$emit).toHaveBeenCalledWith('input', 'mock input value');
    wrapper.destroy();
  });

  it('should validate value on init', async () => {
    const wrapper = mountTemplate({ value: 'my-value', customValidations: getCustomValidationsMock() });
    await wrapper.vm.$nextTick();
    const field = wrapper.findComponent(MmField);
    expect(field.vm.isValid).toBe(false);
    wrapper.destroy();
  });

  it('should render label as expected', () => {
    const wrapper = mountTemplate();
    const label = wrapper.find('label');
    expect(label.text()).toBe(getLabelMock());
    wrapper.destroy();
  });

  it('should not show error message until input blur', async () => {
    const wrapper = mountTemplate({ required: true });
    await wrapper.vm.$nextTick();
    let errorMessage = wrapper.find('.mm-field__error-message');
    expect(errorMessage.exists()).toBe(false);
    const input = wrapper.find('input');
    input.trigger('blur');
    await wrapper.vm.$nextTick();
    errorMessage = wrapper.find('.mm-field__error-message');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Este campo é obrigatório.');
    wrapper.destroy();
  });

  it('should not validate required field', async () => {
    const wrapper = mountTemplate({ required: true });
    await wrapper.vm.$nextTick();
    let errorMessage = wrapper.find('.mm-field__error-message');
    expect(errorMessage.exists()).toBe(false);
    const input = wrapper.find('input');
    input.trigger('blur');
    await wrapper.vm.$nextTick();
    errorMessage = wrapper.find('.mm-field__error-message');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Este campo é obrigatório.');
    wrapper.destroy();
  });

  it('should set input initial value', async () => {
    const wrapper = mountTemplate({ value: 'Input initial value' });
    await wrapper.vm.$nextTick();
    const input = wrapper.find('input');
    expect(input.element.value).toBe('Input initial value');
    wrapper.destroy();
  });
});
