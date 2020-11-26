import { mount } from '@vue/test-utils';
import MmCard from '.';

const getCardContentMock = () => 'Card content mock';

function mountComponent(content) {
  return mount(MmCard, {
    slots: {
      default: content,
    },
  });
}

describe('MmCard', () => {
  it('should render card with expected css class', () => {
    const wrapper = mountComponent(getCardContentMock());

    expect(wrapper.classes()).toContain('mm-card');
  });

  it('should render card content', () => {
    const wrapper = mountComponent(getCardContentMock());

    expect(wrapper.text()).toBe(getCardContentMock());
  });
});
