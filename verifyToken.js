const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){

    const auth_token = req.header('auth_token');
    if(!auth_token) return res.status(401).send("Access Denied");

    try{
        const verified = jwt.verify(auth_token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch (err) {
        return res.status(400).send("Invalid token. Redirect to login");
    }

}

