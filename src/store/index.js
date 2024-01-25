import { createStore } from 'vuex'
import axios from 'axios'
import videoModule from './videoModule';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'dd12843975ef1507dc4e7cee16599a96';

export default createStore({
  state: {
    discoverMovies: [],
    searchMovies: [],
    genres: [],
    topRated: [],
  },
  getters: {
    getDiscoverMovies: (state) => state.discoverMovies,
    getSearchMovies: (state) => state.searchMovies,
    getGenres: (state) => state.genres,
    getTopRated: (state) => state.topRated,
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
    setGenres: (state, genres) => {
      state.genres = genres;
    },
    clearMovies: (state) => {
      state.discoverMovies = [];
    },
    setTopRated: (state, topRated) => {
      state.topRated = topRated;
    },
  },
  actions: {
    async discoverMovies({}, { startPage, endPage }) {
      try {
        for (let page = startPage; page <= endPage; page++) {
          await this.dispatch('addMovies', { page });
        }
      } catch (error) {
        console.error('Error fetching discover movies:', error);
      }
    },
  
    async addMovies({ commit }, { page }) {
      try {
        const response = await axios.get(`${API_URL}/discover/movie`, {
          params: {
            api_key: API_KEY,
            page: page,
          }
        });
        const movies = response.data.results;
        commit('addDiscoverMovies', movies);
      } catch (error) {
        console.error('Error fetching added movies:', error);
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

    async fetchGenres({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/genre/movie/list`, {
          params: {
            api_key: API_KEY,
          },
        });

        const genres = response.data.genres;

        commit('setGenres', genres);
      } catch (error) {
        console.error('Error searching genres:', error);
      }
    },

    async fetchTopRated({ commit },) {
      try {
        const response = await axios.get(`${API_URL}/movie/top_rated`, {
          params: {
            api_key: API_KEY,
          },
        });
        const topRated = response.data.results;
        commit('setTopRated', topRated);
      } catch (error) {
        console.error('Error fetching discover movies:', error);
      }
    },
  },
  modules: {
    videoModule: videoModule,
  }
})
