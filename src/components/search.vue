<template>
    <div class="search-container">
      <input type="text" v-model="searchQuery" @input="searchMovies">
      <div v-if="searchSuggestions.length > 0" class="search-suggestions">
        <div v-for="suggestion in searchSuggestions" :key="suggestion.id" @click="selectSuggestion(suggestion)">
          {{ suggestion.title }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
        searchSuggestions: [],
      };
    },
    methods: {
      async searchMovies() {
        try {
          await this.$store.dispatch('searchMovies', this.searchQuery);
  
          // Obtén sugerencias de la tienda y actualiza el estado local
          this.searchSuggestions = this.$store.getters.getSearchMovies;
        } catch (error) {
          console.error('Error:', error);
        }
      },
      selectSuggestion(suggestion) {
        // Puedes realizar acciones adicionales cuando se selecciona una sugerencia
        console.log('Sugerencia seleccionada:', suggestion);
  
        // Limpiar la lista de sugerencias después de seleccionar una
        this.searchSuggestions = [];
      },
    },
  };
  </script>
  
  <style scoped>
    .search-container{
        margin: auto;
        text-align: center;
    position: relative;
    }

    input{
        width: 250px;
        margin-bottom: 10px;
    }

  .search-suggestions {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    max-height: 150px;
    width: 350px;
    overflow-y: auto;
    z-index: 1001;

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
  