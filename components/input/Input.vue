<template>
  <input
    ref="input"
    :value="value"
    class="mm-input"
    v-bind="$attrs"
    v-on="listeners"
  >
</template>

<script>
function sanitizeValue(value) {
  return String(value).replace(/\D/g, '');
}

export default {
  name: 'MmInput',
  inject: {
    fieldVm: {
      default: null,
    },
  },
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
      type: String,
      default: null,
      validator(value) {
        return value.includes('0');
      },
    },
  },
  data() {
    return {
      localValue: this.value || null,
      errorMessage: '',
    };
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
        blur: this.onBlur,
      };
    },
    inputValidations() {
      const validations = [...this.customValidations];
      if (this.fieldVm && this.fieldVm.isRequired) {
        const requiredValidation = { validate: (value) => !!value, errorMessage: 'Este campo é obrigatório' };
        validations.unshift(requiredValidation);
      }
      return validations;
    },
  },
  watch: {
    value() {
      this.localValue = this.value;
    },
    localValue: {
      immediate: true,
      handler() {
        const isValid = this.isValueValid(this.localValue);
        if (!isValid) {
          this.fieldVm.setErrorMessage(this.getErrorMessage());
        }
        this.fieldVm.setValidation(isValid);
      },
    },
  },
  methods: {
    onInput(event) {
      if (this.mask) {
        this.onInputMasked(event);
      } else {
        this.localValue = event.target.value;
        this.$emit('input', event.target.value);
      }
    },
    onBlur() {
      this.fieldVm.enableFeedbackValidation();
    },
    isValueValid(value) {
      return this.inputValidations
        .every((validationRule) => {
          const isValid = validationRule.validate(value);
          if (!isValid) {
            this.errorMessage = validationRule.errorMessage;
          }
          return isValid;
        });
    },
    getErrorMessage() {
      return this.errorMessage;
    },
    onInputMasked(event) {
      const sanitized = sanitizeValue(event.target.value);
      const maskedValue = this.maskValue(sanitized);
      this.$refs.input.value = maskedValue;
      this.$emit('input', maskedValue);
      this.$emit('input-without-mask', sanitized);
    },
    maskValue(value) {
      const valueString = String(value).trim();
      const maskString = String(this.mask).trim();
      const maskLength = maskString.replace(/[^0]/g, '').length;
      const length = maskLength < valueString.length ? maskLength : valueString.length;
      let result = '';

      for (let index = 0, maskIndex = 0; index < length; maskIndex += 1) {
        const maskCharacter = maskString.charAt(maskIndex);

        if (maskCharacter === '0') {
          result += valueString.charAt(index);
          index += 1;
        } else {
          result += maskCharacter;
        }
      }

      return result;
    },
  },
};
</script>

<style lang="css" scoped>
@import "./input.css";
</style>
