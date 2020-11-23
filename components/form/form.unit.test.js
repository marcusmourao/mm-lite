import { mount } from '@vue/test-utils';
import MmForm from '.';

const onSubmitMock = jest.fn();

const getResponseMock = () => ({
  mock: true,
});

function mountComponent(props) {
  return mount(MmForm, {
    propsData: {
      onSubmit: onSubmitMock,
      ...props,
    },
  });
}

function getPromiseHandlerMock() {
  const promiseHandler = {};
  promiseHandler.promise = new Promise((resolve, reject) => {
    promiseHandler.resolve = resolve;
    promiseHandler.reject = reject;
  });
  return promiseHandler;
}

function registerAnInvalidFieldOnWrapper(wrapper) {
  const { fields } = wrapper.vm;
  const invalidField = { isValid: false };
  wrapper.setData({
    fields: [
      ...fields,
      invalidField,
    ],
  });
}

function registerAValidFieldOnWrapper(wrapper) {
  const { fields } = wrapper.vm;
  const invalidField = { isValid: true };
  wrapper.setData({
    fields: [
      ...fields,
      invalidField,
    ],
  });
}

describe('mm-form', () => {
  beforeEach(() => {
    onSubmitMock.mockReset();
  });

  it('should render component with expected css class', () => {
    const wrapper = mountComponent();
    const form = wrapper.find('form.mm-form');
    expect(form.exists()).toBe(true);
  });

  it('should not call onSubmit if form has some invalid field', async () => {
    const wrapper = mountComponent();

    registerAnInvalidFieldOnWrapper(wrapper);
    await wrapper.vm.$nextTick();
    const form = wrapper.find('form');
    form.trigger('submit');
    await wrapper.vm.$nextTick();

    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  it('should call onSubmit if form has all fields valid', () => {
    const wrapper = mountComponent();
    registerAValidFieldOnWrapper(wrapper);
    registerAValidFieldOnWrapper(wrapper);
    const form = wrapper.find('form');
    form.trigger('submit');
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });

  it('should emit submit-success event when onSubmit resolves', async () => {
    onSubmitMock.mockResolvedValue(getResponseMock());
    const wrapper = mountComponent();
    registerAValidFieldOnWrapper(wrapper);
    const form = wrapper.find('form');
    form.trigger('submit');
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('submit-success')).toEqual([[getResponseMock()]]);
  });

  it('should emit submit-error event when onSubmit fails', async () => {
    onSubmitMock.mockRejectedValue(getResponseMock());
    const wrapper = mountComponent();
    registerAValidFieldOnWrapper(wrapper);
    const form = wrapper.find('form');
    form.trigger('submit');
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('submit-error')).toEqual([[getResponseMock()]]);
  });

  it('should not call onSubmit again while submitting still in progress', async () => {
    const promiseHandler = getPromiseHandlerMock();
    const onSubmit = jest.fn().mockImplementation(() => promiseHandler.promise);
    const wrapper = mountComponent({ onSubmit });
    registerAValidFieldOnWrapper(wrapper);

    const form = wrapper.find('form');
    form.trigger('submit');

    await wrapper.vm.$nextTick();
    expect(onSubmit).toHaveBeenCalledTimes(1);

    form.trigger('submit');
    await wrapper.vm.$nextTick();
    expect(onSubmit).toHaveBeenCalledTimes(1);

    promiseHandler.resolve();
    await wrapper.vm.$nextTick();

    form.trigger('submit');
    await wrapper.vm.$nextTick();
    expect(onSubmit).toHaveBeenCalledTimes(2);
  });
});
