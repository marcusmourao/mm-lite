<script>

function getHeadingByType(size) {
  return {
    hero: 'h1',
    title: 'h2',
  }[size];
}

export default {
  name: 'MmHeading',
  functional: true,
  props: {
    type: {
      type: [String],
      required: true,
      validator: (value) => ['hero', 'title'].includes(value),
    },
  },
  render(createElement, { props, children, data }) {
    return createElement(getHeadingByType(props.type), {
      class: {
        'mm-heading': true,
        [`mm-heading--${props.type}`]: true,
      },
      ...data,
    }, children);
  },
};
</script>

<style lang="css" scoped>
  @import "./heading.css";
</style>
