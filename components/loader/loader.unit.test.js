import { mount } from '@vue/test-utils';
import MmLoader from '.';

const getSmallSizeMock = () => 'small';
const getMediumSizeMock = () => 'medium';
const getLargeSizeMock = () => 'large';

function mountComponent(props) {
  return mount(MmLoader, {
    propsData: {
      ...props,
    },
  });
}

describe('MmLoader', () => {
  it('should render component with expected css class', () => {
    const wrapper = mountComponent({ size: getSmallSizeMock() });

    expect(wrapper.classes()).toContain('mm-loader');
  });

  it('should render a small loader', () => {
    const wrapper = mountComponent({ size: getSmallSizeMock() });

    expect(wrapper.classes()).toContain('mm-loader--small');
  });

  it('should render a medium loader', () => {
    const wrapper = mountComponent({ size: getMediumSizeMock() });

    expect(wrapper.classes()).toContain('mm-loader--medium');
  });

  it('should render a large loader', () => {
    const wrapper = mountComponent({ size: getLargeSizeMock() });

    expect(wrapper.classes()).toContain('mm-loader--large');
  });
});
