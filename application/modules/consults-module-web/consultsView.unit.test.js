import { shallowMount } from '@vue/test-utils';
import { getConsultsTotals } from '../consults-lib';
import ConsultsView from './ConsultsView.vue';

jest.mock('../consults-lib');

function shallowMountComponent() {
  return shallowMount(ConsultsView);
}

function getEmptyStateMock() {
  return { available: 0, used: 0, total: 0 };
}

function getSomeConsultTotal() {
  return { available: 10, used: 10, total: 20 };
}

describe('ConsultsView', () => {
  it('should fetch consults totals', async () => {
    getConsultsTotals.mockResolvedValue(getEmptyStateMock());

    const wrapper = shallowMountComponent();
    await wrapper.vm.$nextTick();

    const fetchContent = wrapper.findComponent({ name: 'MmFetchContent' });
    await fetchContent.props().fetchAction();

    expect(getConsultsTotals).toHaveBeenCalledTimes(1);
  });

  it('should render empty state when user do not have any consults yet', async () => {
    getConsultsTotals.mockResolvedValue();

    const wrapper = shallowMountComponent();
    await wrapper.vm.$nextTick();

    const fetchContent = wrapper.findComponent({ name: 'MmFetchContent' });
    await fetchContent.vm.$emit('fetch-success', getEmptyStateMock());
    const emptyState = wrapper.findComponent({ name: 'ConsultsEmptyState' });

    expect(emptyState.isVisible()).toBe(true);
  });

  it('should render consults dashboard when user already has some consult', async () => {
    getConsultsTotals.mockResolvedValue();

    const wrapper = shallowMountComponent();
    await wrapper.vm.$nextTick();

    const fetchContent = wrapper.findComponent({ name: 'MmFetchContent' });
    await fetchContent.vm.$emit('fetch-success', getSomeConsultTotal());
    const dashboard = wrapper.findComponent({ name: 'ConsultsDashboard' });

    expect(dashboard.isVisible()).toBe(true);
  });
});
