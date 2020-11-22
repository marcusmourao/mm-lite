import { mount } from '@vue/test-utils';
import MmApplicationLayout from '.';

const getTitleMock = () => 'Mock title';
const getFooterTextMock = () => 'Mock footer text';
const getMainContentMock = () => 'Mock main content';

function mountComponent(props, options) {
  return mount(MmApplicationLayout, {
    propsData: {
      ...props,
    },
    ...options,
  });
}

describe('MmApplication', () => {
  it('should have expected css class', () => {
    const wrapper = mountComponent({ title: getTitleMock(), footerText: getFooterTextMock() });

    expect(wrapper.classes()).toContain('mm-application-layout');
  });

  it('should render nav title', () => {
    const wrapper = mountComponent({ title: getTitleMock(), footerText: getFooterTextMock() });

    const nav = wrapper.find('nav');

    expect(nav.text()).toBe(getTitleMock());
  });

  it('should render footer text', () => {
    const wrapper = mountComponent({ title: getTitleMock(), footerText: getFooterTextMock() });

    const footer = wrapper.find('footer');

    expect(footer.text()).toBe(getFooterTextMock());
  });

  it('should render main content', () => {
    const wrapper = mountComponent({
      title: getTitleMock(),
      footerText: getFooterTextMock(),
    }, { slots: { default: getMainContentMock() } });

    const mainContent = wrapper.find('main');

    expect(mainContent.text()).toBe(getMainContentMock());
  });
});
