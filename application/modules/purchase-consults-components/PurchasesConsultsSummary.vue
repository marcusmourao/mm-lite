<template>
  <mm-row>
    <mm-col>
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
            <mm-text>Número de Consultas </mm-text>
          </mm-col>
          <mm-col align="right">
            <mm-text>
              Valor unitário da consulta
            </mm-text>
          </mm-col>
        </mm-row>
        <mm-divider />
        <mm-row>
          <mm-col>
            <mm-text>{{ numberOfConsults }}</mm-text>
          </mm-col>
          <mm-col align="right">
            <mm-currency-highlight with-symbol :value="0.24" />
          </mm-col>
        </mm-row>
        <mm-divider v-if="purchaseSummary.discounts.length" />
        <mm-row v-if="purchaseSummary.discounts.length">
          <mm-col align="center">
            <mm-text>Desconto</mm-text>
          </mm-col>
          <mm-col align="center">
            <mm-text>Número de unidades</mm-text>
          </mm-col>
          <mm-col align="right">
            <mm-text>Valor do desconto</mm-text>
          </mm-col>
        </mm-row>
        <mm-divider />
        <mm-row v-for="(discount, index) in purchaseSummary.discounts" :key="index">
          <mm-col align="center">
            <mm-text>{{ discount.description }}</mm-text>
          </mm-col>
          <mm-col align="center">
            <mm-text>{{ discount.numberOfItemsWithDiscount }}</mm-text>
          </mm-col>
          <mm-col align="right">
            <mm-currency-highlight with-symbol :value="discount.discountValue" />
          </mm-col>
        </mm-row>
        <mm-divider />
        <mm-row>
          <mm-col align="right">
            <mm-text>Total da compra: </mm-text>
            <mm-currency-highlight with-symbol :value="purchaseSummary.purchaseValue" />
          </mm-col>
        </mm-row>
      </template>
    </mm-col>
  </mm-row>
</template>

<script>
import MmRow from '../../../components/row';
import MmCol from '../../../components/column';
import MmHeading from '../../../components/heading';
import MmDivider from '../../../components/divider';
import MmText from '../../../components/text';
import MmCurrencyHighlight from '../../../components/currency-highlight';
import { calculateConsultsPurchasePrice } from '../purchase-consults-lib';

export default {
  name: 'PurchasesConsultsSummary',
  components: {
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
