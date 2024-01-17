import { createStore } from 'vuex'
import axios from 'axios'

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'dd12843975ef1507dc4e7cee16599a96';

export default createStore({
  state: {
    discoverMovies: [],
    searchMovies: [],
  },
  getters: {
    getDiscoverMovies: (state) => state.discoverMovies,
    getSearchMovies: (state) => state.searchMovies,
  },
  mutations: {
    setDiscoverMovies: (state, movies) => {
      state.discoverMovies = movies;
    },
    addDiscoverMovies: (state, movies) => {
      state.discoverMovies = [...state.discoverMovies, ...movies];
    },
    setSearchMovies: (state, movies) => {
      state.searchMovies = movies;
    },
  },
  actions: {
    async discoverMovies({ commit }, page) {
      try {
        const response = await axios.get(`${API_URL}/discover/movie`, {
          params: {
            api_key: API_KEY,
            page: page,
          },
        });

        const movies = response.data.results;

        if (page === 1) {
          commit('setDiscoverMovies', movies);
        } else {
          commit('addDiscoverMovies', movies);
        }
      } catch (error) {
        console.error('Error fetching discover movies:', error);
      }
    },

    async searchMovies({ commit }, query) {
      try {
        const response = await axios.get(`${API_URL}/search/movie`, {
          params: {
            api_key: API_KEY,
            query: query,
          },
        });

        const movies = response.data.results;

        commit('setSearchMovies', movies);
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    },
  },
  modules: {
  }
})
