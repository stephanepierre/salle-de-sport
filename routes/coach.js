const { coach, coachCreate, coachDelete, coachUpdate, coachLogin} = require('../controllers/coach')

function coachRoute(app) {
    //methode CREATE
    app.post('/coachCreate', coachCreate);

    //methode READ
    app.get('/coach', coach)
    //methode DELETE
    app.post('/coachDelete', coachDelete);

    //methode UPDATE
    app.post('/coachUpdate', coachUpdate);
}

module.exports = coachRoute
