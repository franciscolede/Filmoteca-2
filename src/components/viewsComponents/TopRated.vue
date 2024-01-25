<template>
    <div class="component">
        <div class="container-fluid movie-container" v-for="(movie, index) in topRated" :key="movie.id">
            <div class="movie-image">
                <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" class="movie" loading="lazy" />
            </div>
            <h2 class="title"> {{ index + 1 }}. {{ movie.title }}</h2>
            <h5 class="overview">{{ movie.overview }}</h5>
            <div class="data">
                <div><h5><i class="bi bi-star-fill"></i> {{ movie.vote_average }}</h5></div>
                <div><button class="btn btn-sm btn-primary" @click="openModal(movie)">Ver más</button></div>
                <div><h5><i class="bi bi-calendar-week"></i>{{ movie.release_date }}</h5></div>
            </div>
            <MovieModal v-if="clickModalBool" :movie="selectedMovie" @closeModal="modalClosed" />
        </div>
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
            clickModalBool: false,
            selectedMovie: null,
        };
    },
    computed: {
        topRated() {
            return this.$store.getters.getTopRated;
        },
    },
    mounted() {
        this.$store.dispatch('fetchTopRated');
    },
    methods: {
        getImageUrl(posterPath) {
            return `https://image.tmdb.org/t/p/original/${posterPath}`;
        },
        openModal(movie) {
            this.selectedMovie = movie;
            this.clickModalBool = true;
        },
        modalClosed() {
            this.clickModalBool = false;
            this.selectedMovie = null;
        }
    },
};
</script>
  
<style scoped>
.component {
    padding: 5px;
}

.movie-container {
    widows: 100%;
    height: 250px;
    margin: 20px auto;
    padding: 0px;

    display: grid;

    grid-template-columns: 10.3em 1fr;
    grid-template-rows: 35px auto 35px;
    grid-template-areas:
        "img title"
        "img ov"
        "img data";

    column-gap: 10px;

    background-color: rgba(150, 150, 150, 0.89);
    border-radius: 15px;
}

.movie-image {
    width: 10.3em;
    padding: auto;
    grid-area: img;
}

.movie {
    height: 100%;
    width: 100%;
    border-radius: 15px;
}

.title {
    grid-area: title;
    text-align: start;
    margin: 0px;
}

.overview {
    grid-area: ov;
    text-align: start;
    margin: 0px;
    padding-top: 10px;
}

.data {
    grid-area: data;

    display: flex;
    flex-direction: row;
}

.data div{
    width: 33%;
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