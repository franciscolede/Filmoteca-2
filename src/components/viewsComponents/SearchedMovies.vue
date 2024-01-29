<template>
    <div class="trends">
      <div class="movies-container">
        <div class="movie" v-for="movie in movies" :key="movie.id">
          <Movie :movie="movie"/>
        </div>
      </div>
      <Loading v-if="loading"/>
    </div>
  </template>
  
  <script>
  import Loading from '../../components/loading.vue';
  import Movie from '../MovieComponents/Movie.vue';
  
  export default {
    name: 'SearchedMovies',
    components: {
      Loading,
      Movie,
    },
    data() {
      return {
        loading: false,
      };
    },
    computed: {
        movies() {
            return this.$store.getters.getSearchedMovies;
        }
    },
    created() {
        this.handleMoviesChange(this.movies);
    },
    methods: {
        handleMoviesChange(newMovies) {
      if (newMovies.length === 0) {
        this.$router.push({ name: 'discover' });
      }
    },
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