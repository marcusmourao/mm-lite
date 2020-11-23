<template>
  <div class="mm-fetch-content">
    <div v-if="loading" class="mm-fetch-content--loading">
      <mm-loader
        size="medium"
      />
    </div>
    <slot v-else-if="fetchSuccess" />
  </div>
</template>

<script>
import MmLoader from '../loader';

export default {
  name: 'MmFetchContent',
  components: { MmLoader },
  props: {
    fetchAction: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      fetchSuccess: false,
    };
  },
  mounted() {
    this.fetchContent();
  },
  methods: {
    async fetchContent() {
      try {
        this.fetchSuccess = false;
        this.loading = true;
        const response = await this.fetchAction();
        this.$emit('fetch-success', response);
        this.fetchSuccess = true;
      } catch (e) {
        this.$emit('fetch-error', e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="css" scoped>
  @import "./fetchContent.css";
</style>
