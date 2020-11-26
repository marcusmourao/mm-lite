<template>
  <mm-form :on-submit="submit">
    <mm-row>
      <mm-col>
        <mm-field required label="CNPJ">
          <mm-masked-input v-model="identifier" mask="00.000.000/0000-00" />
        </mm-field>
      </mm-col>
    </mm-row>
    <mm-row>
      <mm-col>
        <mm-field required label="Titular do cartão">
          <mm-input v-model="name" />
        </mm-field>
      </mm-col>
    </mm-row>
    <mm-row>
      <mm-col>
        <mm-field required label="Número do cartão">
          <mm-masked-input v-model="cardNumber" mask="0000 0000 0000 0000" />
        </mm-field>
      </mm-col>
    </mm-row>
    <mm-row>
      <mm-col xs="12" sm="12" md="12" lg="12" xl="6">
        <mm-field required label="Data de vencimento">
          <mm-masked-input v-model="expirationDate" mask="00/0000" />
        </mm-field>
      </mm-col>
      <mm-col xs="12" sm="12" md="12" lg="12" xl="6">
        <mm-field required label="CVV">
          <mm-masked-input v-model="verificationCode" mask="000" />
        </mm-field>
      </mm-col>
    </mm-row>
    <mm-row vertical-offset="medium" justify="space-between">
      <mm-col auto>
        <mm-button @click="cancel">
          Cancelar
        </mm-button>
      </mm-col>
      <mm-col auto>
        <mm-submit-button theme="success">
          Finalizar compra
        </mm-submit-button>
      </mm-col>
    </mm-row>
  </mm-form>
</template>

<script>
import MmField from '../../../components/field';
import MmForm from '../../../components/form';
import MmInput from '../../../components/input';
import MmRow from '../../../components/row';
import MmCol from '../../../components/column';
import MmSubmitButton from '../../../components/submit-button';
import MmButton from '../../../components/button';
import MmMaskedInput from '../../../components/masked-input';

export default {
  name: 'PurchaseForm',
  components: {
    MmMaskedInput,
    MmButton,
    MmSubmitButton,
    MmCol,
    MmRow,
    MmInput,
    MmField,
    MmForm,
  },
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      identifier: '',
      name: '',
      cardNumber: '',
      expirationDate: '',
      verificationCode: '',
    };
  },
  methods: {
    submit() {
      this.onSubmit({
        identifier: this.identifier,
        name: this.name,
        cardNumber: this.cardNumber,
        expirationDate: this.expirationDate,
        verificationCode: this.verificationCode,
      });
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};

</script>
