<template>
  <div class="home">
    <MovieList></MovieList>
  </div>
</template>

<script>
import MovieList from '../components/MovieList.vue'
export default {
  name: 'Home',
  components: {
    MovieList
  }
}
</script>
