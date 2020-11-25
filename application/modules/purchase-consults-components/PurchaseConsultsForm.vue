<template>
  <mm-form :on-submit="onSubmit">
    <mm-row>
      <mm-col>
        <mm-field required label="Número de consultas">
          <mm-number-input
            v-model="numberOfItems"
            min="1"
            :custom-validations="customValidations"
          />
        </mm-field>
      </mm-col>
    </mm-row>
    <mm-row>
      <mm-col align="center">
        <mm-button @click="backToConsultsView">
          Voltar
        </mm-button>
        <mm-submit-button theme="success">
          Avançar
        </mm-submit-button>
      </mm-col>
    </mm-row>
  </mm-form>
</template>

<script>
import MmForm from '../../../components/form';
import MmRow from '../../../components/row';
import MmCol from '../../../components/column';
import MmField from '../../../components/field';
import MmNumberInput from '../../../components/number-input';
import MmSubmitButton from '../../../components/submit-button';
import MmButton from '../../../components/button';

export default {
  name: 'PurchaseConsultsForm',
  components: {
    MmButton,
    MmSubmitButton,
    MmNumberInput,
    MmField,
    MmCol,
    MmRow,
    MmForm,
  },
  data() {
    return {
      numberOfItems: 1,
    };
  },
  computed: {
    customValidations() {
      return [{
        validate: this.isNumberOfConsultsValid,
        errorMessage: 'Insira ao menos uma unidade',
      }];
    },
  },
  watch: {
    numberOfItems() {
      if (this.isNumberOfConsultsValid(this.numberOfItems)) {
        this.$emit('number-of-consults-change', this.numberOfItems);
      }
    },
  },
  methods: {
    isNumberOfConsultsValid(value) {
      return value > 0;
    },
    onSubmit() {
      return this.$emit('select-number-of-consults', this.numberOfItems);
    },
    backToConsultsView() {
      this.$router.push({ name: 'ConsultsView' });
    },
  },
};
</script>
