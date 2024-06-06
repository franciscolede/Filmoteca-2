import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'dd12843975ef1507dc4e7cee16599a96';

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
    cleanMovieTrailer(state) {
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
    cleanMovieTrailer({commit}){
      commit('cleanMovieTrailer');
    }
  },
};