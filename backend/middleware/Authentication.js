const jwt = require('jsonwebtoken');
const secretKey = 'secret_key';

function authenticateToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    jwt.verify(token, { algorithms: ['RS256'] }, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
