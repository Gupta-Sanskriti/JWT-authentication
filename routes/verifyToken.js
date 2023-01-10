const jwt = require('jsonwebtoken');

function authToken(req, res, next){
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send('Access Denied')
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(verified)
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({ error: error})
    }
}

module.exports = authToken;