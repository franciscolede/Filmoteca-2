<template>
    <nav>
        <img src="../../assets/logo.png" alt="">
        <div class="routes">
            <router-link class="router-link" to="/">
                <i class="bi bi-house-fill"></i>
                <p>Home</p>
            </router-link>
            <router-link class="router-link" to="/discover">
                <i class="bi bi-compass-fill"></i>
                <p>Discover</p>
            </router-link>
            <router-link class="router-link" to="/top-rated">
                <i class="bi bi-fire"></i>
                <p>Top Rated</p>
            </router-link>
        </div>
    </nav>
</template>

<style scoped>
nav {
    grid-area: nav;
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: #000000;
}


nav img {
    height: 80px;
    padding: 5px 0;

    position: fixed;
}

.routes {
    display: flex;
    flex-direction: column;
    position: fixed;

    top: 80px;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none
}

nav a.router-link-exact-active {
    color: #42b983;
}

i {
    font-size: 2em;
    margin: 0px;
    padding: 0px;
}

.router-link {
    display: flex;
    flex-direction: column;
}

.router-link p{
    padding: 0px;
    margin: 0px;

    position: relative;
    bottom: 0.7em;
}

p{
    opacity: 0%;
}

.router-link:hover p{
    opacity: 100%;
}

nav a.router-link-exact-active p {
    opacity: 100%;
}

@media (max-width: 767px) {

    nav {
        position: relative;
        margin-bottom: 10px;
    }

    nav img {
        position: static;
        max-height: 80px;
    }

    .routes {
        position: static;
        top: auto;
        display: flex;
        flex-direction: row;
        gap: 10px;
        justify-content: center;
        width: 100%;
    }

    p{
        display: none;
    }
}
</style>