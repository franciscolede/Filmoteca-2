<template>
  <div class="container-fluid genre-section" v-for="genre in genresWithMovies" :key="genre.id">
    <h4 class="title">{{ genre.name }}</h4>
    <div class="container-fluid movies-container">
      <div class="movie" v-for="movie in getMoviesForGenreById(genre.id)" :key="movie.id">
        <Movie :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import Movie from '../MovieComponents/Movie.vue';

export default {
  components: {
    Movie,
  },
  async mounted() {
    try {
      await this.$store.commit('clearMovies');
      await this.$store.dispatch('fetchMoviesGenres');
      await this.$store.dispatch('fetchMovies');
      this.$store.dispatch('addMovies');
    } catch (error) {
      console.error('Error al cargar géneros y películas:', error);
    }
  },
  computed: {
    moviesGenres() {
      return this.$store.getters.getMoviesGenres;
    },
    genresWithMovies() {
      return this.moviesGenres.filter(genre => this.getMoviesForGenreById(genre.id).length >= 5);
    },
  },
  methods: {
    getMoviesForGenreById(genreId) {
      try {
        const movies = this.$store.getters.getMovies.filter((movie) =>
          movie.genre_ids.includes(genreId)
        );
        return movies;
      } catch (error) {
        console.error('Error al obtener películas por género:', error);
        return [];
      }
    },
  }
};
</script>


<style scoped>
.genre-section {
  margin: 10px auto;
  height: 20em;
  width: 85vw;
}

.title {
  text-align: start;
  height: 10%;
}

.movies-container {
  display: flex;
  gap: 5px;
  width: 85vw;
  overflow: auto;
  white-space: nowrap;
  padding: 0px;
  padding-bottom: 5px;

}

.movie {
  height: 240px;
  flex: 0 0 auto;
}



h4 {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
</style>