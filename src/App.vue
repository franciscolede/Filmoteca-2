<template>
  <Nav></Nav>
  <Search></Search>
  <router-view/>
</template>

<script>
import Search from './components/search.vue';
import Nav from './components/viewsComponents/Nav.vue';


export default {
  created() {
    document.title = "Filmoteca";
  },
  components: {
    Search,
    Nav,
  },
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';
@import "~bootstrap-icons/font/bootstrap-icons.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: grid;
  grid-template-columns: 8% 1fr; 
  grid-template-rows: 80px auto;
  grid-template-areas:
    "nav search"
    "nav router-view";

    min-height: 100vh;

    background-color: rgba(150, 150, 150, 0.781);
}

body {
  overflow-y: scroll;
}

/* ===== Scrollbar CSS ===== */
  /* Firefox */
  * {
    scrollbar-width: auto;
    scrollbar-color: #42b983;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 16px;
  }

  *::-webkit-scrollbar-track {
    background: rgba(150, 150, 150, 0.781);
    border-radius: 10px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #54a06e;
    border-radius: 10px;
    border: 3px solid #ffffff6e;
  }

Search {
  grid-area: search;
}

router-view {
  grid-area: router-view; 
}

@media (max-width: 767px) {
  #app {
    grid-template-columns: 1fr; 
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "nav"
      "search"
      "router-view";
  }
}
</style>
