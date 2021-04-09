const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const authenticateMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = authenticateMiddleware;