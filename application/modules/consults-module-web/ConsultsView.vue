<template>
  <mm-fetch-content
    :fetch-action="fetchAction"
    @fetch-success="onFetchSuccess"
  >
    <consults-empty-state v-if="shouldShowEmptyState" />
    <consults-dashboard
      v-else
      :available-consults-count="availableConsultsCount"
      :used-consults-count="usedConsultsCount"
    />
  </mm-fetch-content>
</template>

<script>
import MmFetchContent from '../../../components/fetch-content';
import ConsultsEmptyState from '../consults-components/ConsultsEmptyState.vue';
import ConsultsDashboard from '../consults-components/ConsultsDashboard.vue';
import { getConsultsTotals } from '../consults-lib';

export default {
  name: 'ConsultsView',
  components: {
    ConsultsDashboard,
    ConsultsEmptyState,
    MmFetchContent,
  },
  data() {
    return {
      availableConsultsCount: null,
      usedConsultsCount: null,
      totalOfConsultsCount: null,
    };
  },
  computed: {
    shouldShowEmptyState() {
      return this.totalOfConsultsCount === 0 || this.totalOfConsultsCount === null;
    },
  },
  methods: {
    fetchAction() {
      return getConsultsTotals();
    },
    onFetchSuccess({ available, used, total }) {
      this.availableConsultsCount = available;
      this.usedConsultsCount = used;
      this.totalOfConsultsCount = total;
    },
  },
};
</script>
