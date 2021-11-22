const encryptPassword = require('../utils/encryptPassword');
const decryptPasswords = require('../utils/decryptPasswords');

//on crée des controllers qui seront utilisé dans les routes pour envoyer, recevoir etc... ce que l'on souhaite
async function userGet(req, res) {
    try {
        const User = req.app.get('models').User;
        const MyUsers = await User.find();
        res.json(MyUsers)
    } catch (error) {
        return error.message
    }
}

async function userCreate(req, res) {
    console.log(req.body)
    try {
        //on crée le mot de passe sécurisé
        if (!req.body.password) {
            return res.json("Il manque le mot de passe !!")
        }

        const {token, salt, hash} = encryptPassword(req.body.password);
        //fin de création du MDP

        console.log(req.role)
        //on vérifie que son role est bien manager sinon il a pas le droit de créer
        if (req.role !== 'manager') {
            return res.json("Vous n'êtes pas autoriser à créer un utilisateur")
        }

        const User = req.app.get('models').User;
        //on passe a la creation les mêmes infos que l'on veut enregistrer et qui sont aussi dans /models/user.js
        const NewUser = await new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            token, 
            salt, 
            hash,
        }).save()
        res.json(NewUser)
    } catch (error) {
        res.json(error.message)
    }
}

// fonction pour le login
async function userLogin(req, res) {
    try {
        if (!req.body._id || !req.body.password) {
            return res.json("_id ou mot de passe manquant !");
        }
        const User = req.app.get('models').User;
        const toVerifyUser = await User.findById(req.body._id);
        if (!toVerifyUser) {
            return ("Utilisateur non trouvé !");
        }
        res.json(decryptPasswords(toVerifyUser, req.body.password));
    } catch (error) {
        res.json(error.message)
    }
}

async function userDelete(req, res) {
    try {
        if (!req.body._id) {
            return res.json("_id manquant");
        }
        const User = req.app.get('models').User;
        const ToDeleteUser = await User.findById(req.body._id);
        await ToDeleteUser.deleteOne();
        res.json("Effacé avec succès");
    } catch (error) {
        res.json(error.message);
    }
}

async function userUpdate(req, res) {
    try {
        if (!req.body._id || !req.body.toModify) {
            return res.json("_id ou champs manquant(s)");
        }
        const User = req.app.get('models').User;

        //on cherche l'objet à modifier par son ID
        const ToModifyUser = await User.findById(req.body._id);

        //on récupère les différents champs ("key") qui sont dans la BDD de l'ID grace à une boucle
        const toModifyKeys = Object.keys(req.body.toModify);
        for (const key of toModifyKeys) {
            ToModifyUser[key] = req.body.toModify[key]
        }
        await ToModifyUser.save();
        res.json(ToModifyUser);
    } catch (error) {
        res.json(error.message);
    }
}


module.exports = {
    userGet,
    userCreate,
    userDelete,
    userUpdate,
    userLogin,
}