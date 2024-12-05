<script>
import axios from 'axios'
export default {
    components: {

    },
    data() {
        return {
            username: '',
            password: ''
        }

    },
    methods: {
        async Connexion(event) {
            event.preventDefault() // Empêche le formulaire de se soumettre normalement
            try 
            {
                const response = await axios.post(`http://localhost:3000/api/login`, {
                    pseudo: this.username,
                    motDePasse: this.password
                })
                console.log("response :", response)
            } 
            catch (error) 
            {
                console.error(error)
            }
        }
    }
}
</script>

<template>
    <section class="section1">
        <img src="../../assets/logoLogin.png" alt="Logo">
        <h1>Connectez-vous</h1>
        <form @submit="Connexion()">
            <label for="username">Nom d'utilisateur</label>
            <input type="text" v-model="username" placeholder="Entrez votre nom d'utilisateur">
            <label for="password">Mot de passe</label>
            <input type="password" v-model="password" placeholder="Entrez votre mot de passe">
            <input class="btnConnexion" type="submit" />
        </form>
    </section>
</template>

<style scoped>
body {
    background-color: #f4f4f9;
}

.section1 {
    background-color: #739AAF;
    display: block;
    font-family: Arial, Helvetica, sans-serif;
    color: black;
    padding: 20px;
    border-radius: 10px;
    max-width: 400px;
    margin: 50px auto;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
}

input {
    width: 100%;
    height: 30px;
    padding: 5px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

h1 {
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
    color: white;
}

.btnConnexion {
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

.btnConnexion:hover {
    background-color: #0056b3;
}
</style>