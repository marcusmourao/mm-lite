<template>
  <mm-empty-state title="Bem vindo ao MM Lite">
    <mm-paragraph>
      Obrigado por escolher o MM Lite para consultas suas NFEs.
      Preparamos um sitema para dar mais agilidade e praticidade no seu dia a dia
    </mm-paragraph>
    <mm-paragraph>
      Para realizar suas consultas é necessário adquirir créditos primeiro. Vamos começar?
    </mm-paragraph>
    <mm-row slot="actions" vertical-offset="medium">
      <mm-col align="center">
        <mm-button
          @click="redirectToBuyConsults"
        >
          Comprar minha primeira consulta
        </mm-button>
      </mm-col>
    </mm-row>
  </mm-empty-state>
</template>

<script>
import MmEmptyState from '../../../components/empty-state';
import MmParagraph from '../../../components/paragraph';
import MmButton from '../../../components/button';
import MmRow from '../../../components/row';
import MmCol from '../../../components/column';

export default {
  name: 'ConsultsEmptyState',
  components: {
    MmCol, MmRow, MmButton, MmParagraph, MmEmptyState,
  },
  methods: {
    redirectToBuyConsults() {
      this.$router.push({ name: 'BuyConsultsView' });
    },
  },
};
</script>
