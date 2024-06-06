<template>
  <div class="trends">
    <div class="movies-container">
      <div class="movie" v-for="movie in movies" :key="movie.id">
        <Movie :movie="movie" :isDiscover="true"/>
      </div>
    </div>
  </div>
</template>

<script>
import Movie from '../MovieComponents/Movie.vue';

export default {
  name: 'SearchedMovies',
  components: {
    Movie,
  },
  computed: {
      movies() {
          return this.$store.getters.getMovies;
      }
  },
};
</script>

<style scoped>


.movies-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
  margin: 0px 5px;
  grid-gap: 15px;
  justify-content: center;
}

.movie {
  margin: 0;

}

button {
  margin: 5px;
}
</style>