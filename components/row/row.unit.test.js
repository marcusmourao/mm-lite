import { mount } from '@vue/test-utils';
import MmRow from '.';

function mountComponent(props, slots = '') {
  return mount(MmRow, {
    propsData: {
      ...props,
    },
    slots: {
      default: slots,
    },
  });
}

describe('MmRow', () => {
  it('should render component classes as expected', () => {
    const wrapper = mountComponent();
    expect(wrapper.classes()).toContain('mm-row');
  });

  it('should render default slots as expected', () => {
    const wrapper = mountComponent({}, 'mock slot');
    expect(wrapper.text()).toContain('mock slot');
  });
});
