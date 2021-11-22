// ce ficher exportera de manière générale tous les models pour que se soit plus facile de s'y retrouver

const User = require('./user');
const Customers = require('./customer');
const Coach = require('./coach');

module.exports = {
    User,
    Customers,
    Coach,
}