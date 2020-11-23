<template>
  <button
    :class="buttonClass"
    class="mm-button"
    type="button"
    v-on="listeners"
  >
    <slot />
  </button>
</template>

<script>

export default {
  name: 'MmButton',
  props: {
    theme: {
      type: String,
      default: null,
      validator(value) {
        return !value || ['primary', 'success', 'error', 'alert', 'dark', 'extra-dark'].includes(value);
      },
    },
  },
  computed: {
    buttonClass() {
      return {
        [`mm-button--${this.theme}`]: true,
      };
    },
    listeners() {
      return {
        ...this.$listeners,
        click: () => this.onClick(),
        blur: () => this.onBlur(),
      };
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
    onBlur() {
      this.$emit('blur');
    },
  },
};
</script>

<style lang="css" scoped>
  @import "./button.css";
</style>
