import { shallowMount } from '@vue/test-utils';
import IndexPage from './index.vue';

function shallowMountComponent() {
  return shallowMount(IndexPage);
}

describe('IndexPage', () => {
  it('should render title as expected', () => {
    const wrapper = shallowMountComponent();

    expect(wrapper.text()).toBe('Hello World');
  });
});
