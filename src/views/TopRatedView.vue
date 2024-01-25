<template>
    <div class="top-rated">
        <h1>The 20 most valued movies in history</h1>
        <TopRated/>
    </div>
  </template>
  
  <script>
  import TopRated from '@/components/viewsComponents/TopRated.vue'
  
  export default {
    name: 'DiscoverView',
    components: {
      TopRated,
    }
  }
  </script>

  <style scoped>

  h1{
    margin: 0px;
    padding: 0px;
    text-decoration: underline;
    text-decoration-color: #54a06e;

    font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  }

</style>
  