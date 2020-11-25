<template>
  <mm-text v-if="withSymbol">
    R$
    <mm-text>
      {{ currencyValueFormatted }}
    </mm-text>
  </mm-text>
  <mm-text v-else>
    {{ currencyValueFormatted }}
  </mm-text>
</template>

<script>
import MmText from '../text';
import Money from '../../core/money';

export default {
  name: 'MmCurrencyHighlight',
  components: { MmText },
  props: {
    value: {
      type: Number,
      required: true,
    },
    withSymbol: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currencyValueFormatted() {
      return new Money(this.value).toFormat();
    },
  },
};
</script>

<style scoped>
@import "./currencyHighlight.css";
</style>
