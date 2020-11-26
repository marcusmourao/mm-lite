<script>
export default {
  name: 'MmRow',
  functional: true,
  props: {
    verticalOffset: {
      type: String,
      default: null,
      validator(value) {
        return !value || ['large', 'medium', 'small'].includes(value);
      },
    },
    justify: {
      type: String,
      default: null,
      validator(value) {
        return !value || ['space-between'].includes(value);
      },
    },
  },
  render(createElement, { children, data, props }) {
    return createElement('div', {
      class: {
        'mm-row': true,
        [`mm-row--vertical-offset-${props.verticalOffset}`]: props.verticalOffset,
        [`mm-row--justify-${props.justify}`]: props.justify,
      },
      ...data,
    }, children);
  },
};
</script>

<style lang="css" scoped>
@import "./row.css";
</style>
