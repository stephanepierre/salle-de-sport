const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const CoachSchema = new mongoose.Schema({
    //l'ID sera créé automatiquement par mongo db
    discipline : {
        type: String, 
        default : "Multisport !",
    },
    bio : {
        type: String,
        default : 'Pas de description pour ce coach !'
    },
    // pour récupérer les infos du model User en plus de ces données:
    user : {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
});

//Export the model  ..........Attention à la casse !!!!!.............
const Coach = new mongoose.model('coach', CoachSchema);
module.exports = Coach;
