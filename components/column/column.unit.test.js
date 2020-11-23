import { mount } from '@vue/test-utils';
import MmCol from '.';

function mountComponent(props) {
  return mount(MmCol, {
    propsData: {
      ...props,
    },
  });
}

describe('mm-col', () => {
  it('should render component with expected css classes', () => {
    const wrapper = mountComponent();
    expect(wrapper.classes()).toEqual([
      'mm-col',
      'mm-col--xs-12',
      'mm-col--sm-12',
      'mm-col--md-12',
      'mm-col--lg-12',
      'mm-col--xl-12',
    ]);
  });

  it('should render component with custom xs size', () => {
    const wrapper = mountComponent({ xs: 1 });
    expect(wrapper.classes()).toContain('mm-col--xs-1');
  });

  it('should render component with custom sm size', () => {
    const wrapper = mountComponent({ sm: 1 });
    expect(wrapper.classes()).toContain('mm-col--sm-1');
  });

  it('should render component with custom md size', () => {
    const wrapper = mountComponent({ md: 1 });
    expect(wrapper.classes()).toContain('mm-col--md-1');
  });

  it('should render component with custom lg size', () => {
    const wrapper = mountComponent({ lg: 1 });
    expect(wrapper.classes()).toContain('mm-col--lg-1');
  });

  it('should render component with custom xl size', () => {
    const wrapper = mountComponent({ xl: 1 });
    expect(wrapper.classes()).toContain('mm-col--xl-1');
  });

  it('should render component with custom xs offset', () => {
    const wrapper = mountComponent({ offsetXs: 1 });
    expect(wrapper.classes()).toContain('mm-col--offset-xs-1');
  });

  it('should render component with custom sm offset', () => {
    const wrapper = mountComponent({ offsetSm: 1 });
    expect(wrapper.classes()).toContain('mm-col--offset-sm-1');
  });

  it('should render component with custom md offset', () => {
    const wrapper = mountComponent({ offsetMd: 1 });
    expect(wrapper.classes()).toContain('mm-col--offset-md-1');
  });

  it('should render component with custom lg offset', () => {
    const wrapper = mountComponent({ offsetLg: 1 });
    expect(wrapper.classes()).toContain('mm-col--offset-lg-1');
  });

  it('should render component with custom xl offset', () => {
    const wrapper = mountComponent({ offsetXl: 1 });
    expect(wrapper.classes()).toContain('mm-col--offset-xl-1');
  });

  it('should render a right aligned column', () => {
    const wrapper = mountComponent({ align: 'right' });

    expect(wrapper.classes()).toContain('mm-col--align-right');
  });

  it('should render a right aligned column', () => {
    const wrapper = mountComponent({ align: 'center' });

    expect(wrapper.classes()).toContain('mm-col--align-center');
  });
});
