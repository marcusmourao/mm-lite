import { mount } from '@vue/test-utils';
import MmNumberHighlight from '.';

const getNumberHighlightValueMock = () => 10;

function mountComponent({ value, theme }) {
  return mount(MmNumberHighlight, {
    propsData: {
      value,
      theme,
    },
  });
}

describe('MmNumberHighlight', () => {
  it('should component has expected css class', () => {
    const value = getNumberHighlightValueMock();
    const wrapper = mountComponent({ value });

    expect(wrapper.classes()).toContain('mm-number-highlight');
  });

  it('should render number highlight value', () => {
    const value = getNumberHighlightValueMock();
    const wrapper = mountComponent({ value });

    const numberHighlight = wrapper.find('span');

    expect(numberHighlight.text()).toBe(`${getNumberHighlightValueMock()}`);
  });

  it('should render number highlight with success theme', () => {
    const value = getNumberHighlightValueMock();
    const wrapper = mountComponent({ value, theme: 'success' });

    const numberHighlight = wrapper.find('span');

    expect(numberHighlight.classes()).toContain('mm-number-highlight--success');
  });

  it('should render number highlight with alert theme', () => {
    const value = getNumberHighlightValueMock();
    const wrapper = mountComponent({ value, theme: 'alert' });

    const numberHighlight = wrapper.find('span');

    expect(numberHighlight.classes()).toContain('mm-number-highlight--alert');
  });
});
