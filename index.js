// création du serveur
const express = require('express');

const app = express();

app.use(express.json());

app.listen (3000, () => {
    console.log("le serveur s'est bien lancé")
})

/* //on teste la méthode GET sur http://localhost:3000/test avec postman
app.get("/test", async (req, res) => {
    res.json("Hello world!");
}) */

//on crée les routes
const userRoute = require("./routes/user");     //route localhost:3000/user
userRoute(app);    