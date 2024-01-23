<template>
    <div class="modal">
        <div class="modal-content">
            <div class="blur-background" :style="{ backgroundImage: `url(${getImageUrl(movie.poster_path)})` }"></div>
            <div class="modal-header">
                <h3 class="modal-title">{{ movie.title }}</h3>
            </div>
            <div class="modal-body">
                <div class="overview">
                    <h5>Overview:</h5>
                    <h6>{{ movie.overview }}</h6>
                    <div class="data">
                    <div>
                        {{ movie.release_date }}
                    </div>
                    <div>
                        <i class="bi bi-star-fill"></i> {{ movie.vote_average }}
                    </div>
                </div>
                    <div>
                        <div v-if="hasVideos">
                            <h5>{{ hasTrailers ? 'Trailer:' : 'Video:' }}</h5>
                            <iframe width="90%" height="315" :src="getYouTubeEmbedUrl(getVideoToDisplay().key)"
                                frameborder="0" allowfullscreen></iframe>
                        </div>
                        <div v-else>
                            No hay videos disponibles.
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-light" @click="this.$emit('closeModal')">Cerrar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        movie: {
            type: Object,
            required: true,
        },
        showModalProp: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        getImageUrl(posterPath) {
            return `https://image.tmdb.org/t/p/original/${posterPath}`;
        },
        getYouTubeEmbedUrl(videoKey) {
            return `https://www.youtube.com/embed/${videoKey}`;
        },
        getVideoToDisplay() {
            return this.hasTrailers ? this.firstTrailer : (this.hasVideos ? this.videos[0] : null);
        },
    },
    mounted() {
        this.$store.dispatch('videoModule/fetchVideos', this.movie.id);
    },
    computed: {
        videos() {
            return this.$store.getters['videoModule/getVideos'];
        },
        hasTrailers() {
            return this.videos && this.videos.some(video => video.type === 'Trailer');
        },
        firstTrailer() {
            return this.videos.find(video => video.type === 'Trailer');
        },
        hasVideos() {
            return this.videos && this.videos.length > 0;
        },
    },
};
</script>

<style scoped>
.modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 4%;
    width: 100%;
    height: 100%;
    z-index: 1001;
    overflow: hidden;
    max-height: 900px;
}

.blur-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    filter: blur(10px);
    max-height: 900px;
}

.modal-content {
    position: relative;
    width: 80%;
    height: 80%;
    max-width: 600px;
    overflow: hidden;
    border-radius: 25px;
}

.modal-header,
.modal-body,
.modal-footer {
    position: relative;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);

    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}



.modal-title {
    width: 100%;
    text-align: center;
}

.modal-header{
    height: 15%;
}

.modal-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 75%;
    overflow-y: auto;
    max-height: 900px;
}

.data {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.modal-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;

    height: 10%;
    padding: 0px;
    min-height: 50px;
}

@media (max-width: 767px) {
    .modal{
        left: 0%;
    }
}

</style>