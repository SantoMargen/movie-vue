<template>
  <div class="container">
    <div class="flex">
      <!-- Title -->
      <h1 class="text-4xl mt-4">{{ viewMovie.title }}</h1>
      <div>
        <img
          :src="viewMovie.imgUrl"
          class="card-img-top py-4"
          alt="loading image..."
          height="600px"
          width="200px"
        />
      </div>
      <h5>
        <strong>Genre: {{ viewMovie.Genre.name }}</strong>
      </h5>
      <p>
        <strong>Rating: {{ viewMovie.rating }}</strong>
      </p>
      <p>
        <strong>Author: {{ viewMovie.User.username }}</strong>
      </p>
      <p>
        <strong>Trailer:</strong>
        <a :href="viewMovie.trailerUrl"> {{ viewMovie.title }}</a>
      </p>
      <p>
        <strong>Synopsis: </strong>
      </p>
      <p style="text-indent: 45px">{{ viewMovie.synopsis }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardMovieDetail",
  props: ["viewMovie"],
};
</script>

<style scoped>
.container {
  margin-left: 20vw;
}
</style>
