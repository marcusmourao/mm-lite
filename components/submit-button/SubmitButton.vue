<template>
  <mm-button
    class="mm-submit-button"
    :disabled="disabled"
    type="submit"
    v-bind="$attrs"
  >
    <mm-loader
      v-if="isSubmitting"
      size="small"
    />
    <slot v-else />
  </mm-button>
</template>

<script>
import MmButton from '../button';
import MmLoader from '../loader';

export default {
  name: 'MmSubmitButton',
  components: { MmLoader, MmButton },
  inject: ['formVm'],
  computed: {
    disabled() {
      return !this.formVm.status.isValid || this.isSubmitting;
    },
    isSubmitting() {
      return this.formVm.status.isSubmitting;
    },
  },
};
</script>
