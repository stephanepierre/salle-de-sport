//on crée des controllers qui seront utilisé dans les routes pour envoyer, recevoir etc... ce que l'on souhaite
async function userGet(req, res) {
    res.json("Mon controlleur utilisateur")
}

async function userCreate(req, res) {
    try {
        const User = req.app.get('models').User;
        //on passe a la creation les mêmes infos que l'on veut enregistrer et qui sont aussi dans /models/user.js
        const newUser = await new User({
            firstName: "Stephane",
            lastName: "PIERRE",
            dateOfBirth: new Date()
        }).save()
        res.json(newUser)
    } catch (err) {
        res.json(err.message)
    }
}


module.exports = {
    userGet,
    userCreate,
}