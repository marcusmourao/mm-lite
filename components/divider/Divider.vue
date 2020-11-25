<template>
  <hr class="mm-divider" :class="classes">
</template>

<script>
export default {
  name: 'MmDivider',
  props: {
    theme: {
      type: String,
      default: null,
      validator(theme) {
        return !theme || ['dotted'].includes(theme);
      },
    },
  },
  computed: {
    classes() {
      return {
        'mm-divider--dotted': this.theme === 'dotted',
      };
    },
  },
};
</script>

<style lang="css" scoped>
@import "./divider.css";
</style>
