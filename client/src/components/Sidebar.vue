<template>
  <div>
    <nav
      id="sidebar"
      class="col-md-3 col-lg-2 d-md-block collaps"
      style="background-color: #293b5f; padding-top: 0"
    >
      <h2 class="nav-link active my-4 text-white">Dashboard</h2>
      <div class="position-sticky">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a href="" class="nav-link text-white" @click.prevent="toMovieList">
              <h5>Movie List</h5></a
            >
          </li>
          <li class="nav-item">
            <a href="" class="nav-link text-white" @click.prevent="toBookmark">
              <h5>Bookmark List</h5></a
            >
          </li>
        </ul>
        <div>
          <div class="input-group my-5">
            <input
              type="search"
              class="form-control rounded"
              placeholder="Search title"
              aria-label="Search"
              aria-describedby="search-addon"
              v-model="title"
            />
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="fetchMovie"
            >
              search
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'Sidebar',
    data() {
      return {
        title: '',
      };
    },
    methods: {
      toBookmark() {
        this.$router.push('/bookmark');
      },
      toMovieList() {
        this.$router.push('/');
      },
      fetchMovie() {
        this.$store.commit('SET_FILTER_TITLE', this.title);
        this.$store.dispatch('fetchMovie');
      },
    },
  };
</script>

<style></style>
