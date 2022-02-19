<template>
  <div class="container">
    <div class="flex">
      <!-- Title -->
      <h1 class="text-4xl mt-4">{{ detailBookmark.Movie.title }}</h1>
      <div>
        <img
          :src="detailBookmark.Movie.imgUrl"
          class="card-img-top py-4"
          alt="loading image..."
          height="600px"
          width="200px"
        />
      </div>
      <h5>
        <strong>Genre: {{ detailBookmark.Movie.Genre.name }}</strong>
      </h5>
      <p>
        <strong>Rating: {{ detailBookmark.Movie.rating }}</strong>
      </p>
      <p>
        <strong>Author: {{ detailBookmark.Movie.User.username }}</strong>
      </p>
      <p>
        <strong>Trailer:</strong>
        <a :href="detailBookmark.Movie.trailerUrl">
          {{ detailBookmark.Movie.title }}</a
        >
      </p>
      <p>
        <strong>Synopsis: </strong>
      </p>
      <p style="text-indent: 45px">{{ detailBookmark.Movie.synopsis }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookmarkDetail",
  props: ["detailBookmark"],
};
</script>

<style scoped>
.container {
  margin-left: 20vw;
}
</style>
