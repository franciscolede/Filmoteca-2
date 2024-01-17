<template>
    <div class="movie">
        <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" loading="lazy" @load="imageLoaded"
            @click="openModal" />

        <div class="modal" :class="{ 'show': showModal }">
            <div class="modal-content">
                <div class="blur-background" :style="{ backgroundImage: `url(${getImageUrl(movie.poster_path)})` }"></div>
                <div class="modal-header">
                    <h1 class="modal-title">{{ movie.title }}</h1>
                </div>
                <div class="modal-body">
                    <div class="overview">
                        <h5>Overview:</h5>
                        <h6>{{ movie.overview }}</h6>
                    </div>
                    <div class="data">
                        <div>
                            {{ movie.release_date }}
                        </div>
                        <div>
                            <i class="bi bi-star-fill"></i>   {{ movie.vote_average }}
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" @click="closeModal">Cerrar</button>
                </div>
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
            default: false,
        },
    },
    data() {
        return {
            showModal: this.showModalProp,
        };
    },
    methods: {
        getImageUrl(posterPath) {
            return `https://image.tmdb.org/t/p/original/${posterPath}`;
        },
        openModal() {
            this.showModal = true;
            this.$emit('update:showModalProp', this.showModal);
        },
        closeModal() {
            this.showModal = false;
            this.$emit('update:showModalProp', this.showModal);
        },
        imageLoaded(event) {
            event.target.classList.add('loaded');
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
    width: 100%;
    height: auto;
    border-radius: 10px;
    opacity: 0;
    transition: opacity 1s ease-in-out;
    cursor: pointer;
}

.movie img.loaded {
    opacity: 1;
}

.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    overflow: hidden;
}

.modal.show {
    display: flex;
    align-items: center;
    justify-content: center;
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
}

.modal-content {
    position: relative;
    width: 80%;
    height: 80%;
    max-width: 600px;
    overflow: hidden;
    border-radius: 10px;
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

.modal-title{
    width: 100%;
    text-align: center;
}

.modal-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.data{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

</style>
  