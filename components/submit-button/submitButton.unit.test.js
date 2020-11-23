import { mount } from '@vue/test-utils';
import MmLoader from '../loader';
import MmSubmitButton from '.';

const getFormVmMock = ({ isValid, isSubmitting }) => ({
  status: {
    isValid,
    isSubmitting,
  },
});

function mountComponent({ props, formVm }) {
  return mount(MmSubmitButton, {
    slots: {
      default: 'Submit',
    },
    provide() {
      return {
        formVm,
      };
    },
    propsData: {
      ...props,
    },
  });
}

describe('mm-submit-button', () => {
  it('should render component with expected css classes', () => {
    const wrapper = mountComponent({
      formVm: getFormVmMock({ isValid: false, isSubmitting: false }),
    });
    expect(wrapper.classes()).toContain('mm-submit-button');
  });

  it('should render a button type submit', () => {
    const wrapper = mountComponent({
      formVm: getFormVmMock({ isValid: false, isSubmitting: false }),
    });
    const button = wrapper.find('button');
    expect(button.attributes().type).toBe('submit');
  });

  it('should render a disabled button when is valid is false', () => {
    const wrapper = mountComponent({
      formVm: getFormVmMock({ isValid: false, isSubmitting: false }),
    });
    const button = wrapper.find('button');
    expect(button.attributes().disabled).toBe('disabled');
  });

  it('should render a disabled button when is isSubmitting is true', () => {
    const wrapper = mountComponent({
      formVm: getFormVmMock({ isValid: false, isSubmitting: true }),
    });
    const button = wrapper.find('button');
    expect(button.attributes().disabled).toBe('disabled');
  });

  it('should render a enabled button when is isSubmitting is false and isValid is true', () => {
    const wrapper = mountComponent({
      formVm: getFormVmMock({ isValid: true, isSubmitting: false }),
    });
    const button = wrapper.find('button');
    expect(button.attributes().disabled).toBe(undefined);
  });

  it('should render default slot when is not submitting', () => {
    const wrapper = mountComponent({
      formVm: getFormVmMock({ isValid: true, isSubmitting: false }),
    });
    const button = wrapper.find('button');
    expect(button.text()).toBe('Submit');
  });

  it('should render loader as default slot when is submitting', () => {
    const wrapper = mountComponent({
      formVm: getFormVmMock({ isValid: true, isSubmitting: true }),
    });
    const loader = wrapper.findComponent(MmLoader);
    expect(loader.exists()).toBe(true);
  });
});
