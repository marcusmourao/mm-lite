<script>
export default {
  name: 'MmNumberHighlight',
  functional: true,
  props: {
    theme: {
      type: String,
      default: null,
      validator(value) {
        return !value || ['success', 'alert'].includes(value);
      },
    },
    value: {
      type: Number,
      required: true,
    },
  },
  render(createElement, { props }) {
    return createElement('span', {
      class: {
        'mm-number-highlight': true,
        [`mm-number-highlight--${props.theme}`]: props.theme,
      },
    }, props.value);
  },
};
</script>

<style lang="css" scoped>
  @import "./numberHighlight.css";
</style>
