import { mount } from '@vue/test-utils';
import MmButton from '.';

function mountComponent(propsData) {
  return mount(MmButton, {
    slots: {
      default: 'My Button Text',
    },
    propsData: {
      ...propsData,
    },
  });
}

describe('mm-button', () => {
  it('should render a button with mm-button class', () => {
    const wrapper = mountComponent();
    const button = wrapper.find('button');
    expect(button.classes()).toContain('mm-button');
  });

  it('should render a success themed button', () => {
    const wrapper = mountComponent({
      theme: 'success',
    });
    const button = wrapper.find('button');
    expect(button.classes()).toContain('mm-button--success');
  });

  it('should render a primary themed button', () => {
    const wrapper = mountComponent({
      theme: 'primary',
    });
    const button = wrapper.find('button');
    expect(button.classes()).toContain('mm-button--primary');
  });

  it('should render a alert themed button', () => {
    const wrapper = mountComponent({
      theme: 'alert',
    });
    const button = wrapper.find('button');
    expect(button.classes()).toContain('mm-button--alert');
  });

  it('should render a error themed button', () => {
    const wrapper = mountComponent({
      theme: 'error',
    });
    const button = wrapper.find('button');
    expect(button.classes()).toContain('mm-button--error');
  });

  it('should render a dark themed button', () => {
    const wrapper = mountComponent({
      theme: 'dark',
    });
    const button = wrapper.find('button');
    expect(button.classes()).toContain('mm-button--dark');
  });

  it('should render a extra dark themed button', () => {
    const wrapper = mountComponent({
      theme: 'extra-dark',
    });
    const button = wrapper.find('button');
    expect(button.classes()).toContain('mm-button--extra-dark');
  });

  it('should render a button with text content', () => {
    const wrapper = mountComponent();
    const button = wrapper.find('button');
    expect(button.exists()).toEqual(true);
    expect(button.text()).toEqual('My Button Text');
  });

  it('should emit click event when button receive a click', () => {
    const wrapper = mountComponent();
    const button = wrapper.find('button');
    jest.spyOn(wrapper.vm, '$emit');
    button.vm.$el.dispatchEvent(new Event('click'));
    expect(wrapper.vm.$emit).toHaveBeenCalledWith('click');
  });

  it('should emit blur event when button receive a blur', () => {
    const wrapper = mountComponent();
    const button = wrapper.find('button');
    jest.spyOn(wrapper.vm, '$emit');
    button.vm.$el.dispatchEvent(new Event('blur'));
    expect(wrapper.vm.$emit).toHaveBeenCalledWith('blur');
  });
});
