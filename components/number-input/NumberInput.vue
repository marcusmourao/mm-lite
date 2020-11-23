<template>
  <mm-input
    :value="value"
    v-bind="$attrs"
    type="number"
    :custom-validations="customValidations"
    @input="onInput"
  />
</template>

<script>
import MmInput from '../input';

export default {
  name: 'MmNumberInput',
  components: { MmInput },
  props: {
    customValidations: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number],
      default: null,
    },
  },
  methods: {
    onInput(value) {
      this.$emit('input', parseInt(value, 10));
    },
  },
};
</script>
