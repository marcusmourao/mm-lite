<script>
const NUMBER_OF_COLUMNS = 12;
const DEFAULT_OFFSET = 0;

export default {
  name: 'MmCol',
  functional: true,
  props: {
    xs: {
      type: [String, Number],
      default: NUMBER_OF_COLUMNS,
    },
    sm: {
      type: [String, Number],
      default: NUMBER_OF_COLUMNS,
    },
    md: {
      type: [String, Number],
      default: NUMBER_OF_COLUMNS,
    },
    lg: {
      type: [String, Number],
      default: NUMBER_OF_COLUMNS,
    },
    xl: {
      type: [String, Number],
      default: NUMBER_OF_COLUMNS,
    },
    offsetXs: {
      type: [String, Number],
      default: DEFAULT_OFFSET,
    },
    offsetSm: {
      type: [String, Number],
      default: DEFAULT_OFFSET,
    },
    offsetMd: {
      type: [String, Number],
      default: DEFAULT_OFFSET,
    },
    offsetLg: {
      type: [String, Number],
      default: DEFAULT_OFFSET,
    },
    offsetXl: {
      type: [String, Number],
      default: DEFAULT_OFFSET,
    },
    align: {
      type: String,
      default: null,
      validator(value) {
        return !value || ['center', 'right'].includes(value);
      },
    },
  },
  render(createElement, { props, children, data }) {
    return createElement('div', {
      class: {
        'mm-col': true,
        [`mm-col--xs-${props.xs}`]: props.xs,
        [`mm-col--sm-${props.sm}`]: props.sm,
        [`mm-col--md-${props.md}`]: props.md,
        [`mm-col--lg-${props.lg}`]: props.lg,
        [`mm-col--xl-${props.xl}`]: props.xl,
        [`mm-col--offset-xs-${props.offsetXs}`]: props.offsetXs,
        [`mm-col--offset-sm-${props.offsetSm}`]: props.offsetSm,
        [`mm-col--offset-md-${props.offsetMd}`]: props.offsetMd,
        [`mm-col--offset-lg-${props.offsetLg}`]: props.offsetLg,
        [`mm-col--offset-xl-${props.offsetXl}`]: props.offsetXl,
        [`mm-col--align-${props.align}`]: props.align,
      },
      ...data,
    }, children);
  },
};
</script>

<style lang="css" scoped>
@import "./column.css";
</style>
