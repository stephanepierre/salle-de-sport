const encryptPassword = require('../utils/encryptPassword');

async function coach(req, res) {
    const Coach = req.app.get('models').Coach;
    const CoachList = await Coach.find().populate("user");
    res.json(CoachList);
}

async function coachCreate(req, res) {
    try {
        //on crée le mot de passe sécurisé
        if (!req.body.password) {
            return res.json("Il manque le mot de passe !!")
        }
        const {token, salt, hash} = encryptPassword(req.body.password);
        //fin de création du MDP

        //on vérifie que son role est bien manager sinon il a pas le droit de créer
        if (req.role !== 'manager') {
            return res.json("Vous n'êtes pas autoriser à créer un utilisateur")
        }

        const models = req.app.get('models');
        //on crée d'abord le Coach puis apres on renseigne les info sup du Coach
        const NewUser = await new models.User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            token, 
            salt, 
            hash,
        }).save()
        //on renseigne les info sup du Coach (là on part du principe que tout le monde part des valeurs par defauts renseignées dans models Coach)
        const newCoach = await new models.Coach({ user: NewUser._id}).save()
        res.json(newCoach)
    } catch (error) {
        res.json(error.message)
    }
}

async function coachDelete(req, res) {
    try {
        
        //on vérifie que son role est bien manager sinon il a pas le droit de créer
        if (req.role !== 'manager') {
            return res.json("Vous n'êtes pas autoriser à supprimer un utilisateur")
        }
        
        if (!req.body._id) {
            return res.json("_id manquant");
        }
        
        const Coach = req.app.get('models').Coach;

        let ToDeleteCoach = await Coach.findById(req.body._id);

        if (!ToDeleteCoach) {
            return res.json("client manquant");
        }

        // on efface le Coach et le Coach. d'abord on le retrouve dans les Coach
        let toDeleteCoach = await models.Coach.find(toDeleteCoach.Coach);

        // on efface le Coach avant le Coach mais il faut penser à supprimer les 2...
        await toDeleteCoach.remove();
        await ToDeleteCoach.remove();

        res.json("Effacé avec succès");

    } catch (error) {
        res.json(error.message);
    }
}

async function coachUpdate(req, res) {
    try {
        //on vérifie que son role est bien manager sinon il a pas le droit de créer
        if (req.role !== 'manager') {
            return res.json("Vous n'êtes pas autoriser à modifier un utilisateur")
        }
        
        if (!req.body._id) {
            return res.json("_id manquant(s)");
        }       
        const Coach = req.app.get('models').Coach;

        //on cherche l'objet à modifier par son ID
        const ToModifyCoach = await Coach.findById(req.body._id);
        if (!ToModifyCoach) {
            return res.json('client non trouvé');
        }

        //on récupère les différents champs ("key") qui sont dans la BDD de l'ID grace à une boucle
        const toModifyKeys = Object.keys(req.body.toModify);
        for (const key of toModifyKeys) {
            ToModifyCoach[key] = req.body.toModify[key]
        }
        await ToModifyCoach.save();
        res.json(ToModifyCoach);
    } catch (error) {
        res.json(error.message);
    }
}


module.exports = {
    coach,
    coachCreate,
    coachDelete,
    coachUpdate,
}