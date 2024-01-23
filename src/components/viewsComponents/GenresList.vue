<template>
    <div class="container-xxl genre-section" v-for="genre in genresWithMovies" :key="genre.id">
      <h4 class="title">{{ genre.name }}</h4>
      <div class="genre-container container-xxl">
        <div class="movies-container">
          <div class="movie" style="display: inline-block;" v-for="movie in getMoviesByGenre(genre.id)" :key="movie.id">
            <Movie :movie="movie" />
          </div>
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
    await this.$store.dispatch('fetchGenres');
    await this.$store.commit('clearMovies');
    await this.$store.dispatch('discoverMovies', { startPage: 1, endPage: 3 });
  } catch (error) {
    console.error('Error al cargar géneros y películas:', error);
  }
},
  computed: {
    genres() {
      return this.$store.getters.getGenres;
    },
    genresWithMovies() {
      return this.genres.filter(genre => this.hasMovies(genre.id));
    },
  },
  methods: {
    getMoviesByGenre(genreId) {
      try {
        const movies = this.$store.getters.getDiscoverMovies.filter((movie) =>
          movie.genre_ids.includes(genreId)
        );
        return movies;
      } catch (error) {
        console.error('Error al obtener películas por género:', error);
        return [];
      }
    },
    hasMovies(genreId) {
      return this.getMoviesByGenre(genreId).length >= 8;
    },
  }
};
</script>
  

<style scoped>
.genre-section{
  margin: 10px auto;
}

.title {
  text-align: start;
}

.genre-container {
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  padding: 0px;
}



.movies-container {
  display: flex;
  flex-wrap: nowrap;
}

.movie {
  flex: 0 0 8em;
  margin-right: 10px;
  height: 100%;
  white-space: wrap;
}
</style>