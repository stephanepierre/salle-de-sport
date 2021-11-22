const { userGet, userCreate, userDelete, userUpdate, userLogin} = require('../controllers/user')

function userRoute(app) {
    //methode CREATE
    app.post('/userCreate', userCreate);

    //methode GET
    app.get("/user", userGet);

    //methode DELETE
    app.post('/userDelete', userDelete);

    //methode UPDATE
    app.post('/userUpdate', userUpdate);

    // pour se loger
    app.post('/userLogin', userLogin);
}

module.exports = userRoute
