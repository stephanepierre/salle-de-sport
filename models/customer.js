const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const CustomerSchema = new mongoose.Schema({
    //l'ID sera créé automatiquement par mongo db
    subscriptions : {
        type: Array, 
        default : [],
    },
    level : {
        type: String,
        default : 'beginner'
    },
    // pour récupérer les infos du model User en plus de ces données:
    user : {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
});

//Export the model
const Customers = new mongoose.model('Customers', CustomerSchema);
module.exports = Customers;
