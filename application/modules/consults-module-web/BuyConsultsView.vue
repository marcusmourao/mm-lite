<template>
  <div>
    <mm-heading type="hero">
      Comprar consultas
    </mm-heading>
    <mm-row>
      <mm-col xs="12" sm="12" md="6" lg="5" xl="5">
        <purchase-consults-form
          v-if="!numberOfConsults"
          @number-of-consults-change="onChangeNumberOfConsults"
          @select-number-of-consults="onSelectNumberOfConsults"
        />
        <purchase-form v-else :on-submit="purchaseConsults" @cancel="onCancel" />
      </mm-col>
      <mm-col xs="12" sm="12" md="6" lg="7" xl="7">
        <purchases-consults-summary :number-of-consults="numberOfConsultsWanted" />
      </mm-col>
    </mm-row>
  </div>
</template>

<script>
import MmHeading from '../../../components/heading';
import MmRow from '../../../components/row';
import MmCol from '../../../components/column';
import { purchaseConsults } from '../purchase-consults-lib';
import { PurchaseConsultsForm, PurchasesConsultsSummary } from '../purchase-consults-components';
import { PurchaseForm } from '../purchase-componens';

export default {
  name: 'BuyConsultsView',
  components: {
    PurchasesConsultsSummary,
    PurchaseForm,
    PurchaseConsultsForm,
    MmCol,
    MmRow,
    MmHeading,
  },
  data() {
    return {
      numberOfConsults: null,
      numberOfConsultsWanted: 1,
      purchaseValue: null,
    };
  },
  methods: {
    onChangeNumberOfConsults(numberOfConsults) {
      this.numberOfConsultsWanted = numberOfConsults;
    },
    onSelectNumberOfConsults(numberOfConsults) {
      this.numberOfConsultsWanted = numberOfConsults;
      this.numberOfConsults = numberOfConsults;
    },
    onCancel() {
      this.numberOfConsults = null;
    },
    purchaseConsults({
      name,
      identifier,
      cardNumber,
      expirationDate,
      verificationCode,
    }) {
      return purchaseConsults({
        numberOfItems: this.numberOfConsults,
        paymentInfo: {
          cardNumber,
          expirationDate,
          verificationCode,
        },
        customerInfo: {
          name,
          identifier,
        },
      }).then(() => {
        this.$router.push({ name: 'ConsultsView' });
      });
    },
  },
};
</script>
