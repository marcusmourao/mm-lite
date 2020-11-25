export function getInputComponentByLabel(wrapper, label, componentName = 'MmInput') {
  return wrapper.findAllComponents({ name: 'MmField' })
    .filter((w) => w.props().label === label)
    .at(0)
    .findComponent({ name: componentName });
}

export function getButtonComponentByText(wrapper, text, componentName = 'MmSubmitButton') {
  return wrapper.findAllComponents({ name: componentName })
    .filter((w) => w.text() === text)
    .at(0);
}
