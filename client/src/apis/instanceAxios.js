import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: 'https://app-vue-cli.herokuapp.com/',
});

export default instanceAxios;
