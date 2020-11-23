import { mount } from '@vue/test-utils';
import MmHeading from '.';

const getHeroTypeMock = () => 'hero';
const getTitleTypeMock = () => 'title';
const getHeadingContentMock = () => 'Mock heading content';

function mountComponent(props, content) {
  return mount(MmHeading, {
    propsData: {
      ...props,
    },
    slots: {
      default: content,
    },
  });
}

describe('MmHeading', () => {
  it('should render heading content', () => {
    const wrapper = mountComponent({ type: getHeroTypeMock() }, getHeadingContentMock());

    const heading = wrapper.find('.mm-heading');

    expect(heading.text()).toBe(getHeadingContentMock());
  });

  it('should render a hero heading', () => {
    const wrapper = mountComponent({ type: getHeroTypeMock() }, getHeadingContentMock());

    const heading = wrapper.find('h1');

    expect(heading.classes()).toContain('mm-heading');
    expect(heading.classes()).toContain('mm-heading--hero');
  });

  it('should render a title heading', () => {
    const wrapper = mountComponent({ type: getTitleTypeMock() }, getHeadingContentMock());

    const heading = wrapper.find('h2');

    expect(heading.classes()).toContain('mm-heading');
    expect(heading.classes()).toContain('mm-heading--title');
  });
});
