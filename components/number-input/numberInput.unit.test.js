import { mount } from '@vue/test-utils';
import MmField from '../field';
import MmInput from '../input';
import MmNumberInput from '.';

const getLabelMock = () => 'Number input';
const getCustomValidationsMock = () => [
  { validate: (value) => value === 10, errorMessage: 'Value is not 10' },
];
const getRequiredMock = () => false;
const getPlaceholderMock = () => 'my placeholder';

function mountComponent(props) {
  return mount(MmNumberInput, {
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
        <mm-number-input
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
      MmNumberInput,
    },
    provide() {
      return {
        formVm: { registerField: jest.fn() },
      };
    },
  });
}

describe('MmNumberInput', () => {
  it('should render a number input', () => {
    const wrapper = mountComponent({ placeholder: getPlaceholderMock() });

    const input = wrapper.find('input');

    expect(input.attributes().type).toBe('number');
    wrapper.destroy();
  });

  it('should emit an input event with input value', async () => {
    const wrapper = mountTemplate();
    await wrapper.vm.$nextTick();
    const numberInput = wrapper.findComponent(MmNumberInput);

    const inputComponent = wrapper.findComponent(MmInput);
    inputComponent.vm.$emit('input', '10');

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(numberInput.emitted().input.length).toBe(1);
    expect(numberInput.emitted().input).toEqual([[10]]);
    wrapper.destroy();
  });

  it('should set input initial value', async () => {
    const wrapper = mountTemplate({ value: 10 });
    await wrapper.vm.$nextTick();
    const input = wrapper.find('input');
    expect(input.element.value).toBe('10');
    wrapper.destroy();
  });

  it('should by pass custom validations to input', async () => {
    const customValidations = getCustomValidationsMock();
    const wrapper = mountTemplate({ value: 10, customValidations });
    await wrapper.vm.$nextTick();

    const inputComponent = wrapper.findComponent(MmInput);

    expect(inputComponent.props().customValidations).toEqual(customValidations);
    wrapper.destroy();
  });
});
