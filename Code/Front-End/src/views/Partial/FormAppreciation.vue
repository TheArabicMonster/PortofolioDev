<script>
import axios from 'axios'

export default {
  name: 'FormAppreciation',
  data() {
    return {
      contenu: '',
      appreciation: null,
      moyenneAppreciation: null,
      nombreAppreciations: null
    }
  },
  methods: {
    async envoyer(event) {
      event.preventDefault() // Empêche le formulaire de se soumettre normalement

      await axios.post(`http://localhost:3000/api/commentaires`, {
        contenu: this.contenu,
        appreciation: this.appreciation,
        idLivre: this.livreId
      })

      // Récupérer la moyenne d'appréciation après l'envoi du commentaire
      this.getMoyenneAppreciation()
    },
    async getMoyenneAppreciation() {
      try {
        const response = await axios.get(`http://localhost:3000/api/commentaires/livre/${this.livreId}/moyenneA`)
        this.moyenneAppreciation = response.data.moyenneAppreciation
        this.nombreAppreciations = response.data.nombreAppreciations
      } catch (error) {
        console.error('Erreur lors de la récupération de la moyenne d\'appréciation :', error)
      }
    }
  },
  props: {
    livreId: {
      type: Number,
      required: true,
    }
  },
  mounted() {
    // Récupérer la moyenne d'appréciation lors du montage du composant
    this.getMoyenneAppreciation()
  }
}
</script>

<!-- Formulaire d'appréciation -->
<template>
  <div class="form-appreciation">
    <h3>Formulaire d'appréciation</h3>

    <form @submit="envoyer">
      <div class="form-group">
        <label for="commentaire">Qu'avez-vous pensé de ce livre ?</label>
        <textarea
          name="commentaire"
          id="commentaire"
          cols="30"
          rows="5"
          v-model="contenu"
          placeholder="Je trouve ce livre ...."
        ></textarea>
      </div>
      <div class="form-group">
        <label for="appreciation">Entrez un nombre entre 0 et 5</label>
        <input
          v-model="appreciation"
          class="appreciation"
          id="appreciation"
          type="number"
          name="appreciation"
          step="1"
          min="0"
          max="5"
          required
        />
      </div>
      <div class="form-group">
        <input type="submit" value="Envoyer" class="submit-button" />
      </div>
    </form>

    <!-- Afficher la moyenne d'appréciation -->
    <div v-if="moyenneAppreciation !== null" class="moyenne-appreciation">
      <h4>Moyenne d'appréciation : {{ moyenneAppreciation }} ({{ nombreAppreciations }} appréciations)</h4>
    </div>
  </div>
</template>

<style scoped>
.form-appreciation {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  max-width: 400px; /* Réduire la largeur maximale */
  margin: 20px auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-appreciation h3 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

.form-group textarea,
.form-group input[type="number"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

.form-group textarea:focus,
.form-group input[type="number"]:focus {
  border-color: #007bff;
  outline: none;
}

.submit-button {
  display: block;
  width: 100%;
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

.submit-button:active {
  background-color: #004494;
}

.moyenne-appreciation {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  color: #333;
}
</style>