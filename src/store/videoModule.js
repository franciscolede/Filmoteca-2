import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'dd12843975ef1507dc4e7cee16599a96';

export default {
  namespaced: true, 

  state: {
    videos: [],
  },

  getters: {
    getVideos: (state) => state.videos,
  },

  mutations: {
    setVideos: (state, videos) => {
      state.videos = videos;
    },
  },

  actions: {
    async fetchVideos({ commit }, movieId) {
      try {
        const response = await axios.get(`${API_URL}/movie/${movieId}/videos`, {
          params: {
            api_key: API_KEY,
          },
        });

        console.log(response);
        const videos = response.data.results;

        commit('setVideos', videos);
      } catch (error) {
        console.error('Error fetching movie videos:', error);
      }
    },
  },
};