<script>
export default {
  name: 'MmRow',
  functional: true,
  render(createElement, { children, data }) {
    return createElement('div', {
      class: 'mm-row',
      ...data,
    }, children);
  },
};
</script>

<style lang="css" scoped>
@import "./Row.css";
</style>
