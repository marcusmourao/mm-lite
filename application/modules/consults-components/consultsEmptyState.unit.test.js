import { shallowMount } from '@vue/test-utils';
import ConsultsEmptyState from './ConsultsEmptyState.vue';

const router = {
  push: jest.fn(),
};

function shallowMountComponent() {
  return shallowMount(ConsultsEmptyState, {
    mocks: {
      $router: router,
    },
  });
}

describe('ConsultsEmptyState', () => {
  beforeEach(() => {
    router.push.mockReset();
  });

  it('should render an empty state with expected title', () => {
    const wrapper = shallowMountComponent();

    const emptyState = wrapper.findComponent({ name: 'MmEmptyState' });

    expect(emptyState.isVisible()).toBe(true);
    expect(emptyState.props().title).toBe('Bem vindo ao MM Lite');
  });

  it('should render button to redirect to buy consults view', () => {
    const wrapper = shallowMountComponent();

    const redirectToBuyConsultsButton = wrapper.findComponent({ name: 'MmButton' });

    expect(redirectToBuyConsultsButton.isVisible()).toBe(true);
    expect(redirectToBuyConsultsButton.text()).toBe('Comprar minha primeira consulta');
  });

  it('should trigger redirect to buy consults view', () => {
    const wrapper = shallowMountComponent();

    const redirectToBuyConsultsButton = wrapper.findComponent({ name: 'MmButton' });
    redirectToBuyConsultsButton.vm.$emit('click');

    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith({ name: 'BuyConsultsView' });
  });
});
