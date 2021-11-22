const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    //l'ID sera créé automatiquement par mongo db
    firstName:{
        type: String,
        required:true,
    },
    lastName:{
        type: String,
        required:true,
    },
    dateOfBirth:{
        type: Date,
        required:true,
    },
    token: {
        type: String,
        required:true,
    },
    salt: {
        type: String,
        required:true,
    },
    hash: {
        type: String,
        required:true,
    },
    role: {
        type: String,
        default: "customer",
    },
});

//Export the model
const User = new mongoose.model('User', userSchema);
module.exports = User;
