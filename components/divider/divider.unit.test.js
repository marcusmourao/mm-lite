import { mount } from '@vue/test-utils';
import MmDivider from '.';

function mountComponent(props) {
  return mount(MmDivider, {
    propsData: {
      ...props,
    },
  });
}

describe('mm-divider', () => {
  it('should render a horizontal rule with expected css classes', () => {
    const wrapper = mountComponent();
    const horizontalRule = wrapper.find('hr');
    expect(horizontalRule.classes()).toContain('mm-divider');
  });

  it('should render a dotted horizontal rule', () => {
    const wrapper = mountComponent({ theme: 'dotted' });
    const horizontalRule = wrapper.find('hr');
    expect(horizontalRule.classes()).toContain('mm-divider');
    expect(horizontalRule.classes()).toContain('mm-divider--dotted');
  });
});
