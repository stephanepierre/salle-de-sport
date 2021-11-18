const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    //l'ID sera créé automatiquement par mongo db
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    dateOfBirth:{
        type:Date,
        required:true,
    },
});

//Export the model
const User = new mongoose.model('User', userSchema);
module.exports = User;
