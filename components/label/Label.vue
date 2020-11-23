<script>
export default {
  name: 'MmLabel',
  functional: true,
  render(createElement, { children, data }) {
    return createElement('label', {
      class: {
        'mm-label': true,
      },
      ...data,
    }, children);
  },
};
</script>

<style lang="css" scoped>
  @import "./label.css";
</style>
