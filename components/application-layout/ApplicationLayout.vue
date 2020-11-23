<template>
  <div class="mm-application-layout">
    <header class="mm-application-layout__header">
      <nav>{{ title }}</nav>
    </header>
    <main>
      <slot />
    </main>
    <footer class="mm-application-layout__footer">
      {{ footerText }}
    </footer>
  </div>
</template>

<script>
export default {
  name: 'MmApplicationLayout',
  props: {
    title: {
      type: String,
      required: true,
    },
    footerText: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
@import './ApplicationLayout.css';
</style>
