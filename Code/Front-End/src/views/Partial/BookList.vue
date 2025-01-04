<template>
  <div class="book-list-container">
    <h1>Liste des Livres</h1>
    <div class="filter-container">
      <form @submit.prevent="getCatIdSelected">
        <label for="categorySelect">Filtrer par catégorie :</label>
        <select id="categorySelect" class="category-select" v-model="categorySelected">
          <option value="">Toutes les catégories</option>
          <option v-for="category in categories" :key="category.idCategorie" :value="category.idCategorie">
            {{ category.nom }}
          </option>
        </select>
        <input type="submit" value="Rechercher" class="submit-button">
      </form>
    </div>

    <div v-if="filteredBooks.length">
      <ul class="book-list">
        <li v-for="book in filteredBooks" :key="book.idLivre">
          <img class="book-cover" :src="book.imageCouverture" alt="Couverture du livre">
          <div class="book-info">
            <h3>{{ book.titre }}</h3>
            <p>{{ findAuthor(book.idAuteur).nom }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Aucun livre trouvé pour cette catégorie.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      books: [],
      categories: [],
      authors: [],
      categorySelected: ''
    }
  },
  methods: {
    async getCatIdSelected() {
      // La méthode est vide car nous utilisons la computed property filteredBooks
    },
    async fetchBooks() {
      try {
        const response = await axios.get('/api/livres');
        this.books = response.data.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des livres :', error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get('/api/categories');
        this.categories = response.data.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    },
    async fetchAuthors() {
      try {
        const response = await axios.get('/api/auteurs');
        this.authors = response.data.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des auteurs :', error);
      }
    },
    findAuthor(idAuteur) {
      return this.authors.find(author => author.idAuteur === idAuteur) || {};
    }
  },
  async mounted() {
    await this.fetchBooks();
    await this.fetchCategories();
    await this.fetchAuthors();
  },
  computed: {
    filteredBooks() {
      if (this.categorySelected) {
        return this.books.filter(book => book.id_categorie === this.categorySelected);
      }
      return this.books;
    }
  }
}
</script>

<style scoped>
.book-list-container {
  background-color: var(--background-color);
  padding: 20px;
  min-height: 100vh;
}

.book {
  text-align: center;
  margin-bottom: 20px;
}

.filter-container {
  margin: 20px auto;
  max-width: 600px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.filter-container form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.category-select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}

.book-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  list-style: none;
  padding: 0;
  justify-content: center;
}

.book-list li {
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 200px;
  text-align: center;
  transition: transform 0.3s ease;
}

.book-list li:hover {
  transform: scale(1.05);
}

.book-cover {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.book-info {
  padding: 15px;
}

.book-info h3 {
  margin: 0;
  color: #007bff;
  font-size: 18px;
}

.book-info p {
  margin: 5px 0 0;
  color: #555;
}
</style>