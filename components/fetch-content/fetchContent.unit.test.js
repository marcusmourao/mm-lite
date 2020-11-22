import { mount } from '@vue/test-utils';
import MmLoader from '../loader';
import MmFetchContent from '.';

function mountComponent(props) {
  return mount(MmFetchContent, {
    propsData: {
      ...props,
    },
  });
}

function getPromiseMock() {
  const promiseObject = {};
  const promise = new Promise((resolve, reject) => {
    promiseObject.resolve = resolve;
    promiseObject.reject = reject;
  });
  promiseObject.promise = () => promise;
  return promiseObject;
}

function getResponseMock() {
  return { mock: true };
}

function getErrorResponseMock() {
  return { mockError: true };
}

describe('MmFetchContent', () => {
  it('should fetch data on component mount', async () => {
    const fetchAction = jest.fn().mockResolvedValue();

    const wrapper = mountComponent({ fetchAction });
    await wrapper.vm.$nextTick();

    expect(fetchAction).toHaveBeenCalledTimes(1);
  });

  it('should emit a fetch success event when fetch data resolves', async () => {
    const mockPromise = getPromiseMock();
    const { promise: fetchAction } = mockPromise;
    const wrapper = mountComponent({ fetchAction });
    await wrapper.vm.$nextTick();
    mockPromise.resolve(getResponseMock());
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('fetch-success')).toEqual([[getResponseMock()]]);
  });

  it('should emit a fetch error event when fetch data fail', async () => {
    const mockPromise = getPromiseMock();
    const { promise: fetchAction } = mockPromise;
    const wrapper = mountComponent({ fetchAction });
    await wrapper.vm.$nextTick();
    mockPromise.reject(getErrorResponseMock());
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('fetch-error')).toEqual([[getErrorResponseMock()]]);
  });

  it('should render loader while fetch content', async () => {
    const mockPromise = getPromiseMock();
    const { promise: fetchAction } = mockPromise;
    const wrapper = mountComponent({ fetchAction });
    await wrapper.vm.$nextTick();
    const loader = wrapper.findComponent(MmLoader);

    expect(loader.exists()).toBe(true);

    mockPromise.resolve();
    await wrapper.vm.$nextTick();
    expect(loader.exists()).toBe(false);
  });

  it('should render default slot after fetch data', async () => {
    const wrapper = mount(MmFetchContent, {
      propsData: {
        fetchAction: jest.fn().mockResolvedValue(),
      },
      slots: {
        default: '<p> slot default content mock </p>',
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    const content = wrapper.find('p');

    expect(content.text()).toBe('slot default content mock');
  });
});
