<script>
import axios from 'axios'
import Header from '@/components/Header.vue'
import FormAppreciation from '@/views/Partial/FormAppreciation.vue'
export default {
  components: {
    Header,
    FormAppreciation
  },
  data() {
    return {
      allLivres: [],
      livres: null,
      commentaires: null,
      moyenneA: null,
      comment: null,
      livreId: null,
      auteurs: null
    }
  },
  async mounted() {
    console.log(this.livreId)
    await this.getLivres();
    //await this.getBooksById(this.livreId)

  },
  methods: {
    async getBooksById(id) {
      try {
        const response = await axios.get(`http://localhost:3000/api/livres/${id}`)
        this.livres = response.data
        /* if (this.livres != null) {
          console.log('aaaa' + this.livres.data.resume);
        } else {
          console.log('bbbb');
        }*/
        await this.getComments(id)
        await this.getAuthors(id)
      } catch (error) {
        console.error('Erreur lors de la récupération des livres :', error)
      }
    },
    async getComments(commentId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/commentaires/livre/${commentId}`
        )
        const response2 = await axios.get(
          `http://localhost:3000/api/commentaires/livre/${commentId}/moyenneA`
        )
        //const response = await axios.get(`http://localhost:3000/api/livres/${commentId}/commentaires`)
        this.commentaires = response.data
        this.moyenneA = response2.data
      } catch (error) {
        console.error('Erreur lors de la récupération des commentaires :', error)
        this.commentaires = `NoCommentaire`
        this.moyenneA = `noMoyenne`
      }
    },
    async getAuthors(authorID) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/auteurs/${authorID}`

        )
        this.auteurs = response.data
      } catch (error) {
        console.error('Erreur lors de la récupération des auteuddrs :', error)
        this.auteurs = `noAuteur`
      }
    },


    async SelectionLivre(event) {
      event.preventDefault()
      this.getBooksById(this._idLivre)
      this.livreId = 3
      console.log(this.livreId)
    },
    async getLivres() {
      const response = await axios.get(`http://localhost:3000/api/livres`)
      this.allLivres = response.data.data
    }
  }
}
</script>

<template>
  <div class="main-content">
    <div class="firstSelection" v-if="livres == null">
      <form @submit="SelectionLivre">
        <div>
          <label for="_idLivre">ID livre : </label>
          <select v-model="_idLivre">
            <option v-for="livre in allLivres" :key="livre.idLivre" :value="livre.idLivre">
              {{ livre.titre }}
            </option>
          </select>
          <span class="validity"></span>
        </div>
        <div>
          <input type="submit" value="Rechercher">
        </div>
      </form>
    </div>
    <section v-if="livres">
      <div class="partie1">
        <img class="imgCouverture" :src="livres?.data?.imageCouverture" alt="Image de couverture du livre" />
        <h3>Informations</h3>
        <ul>
          <li v-for="livre in livres" :key="livre.idLivre">
            <p v-if="livre.titre">Titre : {{ livre.titre }}</p>
            <p v-if="livre.extrait">Auteur :{{ auteurs.data.prenom }} {{ auteurs.data.nom }} </p>
            <p v-if="livre.anneeEdition">Année d'édition : {{ livre.anneeEdition }}</p>
            <p v-if="livre.nbPage">Nombre de pages : {{ livre.nbPage }}</p>
          </li>
        </ul>
      </div>
      <div class="partie2">
        <h2>Résumé</h2>
        <p>{{ livres.data.resume }}</p>
        <a :href="livres?.data?.extrait" target="_blank">Extrait</a>
      </div>
      <div class="partie3">
        <h2>Appréciations des lecteurs</h2>
        <p v-if="moyenneA.moyenneAppreciation != null"> Note moyenne : {{ moyenneA.moyenneAppreciation }} avec {{
          moyenneA.nombreAppreciations }} notes</p>
        <p v-if="moyenneA.moyenneAppreciation == null"> Ce livre n'a pas de commentaires</p>
        <FormAppreciation :livreId="livres.data.idLivre"></FormAppreciation>
      </div>
    </section>
  </div>
</template>

<style scoped>
.main-content {
  flex: 1;
  background-color: var(--background-color);
  padding: 20px;
}

.firstSelection {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  max-width: 600px;
  margin: 20px auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.firstSelection form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.firstSelection label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.firstSelection select,
input[type="submit"] {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.firstSelection select {
  appearance: none;
  background-color: white;
  cursor: pointer;
}

.firstSelection input[type="submit"] {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.firstSelection input[type="submit"]:hover {
  background-color: #0056b3;
}

.partie1,
.partie2,
.partie3 {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.partie1 {
  text-align: center; /* Centrer le contenu de la partie1 */
}

.partie1 img {
  width: 50%; /* Réduire la largeur de l'image */
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
}

.partie1 ul {
  list-style: none;
  padding: 0;
}

.partie1 ul li {
  margin-bottom: 10px;
}

.partie2 h2,
.partie3 h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.partie2 p,
.partie3 p {
  text-align: center;
  color: #555;
}

.partie2 a {
  display: block;
  text-align: center;
  color: #007bff;
  text-decoration: none;
  margin-top: 10px;
}

.partie2 a:hover {
  text-decoration: underline;
}
</style>
