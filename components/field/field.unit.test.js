import { mount } from '@vue/test-utils';
import MmField from '.';

const getLabelMock = () => 'First Name';
const registerFieldMock = jest.fn();

function mountComponent(props) {
  return mount(MmField, {
    propsData: {
      label: getLabelMock(),
      ...props,
    },
    provide() {
      return {
        formVm: {
          registerField: registerFieldMock,
        },
      };
    },
  });
}

describe('mm-field', () => {
  beforeEach(() => {
    registerFieldMock.mockClear();
  });

  it('should register field on create', () => {
    const wrapper = mountComponent();

    const field = wrapper.findComponent(MmField);

    expect(registerFieldMock).toHaveBeenCalledTimes(1);
    expect(registerFieldMock).toHaveBeenCalledWith(field.vm.$data);
  });

  it('should render component with expected css classes', () => {
    const wrapper = mountComponent();
    expect(wrapper.classes()).toContain('mm-field');
  });

  it('should add required style when provide required props', () => {
    const wrapper = mountComponent({ required: true });
    expect(wrapper.classes()).toContain('mm-field--required');
  });

  it('should render field label', () => {
    const wrapper = mountComponent();
    const label = wrapper.find('label');
    expect(label.text()).toBe(getLabelMock());
  });

  it('should add invalid style when enable validation and set field invalid', async () => {
    const wrapper = mountComponent();

    wrapper.setData({
      isValidationFeedbackEnabled: true,
      isValid: false,
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.classes()).toContain('mm-field--invalid');
  });

  it('should show error message when enable validation and set field invalid', async () => {
    const wrapper = mountComponent();

    wrapper.setData({
      errorMessage: 'Invalid field',
      isValidationFeedbackEnabled: true,
      isValid: false,
    });
    await wrapper.vm.$nextTick();

    const errorMessage = wrapper.find('span.mm-field__error-message');
    expect(errorMessage.text()).toBe('Invalid field');
  });
});
