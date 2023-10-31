
const auth = function (req, res, next) {
    const {username, password} = req.query;
    if (username !== 'rix' || password !== 'Coder2023') {
        return res.send('login failed');
    }

    req.session.user = username;
    req.session.admin = true;
    return next();
}
//user is logged in
function logged(req, res, next) { 
    if (req.session.user) {
        return res.redirect("/views");
    }
    next();
}
//user is NOT logged in
function loggedOut(req, res, next) { 
    if (!req.session.user) {
        return res.redirect("/views/login");
    }
    next();
}

export  {auth, logged, loggedOut};