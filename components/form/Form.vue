<template>
  <form
    class="mm-form"
    @submit.prevent.stop="onFormSubmit"
  >
    <slot />
  </form>
</template>

<script>
export default {
  name: 'MmForm',
  provide() {
    return {
      formVm: {
        registerField: this.registerField,
        status: this.status,
      },
    };
  },
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      fields: [],
      status: {
        isSubmitting: false,
        isValid: true,
      },
    };
  },
  computed: {
    isFormValid() {
      if (this.fields.length > 0) {
        return this.fields.every((fieldVm) => fieldVm.isValid);
      }
      return true;
    },
  },
  watch: {
    isFormValid: {
      immediate: true,
      handler() {
        this.status.isValid = this.isFormValid;
      },
    },
  },
  methods: {
    async onFormSubmit() {
      if (!this.status.isValid) return;
      if (this.status.isSubmitting) return;
      try {
        this.status.isSubmitting = true;
        const response = await this.onSubmit();
        this.$emit('submit-success', response);
      } catch (e) {
        this.$emit('submit-error', e);
      } finally {
        this.status.isSubmitting = false;
      }
    },
    registerField(fieldVm) {
      this.fields.push(fieldVm);
    },
  },
};
</script>

<style lang="css" scoped>
@import "./form.css";
</style>
