<template>
  <mm-application-layout
    title="MM Lite"
    footer-text="Copyright 2020 - Todos os direitos reservados - MM Lite"
  >
    <Nuxt />
  </mm-application-layout>
</template>
<script>
import MmApplicationLayout from '../components/application-layout/ApplicationLayout.vue';

export default {
  components: { MmApplicationLayout },
};
</script>
