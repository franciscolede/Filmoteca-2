<template>
  <nav>
    <img src="./assets/logo.png" alt="">
    <div class="routes">
      <router-link class="router-link" to="/">Home</router-link>
      <router-link class="router-link" to="/discover">Discover</router-link>
    </div>
  </nav>
  <Search></Search>
  <router-view/>
</template>

<script>
import Search from './components/search.vue'; 

export default {
  components: {
    Search,
  },
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';
@import "~bootstrap-icons/font/bootstrap-icons.css";
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: grid;
  grid-template-columns: 10% 1fr; 
  grid-template-rows: 80px auto;
  grid-template-areas:
    "nav search"
    "nav router-view";

    min-height: 100vh;
}

nav {
  grid-area: nav;
  display: flex;
  flex-direction: column; 
  align-items: center; 

  background-color: #000000;
}


nav img{
  height: 80px;
  padding: 5px 0;

  position: fixed;
}

.routes{
  display: flex;
  flex-direction: column;
  position: fixed;

  top: 80px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
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

  nav {
    position: relative;
    margin-bottom: 10px;
  }

  nav img {
    position: static;
    max-height: 80px;
  }

  .routes {
    position: static;
    top: auto;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    width: 100%;
  }
}
</style>
