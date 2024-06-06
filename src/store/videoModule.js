import axios from 'axios';

import { API_URL, API_KEY } from '../data/moviesApiConfig.js';

export default {
  namespaced: true, 

  state: {
    movieTrailer: null,
  },

  getters: {
    getMovieTrailer: (state) => state.movieTrailer,
  },

  mutations: {
    setMovieTrailer(state, movieTrailer) {
      state.movieTrailer = movieTrailer;
    },
    clearMovieTrailer(state) {
      state.movieTrailer = null;
    },
  },

  actions: {
    async fetchTrailerByMovieId({ commit }, movieId) {
      try {
        const response = await axios.get(`${API_URL}/movie/${movieId}/videos`, {
          params: {
            api_key: API_KEY,
          },
        });

        const movieTrailer = response.data.results.find(video => video.type === 'Trailer') || null;

        commit('setMovieTrailer', movieTrailer);
      } catch (error) {
        console.error('Error fetching movie trailer:', error);
      }
    },
  },
};