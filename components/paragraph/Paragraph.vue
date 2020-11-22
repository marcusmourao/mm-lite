<script>
export default {
  name: 'MmParagraph',
  functional: true,
  render(createElement, { children, data }) {
    return createElement('p', {
      class: 'mm-paragraph',
      ...data,
    }, children);
  },
};
</script>

<style lang="css" scoped>
  @import "./paragraph.css";
</style>
