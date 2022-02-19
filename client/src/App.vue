<template>
  <div id="app">
    <Navbar></Navbar>
    <Sidebar></Sidebar>
    <router-view />
  </div>
</template>
<script>
  import Navbar from './components/Navbar.vue';
  import Sidebar from './components/Sidebar.vue';

  export default {
    name: 'App',
    components: {
      Navbar,
      Sidebar,
    },
    created() {
      if (localStorage.getItem('access_token')) {
        this.$store.commit('SET_ISLOGEDIN', true);
      }
    },
  };
</script>

<style>
  #app {
    min-height: 100vh;
  }
  #home {
    background-color: #73a1cf;
  }
  #sidebar {
    background-color: #73a1cf;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    padding: 90px 0 0;
    z-index: 99;
  }
  .container {
    margin-bottom: 15vh;
    margin-left: 10vw;
  }
  #list-movie {
    margin-left: 8vh;
  }
  #movie-card {
    margin-left: 20vh;
    margin-right: 20vh;
    width: auto;
  }
</style>
