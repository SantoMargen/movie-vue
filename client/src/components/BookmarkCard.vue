<template>
  <div class="card-bookmark col-3">
    <div class="card mx-auto my-3">
      <img :src="bookmark.Movie.imgUrl" class="card-img-top" height="300px" />
      <div class="card-body card-body">
        <h6 class="card-title">{{ bookmark.Movie.title }}</h6>
        <a
          href="#"
          class="btn btn-danger text-center text-light mx-3 my-2"
          @click.prevent="removeBookmark"
          >Remove Bookmark</a
        >
        <a
          href="#"
          class="btn btn-info text-center text-light mx-3 my-2"
          @click.prevent="detailBookmark"
          @click="todetailBookmark"
          >Detail</a
        >
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BookmarkCard',
    props: ['bookmark'],
    methods: {
      async removeBookmark() {
        await this.$store.dispatch('removeBookmark', this.bookmark.id);
      },
      async detailBookmark() {
        await this.$store.dispatch('detailBookmark', this.bookmark.id);
      },
      todetailBookmark() {
        this.$router.push('/bookmark/detail');
      },
    },
  };
</script>

<style scoped>
  .card {
    background: #293b5f;
    justify-content: center;
  }
  .card-bookmark {
    margin-left: 3vw;
  }
</style>
