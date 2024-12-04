<template>
  <div>
    <h1>Résultats de recherche pour "{{ $route.query.q }}"</h1>
    <ul>
      <li v-for="book in filteredBooks" :key="book.idLivre">
        <img :src="book.imageCouverture" alt="Couverture du livre">
        <div>
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
    axios.get('http://localhost:3000/api/livres')
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
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: flex;
  margin-bottom: 20px;
}
img {
  width: 100px;
  height: 150px;
  margin-right: 20px;
}
</style>