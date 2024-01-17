<template>
    <div class="modal">
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
                        <i class="bi bi-star-fill"></i> {{ movie.vote_average }}
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" @click="this.$emit('closeModal')">Cerrar</button>
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
    data() {
        return {
        };
    },
    methods: {
        getImageUrl(posterPath) {
            return `https://image.tmdb.org/t/p/original/${posterPath}`;
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
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1001;
    overflow: hidden;
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

.modal-title {
    width: 100%;
    text-align: center;
}

.modal-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
}
</style>