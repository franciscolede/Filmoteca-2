<template>
  <div class="search">
    <SearchedMovies/>
  </div>
</template>

<script>
import SearchedMovies from '@/components/viewsComponents/SearchedMovies.vue'

export default {
  name: 'SearchView',
  components: {
    SearchedMovies,
  }
}
</script>