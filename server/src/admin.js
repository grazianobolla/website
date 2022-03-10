const auth = function (req, res, next) {
    if (req.session && req.session.user === process.env.ADMIN_USERNAME)
        return next();
    else return res.sendStatus(401);
}

function handleLogin(username, password) {
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD)
        return true;

    return false;
}

module.exports = { auth, handleLogin };