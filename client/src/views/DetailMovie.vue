<template>
  <div>
    <CardMovieDetail :viewMovie="viewMovie"></CardMovieDetail>
  </div>
</template>
<script>
import CardMovieDetail from "../components/CardMovieDetail.vue";
export default {
  name: "DetailMovie",
  components: {
    CardMovieDetail,
  },
  computed: {
    viewMovie() {
      return this.$store.state.viewMovie;
    },
  },
};
</script>
<style></style>
