<template>
  <div class="trends">
    <div class="movies-container">
      <div class="movie" v-for="movie in movies" :key="movie.id">
        <Movie :movie="movie"/>
      </div>
    </div>
    <Loading v-if="loading"/>
    <div>
      <button type="button" class="btn btn-success" @click="loadMore" >Cargar más</button>
    </div>
  </div>
</template>

<script>
import Loading from '../../components/loading.vue';
import Movie from '../MovieComponents/Movie.vue';

export default {
  name: 'Popular',
  components: {
    Loading,
    Movie,
  },
  data() {
    return {
      currentPage: 2,
      loading: false,
    };
  },
  computed: {
    movies() {
      return this.$store.getters.getDiscoverMovies;
    },
  },
  mounted() {
    this.$store.commit('clearMovies');
    this.$store.dispatch('discoverMovies', { startPage: 1, endPage: this.currentPage });
  },
  methods: {
    async discoverMovies() {
      try {
        this.loading = true;
        await this.$store.dispatch('addMovies', { page: this.currentPage });
      } catch (error) {
        console.error('Error:', error);
      } finally {
        this.loading = false;
      }
    },
    async loadMore() {
      this.currentPage++;
      await this.discoverMovies();
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