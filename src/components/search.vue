<template>
  <div class="search-container" ref="searchContainer">
    <input type="text" placeholder="Search for a movie..." v-model="movieBeingSearched" @keyup.enter="searchedMovies"
      @input="searchingMovies">
    <i class="bi bi-search" style="margin-left: 5px; cursor: pointer;" @click="searchedMovies"></i>
    <div v-if="searchSuggestions.length" class="search-suggestions">
      <div v-for="suggestion in searchSuggestions" :key="suggestion.id" @click="selectMovieBySuggestion(suggestion)">
        {{ suggestion.title }}
      </div>
    </div>
  </div>
  <MovieModal v-if="isModalOpen" :movie="selectedMovie" @closeModal="closeModal" />
</template>

<script>
import MovieModal from './MovieComponents/MovieModal.vue';

export default {
  data() {
    return {
      movieBeingSearched: "",
      selectedMovie: "",
      isModalOpen: false,
    };
  },
  components: {
    MovieModal,
  },
  computed: {
    searchSuggestions() {
      return this.$store.getters.getSearchingMovies;
    }
  },
  mounted() {
    document.addEventListener('click', this.closeWhenClickOut);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeWhenClickOut);
  },
  methods: {
    searchedMovies() {
      if (this.movieBeingSearched) {
        this.$store.dispatch('searchMoviesByNameAndTyping', {
          name: this.movieBeingSearched,
          typing: false,
        });
        this.pushNextPage();
        this.clearPageData();
      }
    },
    searchingMovies() {
      this.$store.dispatch('searchMoviesByNameAndTyping', {
        name: this.movieBeingSearched,
        typing: true,
      });
    },
    selectMovieBySuggestion(suggestion) {
      this.selectedMovie = suggestion;
      this.isModalOpen = true;
      this.clearPageData();
    },
    closeModal() {
      this.isModalOpen = false;
    },

    closeWhenClickOut(event) {
      if (this.$refs.searchContainer && !this.$refs.searchContainer.contains(event.target)) {
        this.clearPageData();
      }
    },

    pushNextPage() {
      const searchText = this.movieBeingSearched.trim();
      this.$router.push({
        name: 'search',
        params: { searchText: searchText }
      });
    },

    clearPageData() {
      this.movieBeingSearched = '';
      this.$store.commit('clearSearchingMovies');
    }
  },
};
</script>

<style scoped>
.search-container {
  margin: auto;
  text-align: center;
  position: relative;
}

input {
  width: 250px;
  margin-bottom: 10px;

  border-radius: 15px;
  border: 0px;
  padding: 4px;
}

#btn-search {
  border-radius: 15px;
}

.search-suggestions {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  max-height: 150px;
  width: 350px;
  overflow-y: auto;
  z-index: 1000;

  margin-top: 5px;

  left: 50%;
  transform: translateX(-50%);
}

.search-suggestions div {
  padding: 5px;
  cursor: pointer;
}

.search-suggestions div:hover {
  background-color: #f0f0f0;
}
</style>