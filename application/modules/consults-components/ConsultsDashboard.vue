<template>
  <div>
    <mm-row>
      <mm-col>
        <mm-row>
          <mm-col align="center">
            <mm-heading type="title">
              Consultas disponíveis
            </mm-heading>
          </mm-col>
        </mm-row>
        <mm-row>
          <mm-col align="center">
            <mm-card>
              <mm-number-highlight :value="availableConsultsCount" />
            </mm-card>
          </mm-col>
        </mm-row>
        <mm-row vertical-offset="large">
          <mm-col align="center">
            <mm-button @click="redirectToBuyConsults">
              Comprar consultas
            </mm-button>
          </mm-col>
        </mm-row>
      </mm-col>
    </mm-row>
  </div>
</template>

<script>
import MmCard from '../../../components/card';
import MmButton from '../../../components/button';
import MmRow from '../../../components/row';
import MmCol from '../../../components/column';
import MmNumberHighlight from '../../../components/number-highlight';
import MmHeading from '../../../components/heading';

export default {
  name: 'ConsultsDashboard',
  components: {
    MmHeading,
    MmNumberHighlight,
    MmCol,
    MmRow,
    MmButton,
    MmCard,
  },
  props: {
    availableConsultsCount: {
      type: Number,
      required: true,
    },
    usedConsultsCount: {
      type: Number,
      required: true,
    },
  },
  methods: {
    redirectToBuyConsults() {
      this.$router.push({ name: 'BuyConsultsView' });
    },
  },
};
</script>

<style scoped>

</style>
