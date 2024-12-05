<!-- Header.vue -->
<template>
  <header>
    <div class="image-container">
      <img class="header-image" :src="logo" alt="Logo">
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
  margin: 0;
  font-family: 'Arial', sans-serif;
}

header {
  background-color: #64A9CE;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.image-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-image {
  width: 150px;
}

nav {
  display: flex;
  gap: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #FFD700;
}

.search-container {
  display: flex;
  align-items: center;
}

.search-container input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-container button {
  padding: 10px 15px;
  font-size: 16px;
  margin-left: 10px;
  background-color: #FFD700;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-container button:hover {
  background-color: #FFC107;
}
</style>