import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import { initDb, Livre, sequelize } from "./db/sequelize.mjs";
import { livresRouter } from "./routes/livres.mjs";
import { loginRouter } from "./routes/login.mjs";
import { categoriesRouter } from "./routes/categories.mjs";
import { editeursRouter } from "./routes/editeurs.mjs";
import { auteursRouter } from "./routes/auteurs.mjs";
import { commentairesRouter } from "./routes/commentaires.mjs";
import { utilisateursRouter } from "./routes/utilisateurs.mjs";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir les fichiers statiques du front-end
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

// Test de connexion à la base de données
sequelize
    .authenticate()
    .then(() =>
        console.log("La connexion à la base de données a bien été établie")
    )
    .catch((error) => console.error("Impossible de se connecter à la DB"));
initDb();

// Routes API
app.get("/api/", (req, res) => {
    res.redirect(`http://localhost:${port}/`);
});
app.use("/api/login", loginRouter);
app.use("/api/livres", livresRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/editeurs", editeursRouter);
app.use("/api/auteurs", auteursRouter);
app.use("/api/commentaires", commentairesRouter);
app.use("/api/utilisateurs", utilisateursRouter);

// Gestion des routes inconnues pour l'API
app.use((req, res) => {
    const message =
        "Impossible de trouver la ressource demandée! Vous pouvez essayer un autre URL.";
    res.status(404).json(message);
});

// Rediriger toutes les autres routes vers index.html pour la SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
