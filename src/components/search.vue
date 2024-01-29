<template>
  <div class="search-container" ref="searchContainer">
    <input type="text" placeholder="Search for a movie..." v-model="searchQuery" @keyup.enter="enterSearch"
      @input="searchMovies">
    <i class="bi bi-search" style="margin-left: 5px; cursor: pointer;" @click="enterSearch"></i>
    <div v-if="searchSuggestions.length > 0" class="search-suggestions" @click="handleSuggestionsClick">
      <div v-for="suggestion in searchSuggestions" :key="suggestion.id" @click="selectSuggestion(suggestion)">
        {{ suggestion.title }}
      </div>
    </div>
  </div>
  <MovieModal v-if="clickModalBool" :movie="selectedSuggestion" @closeModal="modalClosed" />
</template>
  
<script>
import MovieModal from './MovieComponents/MovieModal.vue';

export default {
  data() {
    return {
      searchQuery: '',
      searchSuggestions: [],
      selectedSuggestion: "",

      clickModalBool: false,
    };
  },
  components: {
    MovieModal,
  },
  methods: {
    async searchMovies() {
      try {
        const result = await this.$store.dispatch('searchMovies', { query: this.searchQuery, type: "ing" });
        this.searchSuggestions = result || [];
      } catch (error) {
        console.error('Error:', error);
      }
    },
    selectSuggestion(suggestion) {
      this.selectedSuggestion = suggestion;
      this.clickModalBool = true;
      this.searchSuggestions = [];
      this.searchQuery = "";
    },
    handleSuggestionsClick(event) {
      if (this.$refs.searchContainer && !this.$refs.searchContainer.contains(event.target)) {
        // Clic fuera del área de interés, cierra la lista de sugerencias
        this.searchSuggestions = [];
      }
    },

    modalClosed() {
      this.clickModalBool = false;
    },

    async enterSearch() {
      if (this.searchQuery.length > 0) {
        try {
          await this.$store.dispatch('searchMovies', { query: this.searchQuery, type: "ed" })
          const searchText = this.searchQuery.trim();
          this.$router.push({
            name: 'search',
            query: { searchText: searchText }
          });
          this.searchSuggestions = [];
          this.searchQuery = "";
        }
        catch (error) {
          console.error('Error:', error);
        }
      }
    }

  },
  mounted() {
    this.$nextTick(() => {
      document.addEventListener('click', this.handleSuggestionsClick);
    });
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleSuggestionsClick);
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
  