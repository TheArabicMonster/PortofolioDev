<template>
  <div class="search-results">
    <h1>Résultats de recherche pour "{{ $route.query.q }}"</h1>
    <ul>
      <li v-for="book in filteredBooks" :key="book.idLivre" class="book-item">
        <img :src="book.imageCouverture" alt="Couverture du livre" class="book-cover">
        <div class="book-info">
          <h3>{{ book.titre }}</h3>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      books: []
    }
  },
  computed: {
    filteredBooks() {
      const query = this.$route.query.q.toLowerCase()
      return this.books.filter(book => book.titre.toLowerCase().includes(query))
    }
  },
  created() {
    axios.get('/api/livres')
      .then(response => {
        this.books = response.data.data
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des livres :', error)
      })
  }
}
</script>

<style scoped>
  .search-results {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
  }

  .search-results h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .book-item {
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: calc(33.333% - 20px);
    margin-bottom: 20px;
    transition: transform 0.3s ease;
  }

  .book-item:hover {
    transform: scale(1.05);
  }

  .book-cover {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .book-info {
    padding: 15px;
    text-align: center;
  }

  .book-info h3 {
    margin: 0;
    color: #007bff;
    font-size: 18px;
  }
</style>