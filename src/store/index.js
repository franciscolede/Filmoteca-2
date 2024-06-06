import { createStore } from 'vuex'
import axios from 'axios'
import videoModule from './videoModule';

import { API_URL, API_KEY } from '../data/moviesApiConfig.js';

export default createStore({
  state: {
    movies: [],
    currentPage: 1,
    searchingMovies: [],
    moviesGenres: [],
    topRatedMovies: [],
  },
  getters: {
    getMovies: (state) => state.movies,
    getSearchingMovies: (state) => state.searchingMovies,
    getMoviesGenres: (state) => state.moviesGenres,
    getTopRatedMovies: (state) => state.topRatedMovies,
  },
  mutations: {
    setMovies: (state, movies) => {
      state.movies = movies;
      state.currentPage++;
    },
    clearMovies: (state) => {
      state.movies = [];
    },
    
    addMovies: (state, movies) => {
      state.movies = [...state.movies, ...movies];
      state.currentPage++;
    },

    setSearchingMovies: (state, movies) => {
      state.searchingMovies = movies;
    },
    clearSearchingMovies: (state) => {
      state.searchingMovies = [];
    },
    
    setMoviesGenres: (state, moviesGenres) => {
      state.moviesGenres = moviesGenres;
    },
    setTopRatedMovies: (state, topRatedMovies) => {
      state.topRatedMovies = topRatedMovies;
    },
  },
  actions: {
    async fetchMovies({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/discover/movie`, {
          params: {
            api_key: API_KEY,
            page: this.currentPage,
          }
        });
        const movies = response.data.results;
        commit('setMovies', movies);
      } catch (error) {
        console.error('Error fetching discover movies:', error);
      }
    },

    async searchMoviesByNameAndTyping({ commit }, { name, typing }) {
      try {
        const response = await axios.get(`${API_URL}/search/movie`, {
          params: {
            api_key: API_KEY,
            query: name,
          },
        });
        const movies = response.data.results;
        if (typing) {
          commit('setSearchingMovies', movies);
        } else {
          commit('setMovies', movies);
        }
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    },

    async addMovies({ commit, state }) {
      try {
        const nextPage = state.currentPage + 1;
        const response = await axios.get(`${API_URL}/discover/movie`, {
          params: {
            api_key: API_KEY,
            page: nextPage,
          }
        });
        const movies = response.data.results;
        commit('addMovies', movies);
      } catch (error) {
        console.error('Error fetching added movies:', error);
      }
    },



    async fetchMoviesGenres({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/genre/movie/list`, {
          params: {
            api_key: API_KEY,
          },
        });

        const moviesGenres = response.data.genres;

        commit('setMoviesGenres', moviesGenres);
      } catch (error) {
        console.error('Error searching movies genres:', error);
      }
    },

    async fetchTopRatedMovies({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/movie/top_rated`, {
          params: {
            api_key: API_KEY,
          },
        });
        const topRatedMovies = response.data.results;
        commit('setTopRatedMovies', topRatedMovies);
      } catch (error) {
        console.error('Error fetching top-rated movies:', error);
      }
    },
  },
  modules: {
    videoModule: videoModule,
  }
})
