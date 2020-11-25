import { shallowMount } from '@vue/test-utils';
import ConsultsDashboard from './ConsultsDashboard.vue';
import MmHeading from '../../../components/heading';

const router = {
  push: jest.fn(),
};

function findHeadingByText(wrapper, text) {
  return wrapper.findAllComponents(MmHeading).filter((w) => w.text() === text).at(0);
}

function shallowMountComponent(props) {
  return shallowMount(ConsultsDashboard, {
    propsData: {
      ...props,
    },
    mocks: {
      $router: router,
    },
  });
}

describe('ConsultsDashboard', () => {
  beforeEach(() => {
    router.push.mockReset();
  });

  it('should render render available consults title', () => {
    const wrapper = shallowMountComponent({
      availableConsultsCount: 10,
      usedConsultsCount: 60,
    });

    const availableConsultsHeading = findHeadingByText(wrapper, 'Consultas disponíveis');

    expect(availableConsultsHeading.isVisible()).toBe(true);
  });

  it('should render render used consults title', () => {
    const wrapper = shallowMountComponent({
      availableConsultsCount: 10,
      usedConsultsCount: 60,
    });

    const usedConsultsHeading = findHeadingByText(wrapper, 'Consultas realizadas');

    expect(usedConsultsHeading.isVisible()).toBe(true);
  });

  it('should render button to redirect to buy consults view', () => {
    const wrapper = shallowMountComponent({
      availableConsultsCount: 10,
      usedConsultsCount: 60,
    });

    const redirectToBuyConsultsButton = wrapper.findComponent({ name: 'MmButton' });

    expect(redirectToBuyConsultsButton.isVisible()).toBe(true);
    expect(redirectToBuyConsultsButton.text()).toBe('Comprar consultas');
  });

  it('should trigger redirect to buy consults view', () => {
    const wrapper = shallowMountComponent({
      availableConsultsCount: 10,
      usedConsultsCount: 60,
    });

    const redirectToBuyConsultsButton = wrapper.findComponent({ name: 'MmButton' });
    redirectToBuyConsultsButton.vm.$emit('click');

    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith({ name: 'BuyConsultsView' });
  });
});
