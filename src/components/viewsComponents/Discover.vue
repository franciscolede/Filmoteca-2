<template>
  <div class="trends">
    <div class="movies-container">
      <div class="movie" v-for="movie in movies" :key="movie.id">
        <Movie :movie="movie" :hover="true"/>
      </div>
    </div>
    <div>
      <button type="button" class="btn btn-success" @click="loadMoreMovies()">Cargar más</button>
    </div>
  </div>
</template>

<script>
import Movie from '../MovieComponents/Movie.vue';

export default {
  name: 'Popular',
  components: {
    Movie,
  },
  data() {
    return {
    };
  },
  mounted() {
    this.$store.commit('clearMovies');
    this.$store.dispatch('fetchMovies');
    this.$store.dispatch('addMovies');
  },
  computed: {
    movies() {
      return this.$store.getters.getMovies.filter(movie => movie.poster_path);
    },
  },
  methods: {
    async loadMoreMovies() {
      await this.$store.dispatch('addMovies');
      this.$store.dispatch('addMovies');
    }
  }
};
</script>

<style scoped>
.movies-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
  margin: 0px 5px;
  grid-gap: 10px;
  justify-content: center;
}

.movie {
  margin: 0;
}


button {
  margin: 5px;
}
</style>