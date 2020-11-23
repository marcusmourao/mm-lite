import { mount } from '@vue/test-utils';
import MmLabel from '.';

const getLabelTextMock = () => 'label text mock';

function mountComponent(slot) {
  return mount(MmLabel, {
    slots: {
      default: slot,
    },
  });
}

describe('MmLabel', () => {
  it('should render label with expected css class', () => {
    const wrapper = mountComponent(getLabelTextMock());
    const label = wrapper.find('label');
    expect(label.classes()).toContain('mm-label');
  });

  it('should render label with text content', () => {
    const wrapper = mountComponent(getLabelTextMock());
    const label = wrapper.find('label');
    expect(label.exists()).toEqual(true);
    expect(label.text()).toEqual(getLabelTextMock());
  });
});
