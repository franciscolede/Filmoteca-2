import { createStore } from 'vuex'
import axios from 'axios'

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'dd12843975ef1507dc4e7cee16599a96';
const IMAGE_PATH = 'https://image.tmdb.org/t/p/original/';

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {'x-apikey': 'dd12843975ef1507dc4e7cee16599a96'},
// });

export default createStore({
  state: {
    movies: [],
  },
  getters: {
    getMovies: (state) => state.movies,
  },
  mutations: {
    setMovies: (state, movies) => {
      state.movies = movies;
    },
    addMovies: (state, movies) => {
      state.movies = [...state.movies, ...movies];
    },
  },
  actions: {
    async fetchMovies({ commit }, page) {
      try {
        const response = await axios.get(`${API_URL}/discover/movie`, {
          params: {
            api_key: API_KEY,
            page: page,
          },
        });

        const movies = response.data.results;

        if (page === 1) {
          commit('setMovies', movies);
        } else {
          commit('addMovies', movies);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
  },
  modules: {
  }
})
