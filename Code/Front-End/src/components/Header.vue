<!-- Header.vue -->
<template>
    <header>
        <div class="image-container">
            <img class="header-image" :src="logo">
            <nav>
                <RouterLink to="/">Accueil</RouterLink>
                <RouterLink to="/books">Livres</RouterLink>
                <RouterLink to="/DetailsLivre">Détails</RouterLink>
                <RouterLink to="/addLivre">Ajouter un livre</RouterLink>
            </nav>
            <div class="search-container">
                <input type="text" v-model="searchQuery" placeholder="Rechercher un livre">
                <button @click="search">Rechercher</button>
            </div>
        </div>

    </header>
</template>

<script>
import logo from '../assets/logo-livre.png'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const searchQuery = ref('')
        const router = useRouter()

        const search = () => {
            if (searchQuery.value) {
                router.push({ name: 'SearchResult', query: { q: searchQuery.value } })
            }
        }

        return { logo, searchQuery, search }
    }
}
</script>

<style scoped>
body {
    margin: 0px;
}

.image-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header {
    background-color: #64A9CE;
    padding: 10px;
    text-align: left;
}

.header-image {
    width: 40%;
}

nav {
    display: flex;
    gap: 15px;
}

.search-container {
    display: flex;
    align-items: center;
}

.search-container input {
    padding: 5px;
    font-size: 16px;
}

.search-container button {
    padding: 5px 10px;
    font-size: 16px;
    margin-left: 5px;
    cursor: pointer;
}
</style>