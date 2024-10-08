const { verify } = require('jsonwebtoken');

const verifyUserToken = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: 'No authorizarion token' });
    }

    try {
        const data = verify(token, process.env.SECRET_JWT_KEY);
        req.user = data;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = verifyUserToken; // must import this middleware in routes files
