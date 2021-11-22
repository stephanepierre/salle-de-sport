const { customers, customerCreate, customerDelete, customerUpdate } = require('../controllers/customer')

function customerRoute(app) {
    //methode CREATE
    app.post('/customerCreate', customerCreate);

    //methode Get
    app.get('/customers', customers);

    //methode DELETE
    app.post('/customerDelete', customerDelete);

    //methode UPDATE
    app.post('/customerUpdate', customerUpdate);
}

module.exports = customerRoute
