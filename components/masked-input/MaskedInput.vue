<template>
  <mm-input
    ref="input"
    :value="value"
    v-bind="$attrs"
    type="tel"
    :custom-validations="localValidations"
    :maxlength="maskLength"
    :mask="mask"
    :placeholder="mask"
    autocorrect="off"
    @input="onInput"
  />
</template>

<script>
import MmInput from '../input';

export default {
  name: 'MmMaskedInput',
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
    mask: {
      required: true,
      type: MmInput.props.mask.type,
      validator: MmInput.props.mask.validator,
    },
  },
  computed: {
    localValidations() {
      return [
        {
          validate: (value) => value && value.length === this.mask.length,
          errorMessage: 'Insira um valor válido',
        },
        ...this.customValidations,
      ];
    },
    maskLength() {
      return this.mask.length;
    },
  },
  methods: {
    onInput(value) {
      this.$emit('input', value);
    },
  },
};
</script>
