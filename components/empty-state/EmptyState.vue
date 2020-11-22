<template>
  <section>
    <mm-heading type="hero">
      {{ title }}
    </mm-heading>
    <div>
      <slot />
    </div>
    <div>
      <slot name="actions" />
    </div>
  </section>
</template>

<script>

import MmHeading from '../heading';

export default {
  name: 'MmEmptyState',
  components: { MmHeading },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
