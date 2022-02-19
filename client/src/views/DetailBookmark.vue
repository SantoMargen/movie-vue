<template>
  <div>
    <BookmarkDetail :detailBookmark="detailBookmark"></BookmarkDetail>
  </div>
</template>

<script>
import BookmarkDetail from "../components/BookmarkDetail.vue";

export default {
  name: "DetailBookmark",
  components: {
    BookmarkDetail,
  },
  computed: {
    detailBookmark() {
      return this.$store.state.detailBookmark;
    },
  },
};
</script>

<style></style>
