const {userGet, userCreate} = require('../controllers/user');

function userRoute(app) {
    //methode CREATE
    app.post('/userCreate', userCreate);
    //methode GET
    app.get("/user", userGet);
}

module.exports = userRoute
