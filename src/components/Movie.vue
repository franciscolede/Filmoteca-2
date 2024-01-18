<template>
    <div class="movie">
        <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" loading="lazy" @load="imageLoaded"
            @click="openModal" />
    </div>
    <MovieModal v-if="clickModalBool" :movie="movie" @closeModal="modalClosed"/>
</template>
  
<script>
import MovieModal from './MovieModal.vue';
export default {
    props: {
        movie: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            clickModalBool: false,
        };
    },
    components: {
        MovieModal,
    },
    methods: {
        getImageUrl(posterPath) {
            return `https://image.tmdb.org/t/p/original/${posterPath}`;
        },
        imageLoaded(event) {
            event.target.classList.add('loaded');
        },
        openModal() {
            this.clickModalBool = true;
        },
        modalClosed(){
            this.clickModalBool = false;
        }
    },
};
</script>
  
<style scoped>
.movie {
    margin: 0;
    position: relative;
}

.movie img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    opacity: 0;
    transition: opacity 1s ease-in-out;
    cursor: pointer;
    filter: brightness(0.9)
}

.movie img:hover{
    filter: brightness(1);
  border: 1px solid white;
}

.movie img.loaded {
    opacity: 1;
}
</style>
  