import { mount } from '@vue/test-utils';
import MmField from '../field';
import MmMaskedInput from '.';

const getLabelMock = () => 'First Name';
const getMaskMock = () => '000.000.000-00';
const getCustomValidationsMock = () => [
  { validate: (value) => value === 'correct', errorMessage: 'Invalid value' },
];

function mountTemplate(props) {
  return mount({
    template: `
      <mm-field :label="label">
        <mm-masked-input
          v-model="value" 
          :mask="mask"
          :custom-validations="customValidations" />
      </mm-field>
    `,
    data() {
      return {
        value: '',
        mask: getMaskMock(),
        label: getLabelMock(),
        customValidations: getCustomValidationsMock(),
        ...props,
      };
    },
    components: {
      MmField,
      MmMaskedInput,
    },
    provide() {
      return {
        formVm: { registerField: jest.fn() },
      };
    },
  });
}

describe('MmMaskedInput', () => {
  it('should render input with maxlength attribute', async () => {
    const wrapper = mountTemplate({ value: '' });
    await wrapper.vm.$nextTick();

    const input = wrapper.find('input');

    expect(input.attributes().maxlength).toBe(`${getMaskMock().length}`);
    wrapper.destroy();
  });

  it('should render input with mask as placeholder', async () => {
    const wrapper = mountTemplate({ value: '' });
    await wrapper.vm.$nextTick();

    const input = wrapper.find('input');

    expect(input.attributes().placeholder).toBe('000.000.000-00');
    wrapper.destroy();
  });

  it('should trigger input event with mask', async () => {
    const wrapper = mountTemplate({ value: '' });
    await wrapper.vm.$nextTick();

    const input = wrapper.find('input');
    input.setValue('14125896541');
    input.trigger('input');

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(input.element.value).toBe('141.258.965-41');
    wrapper.destroy();
  });

  it('should keep mask if user tries to input a value bigger than mask allow', async () => {
    const wrapper = mountTemplate({ value: '' });
    await wrapper.vm.$nextTick();

    const input = wrapper.find('input');
    input.setValue('1412589654189898');
    input.trigger('input');

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(input.element.value).toBe('141.258.965-41');
    wrapper.destroy();
  });

  it('should validate input value ', async () => {
    const wrapper = mountTemplate({ value: '' });
    await wrapper.vm.$nextTick();

    const input = wrapper.find('input');
    input.setValue('141258965');
    input.trigger('input');
    input.trigger('blur');

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    const errorMessage = wrapper.find('.mm-field__error-message');

    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Insira um valor válido');
    wrapper.destroy();
  });
});
