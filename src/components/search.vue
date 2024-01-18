<template>
  <div class="search-container" ref="searchContainer">
    <input type="text" placeholder="Search for a movie..." v-model="searchQuery" @input="searchMovies">
    <button id="btn-search" class="btn btn-outline-primary btn-sm" style="margin: 0px 3px; height: 20%; "><i
        class="bi bi-search"></i></button>
    <div v-if="searchSuggestions.length > 0" class="search-suggestions" @click="handleSuggestionsClick">
      <div v-for="suggestion in searchSuggestions" :key="suggestion.id" @click="selectSuggestion(suggestion)">
        {{ suggestion.title }}
      </div>
    </div>
  </div>
  <MovieModal v-if="clickModalBool" :movie="selectedSuggestion" @closeModal="modalClosed" />
</template>
  
<script>
import MovieModal from './MovieModal.vue';

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
        await this.$store.dispatch('searchMovies', this.searchQuery);
        this.searchSuggestions = this.$store.getters.getSearchMovies;
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

    openModal() {
      
    },
    modalClosed() {
      this.clickModalBool = false;
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

#btn-search{
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
  