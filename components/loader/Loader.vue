<template>
  <div class="mm-loader" :class="classes">
    <svg class="mm-loader__circle" viewBox="25 25 50 50">
      <circle
        class="mm-loader__circle-path"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke="#000000"
        stroke-width="2"
        stroke-miterlimit="10"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'MmLoader',
  props: {
    size: {
      type: String,
      default: 'medium',
      validator(size) {
        return ['small', 'medium', 'large'].includes(size);
      },
    },
  },
  computed: {
    classes() {
      return {
        [`mm-loader--${this.size}`]: this.size,
      };
    },
  },
};
</script>

<style scoped>
@import "./Loader.css";
</style>
