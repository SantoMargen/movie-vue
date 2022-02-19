<template>
  <div class="container ml-4">
    <div
      class="
        row
        d-flex
        justify-content-center
        align-items-center
        p-3
        text-light
      "
    >
      <CardMovie
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      ></CardMovie>
      <div class="d-flex justify-content-center my-5">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" @click.prevent="gotoPage('prev')"
                >Previous</a
              >
            </li>
            <li class="page-item">
              <a class="page-link" href="#" @click.prevent="gotoPage(1)">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" @click.prevent="gotoPage(2)">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" @click.prevent="gotoPage(3)">3</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" @click.prevent="gotoPage(4)">4</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" @click.prevent="gotoPage('next')"
                >Next</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
  import CardMovie from './CardMovie.vue';

  export default {
    name: 'MovieList',
    components: {
      CardMovie,
    },
    computed: {
      movies() {
        return this.$store.state.movies;
      },
    },
    methods: {
      gotoPage(page) {
        switch (page) {
          case 'next':
            this.$store.commit('INCREMENT_PAGE');
            break;
          case 'prev':
            this.$store.commit('DECREMENT_PAGE');
            break;
          default:
            this.$store.commit('SET_PAGE', page);
            break;
        }
        this.$store.dispatch('fetchMovie');
      },
    },
    created() {
      this.$store.dispatch('fetchMovie');
    },
  };
</script>
<style scoped>
  #movie-card {
    flex-wrap: wrap;
  }
</style>
>
