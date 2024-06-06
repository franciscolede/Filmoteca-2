<template>
    <div class="component">
        <div class="container-sm movie-container" v-for="(movie, index) in topRated" :key="movie.id">
            <h1 class="title"> {{ index + 1 }}. {{ movie.title }}</h1>
            <div class="movie-image">
                <img :src="getImageUrl(movie.backdrop_path)" :alt="movie.title" class="movie" loading="lazy" />
            </div>
            <div class="data">
                <div id="rating"><h5><i class="bi bi-star-fill"></i> {{ movie.vote_average }}</h5></div>
                <div id="info"><h5 @click="openModalByMovie(movie)">+Info</h5></div>
            </div>
            <hr>
        </div>
        <MovieModal v-if="isModalOpen" :movie="selectedMovie" @closeModal="closeModal" />
    </div>
</template>
  
<script>
import MovieModal from '../MovieComponents/MovieModal.vue';

export default {
    name: 'TopRated',
    components: {
        MovieModal,
    },
    data() {
        return {
            isModalOpen: false,
            selectedMovie: null,
        };
    },
    mounted() {
        this.$store.dispatch('fetchTopRatedMovies');
    },
    computed: {
        topRated() {
            return this.$store.getters.getTopRatedMovies;
        },
    },
    methods: {
        getImageUrl(posterPath) {
            return `https://image.tmdb.org/t/p/original/${posterPath}`;
        },
        openModalByMovie(movie) {
            this.selectedMovie = movie;
            this.isModalOpen = true;
        },
        closeModal() {
            this.clickModalBool = false;
            this.isModalOpen = null;
        }
    },
};
</script>
  
<style scoped>
.component {
    padding: 5px;
}

.movie-container {
    width: 100%;
    margin: 40px auto;
    padding: 0px;

    display: flex;
    flex-direction: column;

    border-radius: 15px;
}

.movie-image {
    width: 50%;
    margin: 0px auto;
    transition: width 0.3s ease;
}

.movie-container:hover .movie-image {
    width: 70%;
}

.movie {
    height: 100%;
    width: 100%;
    border-radius: 15px;
}

.title {
    text-align: start;
    margin: 0px auto;

    font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    text-transform: uppercase;
}
.data {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin: 0px auto;
}

.data div{
    width: 50%;
    margin: 15px;
}

#rating{
    text-align: end;
}

#info{
    text-align: start;
    cursor: pointer;
}

#info:hover{
    color: #54a06e;
}

i{
}


@media (max-width: 767px) {
    .title {
        font-size: 15px;
        overflow: hidden;
    }

    .overview {
        font-size: 10px;
    }

    .data h5 {
        font-size: 10px;
    }
}
</style>