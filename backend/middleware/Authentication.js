const jwt = require('jsonwebtoken');
const secretKey = 'techtreck24';

function authenticateToken(req, res, next) {
    console.log(req)
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        console.log(secretKey)
        console.log(token)
        console.log(decoded)
        if (err) {
            console.log(err)
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }

        req.user = decoded;
        next();
    });
}

module.exports = authenticateToken;
