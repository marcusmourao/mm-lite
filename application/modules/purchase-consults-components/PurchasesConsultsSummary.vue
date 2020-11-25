<template>
  <div>
    <mm-row>
      <mm-col>
        <mm-heading type="title">
          Resumo da compra
        </mm-heading>
      </mm-col>
    </mm-row>
    <template v-if="purchaseSummary">
      <mm-row>
        <mm-col>
          <mm-text>Número de Consultas: {{ numberOfConsults }} </mm-text>
        </mm-col>
        <mm-col>
          <mm-text>
            Valor unitário da consulta:
            <mm-currency-highlight with-symbol :value="0.24" />
          </mm-text>
        </mm-col>
      </mm-row>
      <mm-divider v-if="purchaseSummary.discounts.length" />
      <mm-row v-for="(discount, index) in purchaseSummary.discounts" :key="index">
        <mm-col xs="12" sm="12" md="12" lg="6" xl="6">
          <mm-text>Unidades com desconto: {{ discount.numberOfItemsWithDiscount }}</mm-text>
        </mm-col>
        <mm-col
          xs="12"
          sm="12"
          md="12"
          lg="6"
          xl="6"
        >
          <mm-text>
            Desconto total aplicado:
            <mm-currency-highlight with-symbol :value="discount.discountValue" />
          </mm-text>
        </mm-col>
        <mm-row>
          <mm-col>
            <mm-text>Descrição: {{ discount.description }}</mm-text>
          </mm-col>
        </mm-row>
      </mm-row>
      <mm-divider />
      <mm-row>
        <mm-col>
          <mm-currency-highlight with-symbol :value="purchaseSummary.purchaseValue" />
        </mm-col>
      </mm-row>
    </template>
    <mm-paragraph v-else>
      Selecione a quantidade de consultas desejadas para ver o resumo da sua compra
    </mm-paragraph>
  </div>
</template>

<script>
import MmRow from '../../../components/row';
import MmCol from '../../../components/column';
import MmHeading from '../../../components/heading';
import MmDivider from '../../../components/divider';
import MmText from '../../../components/text';
import MmCurrencyHighlight from '../../../components/currency-highlight';
import { calculateConsultsPurchasePrice } from '../purchase-consults-lib';
import MmParagraph from '../../../components/paragraph';

export default {
  name: 'PurchasesConsultsSummary',
  components: {
    MmParagraph,
    MmCurrencyHighlight,
    MmText,
    MmDivider,
    MmHeading,
    MmCol,
    MmRow,
  },
  props: {
    numberOfConsults: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      purchaseSummary: null,
    };
  },
  watch: {
    numberOfConsults: {
      immediate: true,
      handler() {
        calculateConsultsPurchasePrice(this.numberOfConsults).then((response) => {
          this.purchaseSummary = response;
        }).catch(() => {
          this.purchaseSummary = null;
        });
      },
    },
  },
};
</script>
