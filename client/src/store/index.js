import instanceAxios from '../apis/instanceAxios.js';
import Vue from 'vue';
import Vuex from 'vuex';
import Swal from 'sweetalert2';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    movies: [],
    movie: {},
    bookmarks: [],
    bookmark: {},
    viewMovie: {},
    detailBookmark: {},
    pages: 1,
    filter: {
      page: 1,
    },
    search: {},
    ttitle: '',
    message: '',
  },
  mutations: {
    FETCH_MOVIES(state, payload) {
      state.movies = payload;
    },
    SET_ISLOGEDIN(state, payload) {
      state.isLogged = payload;
    },
    FETCH_BOOKMAKS(state, payload) {
      state.bookmarks = payload;
    },
    FETCH_DETAIL_MOVIE(state, payload) {
      state.viewMovie = payload;
    },
    BOOKMARK_MOVIE(state, payload) {
      state.bookmark = payload;
    },
    THIS_PAGE(state, payload) {
      state.pages = payload;
    },
    INCREMENT_PAGE(state) {
      if (state.filter.page < state.pages) {
        state.filter.page++;
      } else if (state.filter.page >= state.pages) {
        state.filter.page = state.pages;
      }
    },
    DECREMENT_PAGE(state) {
      if (state.filter.page > 1) {
        state.filter.page--;
      } else {
        state.filter.page = 1;
      }
    },
    SET_PAGE(state, payload) {
      state.filter.page = payload;
    },
    SET_FILTER_TITLE(state, payload) {
      state.filter.title = payload;
    },
    FETCH_DATA_BOOKMARK(state, payload) {
      state.detailBookmark = payload;
    },
  },
  actions: {
    async handlerLogin(contex, payload) {
      try {
        const response = await instanceAxios({
          method: 'POST',
          url: '/customer/login',
          data: payload,
        });
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('role', response.data.role);
        contex.commit('SET_ISLOGEDIN', true);
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message,
        });
      }
    },
    async handlerRegister(_, payload) {
      try {
        const response = await instanceAxios({
          method: 'POST',
          url: '/customer/register',
          data: payload,
        });
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: `you'r account ${response.data.username} succces registered.Now you can login`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.$router.push('/login');
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message,
        });
      }
    },
    async fetchMovie({ commit, state }) {
      try {
        const response = await instanceAxios({
          method: 'GET',
          url: '/customer/movies',
          params: state.filter,
        });
        const totalPages = response.data.totalPages;
        const movies = response.data.movies;
        commit('FETCH_MOVIES', movies);
        commit('THIS_PAGE', totalPages);
        commit('SET_FILTER_TITLE');
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message,
        });
      }
    },
    async fetchBookmark(contex) {
      try {
        const response = await instanceAxios({
          method: 'GET',
          url: '/customer/bookmarks',
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        });
        const bookmarks = response.data;
        contex.commit('FETCH_BOOKMAKS', bookmarks);
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message,
        });
      }
    },
    async detailMovie({ commit }, payload) {
      try {
        const response = await instanceAxios({
          method: 'GET',
          url: `/customer/movies/${payload}`,
        });
        const movie = response.data;
        commit('FETCH_DETAIL_MOVIE', movie);
        router.push('/detail');
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message,
        });
      }
    },
    async bookmarkmovie(contex, payload) {
      try {
        const response = await instanceAxios({
          method: 'POST',
          url: `/customer/bookmarks/${payload}`,
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        });
        const data = response.data;
        contex.commit('BOOKMARK_MOVIE', data);
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message,
        });
      }
      router.push('/bookmark');
    },
    removeBookmark({ dispatch }, id) {
      return new Promise((resolve, reject) => {
        instanceAxios({
          method: 'DELETE',
          url: `/customer/bookmarks/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        })
          .then(({ data }) => {
            dispatch('fetchBookmark');
            resolve(data);
          })
          .catch(({ response }) => {
            reject(response);
          });
      });
    },
    async googleLogin(contex, payload) {
      try {
        const id_token = payload.getAuthResponse().id_token;
        const response = await instanceAxios({
          method: 'POST',
          url: '/customer/google-login',
          data: { id_token: id_token },
        });
        localStorage.setItem('access_token', response.data.access_token);
        contex.commit('SET_ISLOGEDIN', true);
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message,
        });
      }
    },
    async detailBookmark(contex, payload) {
      try {
        const response = await instanceAxios({
          method: 'GET',
          url: `/customer/bookmarks/${payload}`,
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        });
        const detailBookmark = response.data;
        contex.commit('FETCH_DATA_BOOKMARK', detailBookmark);
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message,
        });
      }
    },
  },
  modules: {},
});
