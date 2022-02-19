<template>
  <div class="card col-4 m-2 shadow mx-2 px-4">
    <img
      :src="movie.imgUrl"
      class="card-img-top py-4"
      alt="loading image..."
      height="400px"
    />
    <div class="card-body">
      <h5 class="card-title"> {{ movie.title }}</h5>
      <p class="card-text">Genre: {{ movie.Genre.name }}</p>
      <a
        href="#"
        class="btn btn-success text-center text-light"
        @click.prevent="bookmarkmovie"
        >Add Bokkmark</a
      >
      <a
        href="#"
        class="btn btn-info text-center text-light"
        @click.prevent="detailMovie"
        >Detail</a
      >
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Card',
    props: ['movie'],
    methods: {
      async detailMovie() {
        await this.$store.dispatch('detailMovie', this.movie.id);
      },
      bookmarkmovie() {
        this.$store.dispatch('bookmarkmovie', this.movie.id);
      },
    },
  };
</script>

<style scoped>
  .card {
    background: #293b5f;
  }
  .btn {
    margin-left: 5vh;
  }
</style>
>
