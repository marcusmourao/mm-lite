import { mount } from '@vue/test-utils';
import MmParagraph from '.';

const getParagraphContentMock = () => 'Mock paragraph content';

function mountComponent(content) {
  return mount(MmParagraph, {
    slots: {
      default: content,
    },
  });
}

describe('MmParagraph', () => {
  it('should component has expected css class', () => {
    const wrapper = mountComponent(getParagraphContentMock());

    expect(wrapper.classes()).toContain('mm-paragraph');
  });

  it('should render paragraph content', () => {
    const wrapper = mountComponent(getParagraphContentMock());

    const paragraph = wrapper.find('p');

    expect(paragraph.text()).toBe(getParagraphContentMock());
  });
});
