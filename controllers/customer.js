const encryptPassword = require('../utils/encryptPassword');

async function customers(req, res) {
    const Customers = req.app.get('models').Customers;
    const CustomersList = await Customers.find().populate("user");
    res.json(CustomersList);
}

async function customerCreate(req, res) {
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
        //on crée d'abord le user puis apres on renseigne les info sup du customer
        const NewUser = await new models.User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            token, 
            salt, 
            hash,
        }).save()
        //on renseigne les info sup du customer (là on part du principe que tout le monde part des valeurs par defauts renseignées dans models customer)
        const newCustomer = await new models.Customer({ user: NewUser._id}).save()
        res.json(newCustomer)
    } catch (error) {
        res.json(error.message)
    }
}

async function customerDelete(req, res) {
    try {
        
        //on vérifie que son role est bien manager sinon il a pas le droit de créer
        if (req.role !== 'manager') {
            return res.json("Vous n'êtes pas autoriser à supprimer un utilisateur")
        }
        
        if (!req.body._id) {
            return res.json("_id manquant");
        }
        
        const Customer = req.app.get('models').Customer;

        let ToDeleteCustomer = await Customer.findById(req.body._id);

        if (!ToDeleteCustomer) {
            return res.json("client manquant");
        }

        // on efface le user et le customer. d'abord on le retrouve dans les user
        let toDeleteUser = await models.User.find(toDeleteCustomer.user);

        // on efface le user avant le customer mais il faut penser à supprimer les 2...
        await toDeleteUser.remove();
        await ToDeleteCustomer.remove();

        res.json("Effacé avec succès");

    } catch (error) {
        res.json(error.message);
    }
}

async function customerUpdate(req, res) {
    try {
        //on vérifie que son role est bien manager sinon il a pas le droit de créer
        if (req.role !== 'manager') {
            return res.json("Vous n'êtes pas autoriser à modifier un utilisateur")
        }
        
        if (!req.body._id) {
            return res.json("_id manquant(s)");
        }       
        const Customer = req.app.get('models').Customer;

        //on cherche l'objet à modifier par son ID
        const ToModifyCustomer = await Customer.findById(req.body._id);
        if (!ToModifyCustomer) {
            return res.json('client non trouvé');
        }

        //on récupère les différents champs ("key") qui sont dans la BDD de l'ID grace à une boucle
        const toModifyKeys = Object.keys(req.body.toModify);
        for (const key of toModifyKeys) {
            ToModifyCustomer[key] = req.body.toModify[key]
        }
        await ToModifyCustomer.save();
        res.json(ToModifyCustomer);
    } catch (error) {
        res.json(error.message);
    }
}


module.exports = {
    customers,
    customerCreate,
    customerDelete,
    customerUpdate,
}