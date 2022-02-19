<template>
  <nav
    class="navbar navbar-expand-lg row shadow"
    style="background-color: #293b5f"
  >
    <div class="d-flex justify-content-end">
      <a
        class="nav-link active text-white"
        aria-current="page"
        href="#"
        @click.prevent="toHomePage"
        v-if="isLogged"
        >Home</a
      >
      <a
        href="#"
        class="nav-link active text-white"
        v-if="!isLogged"
        @click.prevent="toLoginPage"
        >Login</a
      >
      <a
        href="#"
        class="nav-link active text-white"
        v-if="!isLogged"
        @click.prevent="toRegisterPage"
        >Register</a
      >
      <a
        class="nav-link active text-white"
        aria-current="page"
        href="#"
        v-if="isLogged"
        @click.prevent="logout"
        >Logout</a
      >
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'Navbar',
    computed: {
      isLogged() {
        return this.$store.state.isLogged;
      },
    },
    methods: {
      logout() {
        localStorage.clear();
        this.$router.push('/login');
      },
      toRegisterPage() {
        this.$router.push('/register');
      },
      toLoginPage() {
        this.$router.push('/login');
      },
      toHomePage() {
        this.$router.push('/');
      },
    },
  };
</script>

<style></style>
