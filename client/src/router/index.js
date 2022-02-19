import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Detail from "../views/DetailMovie.vue";
import Bookmark from "../views/Bookmark.vue";
import DetailBookmark from "../views/DetailBookmark.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/detail",
    name: "Detail",
    component: Detail,
  },
  {
    path: "/bookmark",
    name: "Bookmark",
    component: Bookmark,
  },
  {
    path: "/bookmark/detail",
    name: "DetailBookmark",
    component: DetailBookmark,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem("access_token");
  if (to.name === "Bookmark" && !accessToken) next({ name: "Login" });
  else if (to.name === "Login" && accessToken) next({ name: "Home" });
  else if (to.name === "Register" && accessToken) next({ name: "Login" });
  else if (to.name === "Bookmark" && !accessToken) next({ name: "Login" });
  else next();
});

export default router;
