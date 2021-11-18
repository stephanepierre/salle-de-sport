//on crée des controllers qui seront utilisé dans les routes pour envoyer, recevoir etc... ce que l'on souhaite

async function userGet(req, res) {
    res.json("Mon controlleur utilisateur")
}

module.exports = {
    userGet
}