<template>
  <div class="container my-4">
    <div class="row justify-content-start d-flex text-light align-items-center">
      <BookmarkCard
        v-for="bookmark in bookmarks"
        :key="bookmark.id"
        :bookmark="bookmark"
      ></BookmarkCard>
    </div>
  </div>
</template>

<script>
import BookmarkCard from "./BookmarkCard.vue";
export default {
  name: "BookmarkLisr",
  components: {
    BookmarkCard,
  },
  computed: {
    bookmarks() {
      return this.$store.state.bookmarks;
    },
  },
  created() {
    this.$store.dispatch("fetchBookmark");
  },
};
</script>

<style></style>
