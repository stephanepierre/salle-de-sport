async function getRoleMiddleware(req, res, next) {

    
    if (!req.body?.token) {
        req.role = "il manque le token";
        return next();
    }
    const User = req.app.get('models').User;
    const ToCheckUser = await User.findOne({ token: req.body.token });

    if (!ToCheckUser) {
        req.role = "token non valide";

        return next();
    }
    req.role = ToCheckUser.role;
    return next();
}

module.exports = getRoleMiddleware;

