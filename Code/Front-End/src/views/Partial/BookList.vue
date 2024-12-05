<template>
  <div class="book" v-if="catIdSelected == null">
    <h1>Liste des Livres</h1>
    <div class="filter-container" v-if="_aa == null">
      <form @submit.prevent="getCatIdSelected">
      <label for="categorySelect">Filtrer par catégorie :</label>
      <select id="categorySelect" class="aa" v-model="_aa">
        <option v-for="category in categories" :key="category.idCategorie" :value="category.idCategorie">
          {{ category.nom }}
        </option>
      </select>
      <input type="submit" value="Recherceher">
    </form>
    </div>
  </div>   
       

    <div v-if="catIdSelected">

      <ul class="book-list">
        <li v-for="book in filteredBooks">
          <img class="book-cover" :src="book.imageCouverture" alt="Couverture du livre">
          <div class="book-info">
            <h3 v-if="book.id_categorie == catIdSelected ">{{ book.titre }}</h3>
            <p>{{ findAuthor(book.idAuteur).nom }}</p>
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
      books: [],
      categories: [],
      authors: [],
      selectedCategory: '',
      catIdSelected: null
    }
  },
  computed: {
    getCatIdSelected(event){

      if(this._aa){
      this.catIdSelected = (this._aa)
      }else{
        this.catIdSelected =2
      }
      console.log("cat id : "+this.catIdSelected)
    },
    filteredBooks() {
      if (this.catIdSelected) {
        return this.books.filter(book => book.id_categorie === this.catIdSelected);
      }
      console.log(" BBB "+books[0].id_categorie)

      return this.books;
    }
  },
  methods: {
    findAuthor(idAuteur) {
      return this.authors.find(author => author.idAuteur === idAuteur);
    }
  },
  mounted() {
    // Effectuer une requête GET pour récupérer la liste des livres depuis ton API
    axios
      .get('http://localhost:3000/api/livres')
      .then((response) => {
        this.books = response.data.data
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des livres :', error)
      })

    axios
      .get('http://localhost:3000/api/categories')
      .then((response) => {
        this.categories = response.data.data
        console.log("ABCDE "+response.data.data[0].nom)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des catégories :', error)
      })
    
    axios
      .get('http://localhost:3000/api/auteurs')
      .then((response) => {
        this.authors = response.data.data
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des auteurs :', error)
      })
  }
}
</script>

<style scoped>
.book{
  background-color: #739AAF;
  padding: 10px;
}
.book-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  list-style: none;
  padding: 0;
}
.book-list li {
  flex: 1 0 200px; /* This means that each book will take up at least 200px, but will grow to take up remaining space if available */
}
.book-cover {
  width: 200px;
  height: 300px;
  object-fit: cover; /* This will ensure that the image covers the entire space of the img element without distorting the aspect ratio */
}
h2{
  font-size: 45px;
  font-family: Arial, Helvetica, sans-serif;
}
h3{
  font-family: Arial, Helvetica, sans-serif;
  color: chocolate;
}
</style>