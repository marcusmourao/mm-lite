import { mount } from '@vue/test-utils';
import MmCurrencyHighlight from '.';

function mountComponent(props) {
  return mount(MmCurrencyHighlight, {
    propsData: {
      ...props,
    },
  });
}

describe('MmCurrencyHighlight', () => {
  it('should render currency highlight with symbol', () => {
    const wrapper = mountComponent({ value: 1000, withSymbol: true });

    expect(wrapper.text()).toContain('R$');
    expect(wrapper.text()).toContain('1.000,00');
  });

  it('should render currency highlight without symbol', () => {
    const wrapper = mountComponent({ value: 1000 });

    expect(wrapper.text()).not.toContain('R$');
    expect(wrapper.text()).toContain('1.000,00');
  });
});
