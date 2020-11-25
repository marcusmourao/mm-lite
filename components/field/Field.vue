<template>
  <div class="mm-field" :class="classes">
    <mm-label>{{ label }}</mm-label>
    <slot />
    <div class="mm-field__error-message-container">
      <span v-if="showInvalidFeedback" class="mm-field__error-message">
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<script>
import MmLabel from '../label';

export default {
  name: 'MmField',
  components: { MmLabel },
  props: {
    label: {
      type: String,
      required: true,
    },
    required: Boolean,
  },
  provide() {
    return {
      fieldVm: {
        setErrorMessage: this.setErrorMessage,
        setValidation: this.setValidation,
        enableFeedbackValidation: this.enableFeedbackValidation,
        isRequired: this.required,
      },
    };
  },
  inject: {
    formVm: {
      default: null,
    },
  },
  data() {
    return {
      errorMessage: null,
      isValid: true,
      isValidationFeedbackEnabled: false,
    };
  },
  computed: {
    showInvalidFeedback() {
      return this.isValidationFeedbackEnabled && !this.isValid;
    },
    classes() {
      return {
        'mm-field--invalid': this.showInvalidFeedback,
        'mm-field--required': this.required,
      };
    },
  },
  created() {
    this.formVm.registerField(this.$data);
  },
  methods: {
    setErrorMessage(message) {
      this.errorMessage = message;
    },
    setValidation(isValid) {
      this.isValid = isValid;
    },
    enableFeedbackValidation() {
      this.isValidationFeedbackEnabled = true;
    },
  },
};
</script>

<style lang="css" scoped>
@import "./field.css";
</style>
