<template>
  <div class="trends">
    <div class="movies-container">
      <div class="movie" v-for="movie in movies" :key="movie.id">
        <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" />
      </div>
    </div>
    <div>
      <button type="button" class="btn btn-primary" @click="loadMore">Cargar más</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popular',
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    movies() {
      return this.$store.getters.getMovies;
    },
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    getImageUrl(posterPath) {
      return `https://image.tmdb.org/t/p/original/${posterPath}`;
    },
    async fetchMovies() {
      await this.$store.dispatch('fetchMovies', this.currentPage);
    },
    async loadMore() {
      this.currentPage++;
      await this.fetchMovies();
    },
  },
};
</script>

<style scoped>

.movies-container{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
  margin: 0px 5px;
  grid-gap: 5px; 
  justify-content: center;
}

.movie{
  margin: 0;
}

.movie img{
  width: 100%;
  border-radius: 10px;
}

button{
  margin: 5px;
}

</style>