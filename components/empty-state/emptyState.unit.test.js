import { mount } from '@vue/test-utils';
import MmButton from '../button';
import MmHeading from '../heading';
import MmParagraph from '../paragraph';
import MmEmptyState from '.';

function mountComponent(template) {
  return mount({
    template,
    components: {
      MmButton,
      MmHeading,
      MmParagraph,
      MmEmptyState,
    },
  });
}

function getDefaultTemplate() {
  return `<mm-empty-state title="Title mock">
  <mm-paragraph>
    Mock content
  </mm-paragraph>
  <template #actions>
    <mm-button>Action button</mm-button>
  </template>
  </mm-empty-state>`;
}

function mountDefaultComponent() {
  return mountComponent(getDefaultTemplate());
}

const getTitleMock = () => 'Title mock';
const getContentMock = () => 'Mock content';
const getActionMock = () => 'Action button';

describe('MmEmptyState', () => {
  it('should render empty state title', () => {
    const wrapper = mountDefaultComponent();

    const title = wrapper.findComponent(MmHeading);

    expect(title.isVisible()).toBe(true);
    expect(title.text()).toBe(getTitleMock());
  });

  it('should render empty state content', () => {
    const wrapper = mountDefaultComponent();

    const content = wrapper.findComponent(MmParagraph);

    expect(content.isVisible()).toBe(true);
    expect(content.text()).toBe(getContentMock());
  });

  it('should render empty state content', () => {
    const wrapper = mountDefaultComponent();

    const action = wrapper.findComponent(MmButton);

    expect(action.isVisible()).toBe(true);
    expect(action.text()).toBe(getActionMock());
  });
});
