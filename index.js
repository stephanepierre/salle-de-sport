// on importe Express pour utilisation
const express = require('express');
const app = express();

//on importe les models:
const models = require('./models/index');
app.set('models', models);



//.................................mongoose.......................
//parametrage de mongoose
const mongoose = require('mongoose');
// Connect MongoDB.
mongoose.connect('mongodb://localhost/sportCenters', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

//..........................................serveur...........................
// création du serveur
app.use(express.json());
app.listen (3000, () => {
    console.log("le serveur s'est bien lancé")
})


//.......................................routes.............................
//on crée les routes
const userRoute = require("./routes/user");     //route localhost:3000/user
userRoute(app);    

