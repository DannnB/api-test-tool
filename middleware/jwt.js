const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const authenticateMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    console.log("auth...")
    const cookieToken = req.cookies.AccessToken;
    console.log(cookieToken)
    const token = authorization && authorization.split(" ")[1];
    if (token == null && !cookieToken) { return res.sendStatus(401) } 
    // else {
    //     jwt.verify(token, secret, (err, user) => {
    //         if (err) return res.sendStatus(403);
    //         req.user = user;
    //         next();
    //     });
    // }

    if (cookieToken == undefined) { return res.sendStatus(444) }
    else {
        jwt.verify(cookieToken, secret, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            console.log('cookieToken!')
            next();
        });
    }
    
};

module.exports = authenticateMiddleware;