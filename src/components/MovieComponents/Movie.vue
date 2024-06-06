<template>
    <div class="movie">
        <img :src="imageUrl" :alt="movie.title" loading="lazy" @load="imageLoaded"
            @click="openModal" />
    </div>
    <MovieModal v-if="isModalOpen" :movie="movie" @closeModal="closeModal"/>
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
            isModalOpen: false,
        };
    },
    components: {
        MovieModal,
    },
    methods: {
        openModal() {
            this.isModalOpen = true;
        },
        closeModal(){
            this.isModalOpen = false;
        },
        imageLoaded(event) {
            event.target.classList.add('loaded');
        }
    },
    computed: {
        imageUrl() {
            return `https://image.tmdb.org/t/p/original/${this.movie.poster_path}`;
        },
    },
};
</script>
  
<style scoped>
.movie {
    margin: 0;
    position: relative;
}

.movie img {
    width: 160px;
    height: 240px;
    object-fit: cover;
    border-radius: 10px;
    opacity: 0;
    transition: opacity 1s ease-in-out;
    cursor: pointer;
    filter: contrast(0.9);
    transition: transform 0.3s;
}

.movie img:hover{
    filter: contrast(1.0);
    transform: scale(1.05)
}

.movie img.loaded {
    opacity: 1;
}
</style>
  