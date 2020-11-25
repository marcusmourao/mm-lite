<script>
export default {
  middleware({ redirect }) {
    redirect({ name: 'ConsultsView' });
  },
};
</script>
