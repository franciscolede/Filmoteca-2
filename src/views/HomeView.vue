<template>
  <div class="home">
    <Genres/>
  </div>
</template>

<script>
  import Genres from '@/components/viewsComponents/GenresList.vue'

export default {
  name: 'HomeView',
  components: {
    Genres
  }
}
</script>

<style scoped>

.home{
  margin: 0px;
  padding: 0px;
}

</style>
